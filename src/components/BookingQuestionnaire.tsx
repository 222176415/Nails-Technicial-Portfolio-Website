/**
 * BookingQuestionnaire.tsx
 * Premium Intake & Quote Generator — Shasha Nails
 *
 * Features:
 *  • Single-scroll layout (no wizard steps)
 *  • Mobile-first, capped at 550px on desktop
 *  • Live price calculation (Haversine distance engine for house calls)
 *  • Sticky bottom bar: live price + WhatsApp CTA always visible
 *  • Geocoding via OpenStreetMap Nominatim (no API key required)
 *  • Graceful fallback when geocoding fails
 *  • All config driven by SYSTEM_CONFIG / import.meta.env
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin, Sparkles, Phone, ExternalLink,
  CheckCircle2, AlertCircle, Loader2,
  Home, Scissors, Image as ImageIcon, User, ChevronDown,
} from "lucide-react";

// ─── SYSTEM CONFIG ────────────────────────────────────────────────────────────
const SYSTEM_CONFIG = {
  OWNER_WHATSAPP_NUMBER:
    (import.meta as any).env?.VITE_OWNER_PHONE ?? "27691255967",
  SALON_COORDINATES: {
    LAT: parseFloat((import.meta as any).env?.VITE_SALON_LAT ?? "-26.0936"),
    LNG: parseFloat((import.meta as any).env?.VITE_SALON_LNG ?? "28.0064"),
  },
  PRICING_METRICS: {
    PER_KM_RATE: parseFloat(
      (import.meta as any).env?.VITE_PER_KM_RATE ?? "12.00"
    ),
    BASE_HOUSE_CALL_FEE: parseFloat(
      (import.meta as any).env?.VITE_BASE_HOUSE_FEE ?? "150.00"
    ),
  },
  PACKAGES: [
    { id: "pkg_classic",  name: "Classic Manicure",   basePrice: 250 },
    { id: "pkg_gel",      name: "Gel Manicure",        basePrice: 380 },
    { id: "pkg_acrylic",  name: "Nail Extensions",     basePrice: 550 },
    { id: "pkg_art",      name: "Nail Art Custom",     basePrice: 600 },
    { id: "pkg_builder",  name: "Builder Gel Set",     basePrice: 420 },
    { id: "pkg_removal",  name: "Soak-Off & Removal",  basePrice: 150 },
  ],
  CALENDLY_URL: "https://calendly.com/nsukugold07",
};

// ─── TYPES ────────────────────────────────────────────────────────────────────
type ServiceType = "salon" | "house_call" | null;
type GeoStatus   = "idle" | "loading" | "success" | "error";

interface FormData {
  name:        string;
  serviceType: ServiceType;
  packageId:   string;
  inspoLink:   string;
  address:     string;
}

// ─── HAVERSINE FORMULA ────────────────────────────────────────────────────────
function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R    = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── GEOCODE via Nominatim ────────────────────────────────────────────────────
async function geocodeAddress(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    address
  )}&format=json&limit=1&countrycodes=za`;
  const res  = await fetch(url, {
    headers: { "Accept-Language": "en", "User-Agent": "ShashaNoilsApp/1.0" },
  });
  const data = await res.json();
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BookingQuestionnaire() {
  const [form, setForm] = useState<FormData>({
    name:        "",
    serviceType: null,
    packageId:   "",
    inspoLink:   "",
    address:     "",
  });

  const [distanceKm,  setDistanceKm]  = useState<number | null>(null);
  const [geoStatus,   setGeoStatus]   = useState<GeoStatus>("idle");
  const [geoError,    setGeoError]    = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const debounceRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── derived values ──────────────────────────────────────────────────────────
  const selectedPkg = SYSTEM_CONFIG.PACKAGES.find(
    (p) => p.id === form.packageId
  );

  const travelFee =
    form.serviceType === "house_call" && distanceKm !== null
      ? SYSTEM_CONFIG.PRICING_METRICS.BASE_HOUSE_CALL_FEE +
        distanceKm * SYSTEM_CONFIG.PRICING_METRICS.PER_KM_RATE
      : form.serviceType === "house_call"
      ? SYSTEM_CONFIG.PRICING_METRICS.BASE_HOUSE_CALL_FEE
      : 0;

  const estimatedTotal = selectedPkg
    ? selectedPkg.basePrice + travelFee
    : null;

  const priceLabel = geoError
    ? "Pending Review"
    : estimatedTotal !== null
    ? `R${estimatedTotal.toFixed(0)}`
    : "—";

  // ── geocode on address change (debounced 900ms) ─────────────────────────────
  useEffect(() => {
    if (form.serviceType !== "house_call" || form.address.length < 8) {
      setDistanceKm(null);
      setGeoStatus("idle");
      setGeoError(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setGeoStatus("loading");
      setGeoError(false);
      try {
        const coords = await geocodeAddress(form.address);
        if (!coords) throw new Error("Not found");
        const km = haversineKm(
          SYSTEM_CONFIG.SALON_COORDINATES.LAT,
          SYSTEM_CONFIG.SALON_COORDINATES.LNG,
          coords.lat,
          coords.lng
        );
        setDistanceKm(parseFloat(km.toFixed(1)));
        setGeoStatus("success");
      } catch {
        setGeoStatus("error");
        setGeoError(true);
        setDistanceKm(null);
      }
    }, 900);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [form.address, form.serviceType]);

  // ── field helpers ──────────────────────────────────────────────────────────
  const set = useCallback(
    (key: keyof FormData, val: string | ServiceType) =>
      setForm((f) => ({ ...f, [key]: val })),
    []
  );

  // ── WhatsApp submit ─────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pkg = selectedPkg;

    const travelLine =
      form.serviceType === "house_call"
        ? `📍 *Address:* ${form.address}\n🚗 *Travel Stats:* ${
            distanceKm !== null ? `${distanceKm} km away` : "distance pending"
          } — Travel fee: R${travelFee.toFixed(0)}`
        : "";

    const message = `✨ *New Inquiry via Website Form* ✨

👤 *Client Name:* ${form.name || "Not provided"}
💅 *Service Type:* ${form.serviceType === "house_call" ? "House Call" : "Salon Appointment"}
📦 *Chosen Package:* ${pkg?.name ?? "Not selected"} (R${pkg?.basePrice ?? "—"})
🖼️ *Design Inspo:* ${form.inspoLink || "None provided"}
${travelLine ? "\n" + travelLine : ""}
💰 *Estimated Subtotal:* ${geoError ? "Pending Review" : `R${estimatedTotal?.toFixed(0) ?? "—"}`}
⚠️ _Note: This is an automated estimate subject to technician manual validation._`;

    const encoded = encodeURIComponent(message);
    window.open(
      `https://wa.me/${SYSTEM_CONFIG.OWNER_WHATSAPP_NUMBER}?text=${encoded}`,
      "_blank"
    );
    setSubmitted(true);
  };

  // ── is form sendable? ───────────────────────────────────────────────────────
  const canSend =
    form.serviceType !== null &&
    form.packageId !== "" &&
    (form.serviceType === "salon" || form.address.length > 5);

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="relative min-h-screen bg-[#120810] font-sans antialiased">

      {/* ── ambient background ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[rgba(194,0,95,0.10)] blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[rgba(139,0,64,0.08)] blur-[80px]" />
      </div>

      {/* ── main card ──────────────────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-[550px] px-4 pb-36 pt-10 sm:px-6">

        {/* HEADER */}
        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(194,0,95,0.3)] bg-[rgba(194,0,95,0.08)] px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-[pulse-dot_1.8s_ease-in-out_infinite] rounded-full bg-[#C2005F]" />
            <span className="text-[9px] font-semibold uppercase tracking-[2.5px] text-[#F5C6D8]">
              Premium Booking
            </span>
          </div>
          <h1
            className="text-[28px] font-normal leading-tight text-white"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            Get Your Quote
          </h1>
          <p className="mt-2 text-xs font-light leading-relaxed text-white/45">
            Tell us what you have in mind and we'll give you an instant estimate.
          </p>

          {/* Calendly escape hatch */}
          <a
            href={SYSTEM_CONFIG.CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-white/35 underline underline-offset-2 transition-colors hover:text-[#F5C6D8]"
          >
            Just want a standard booking? Skip to Calendly
            <ExternalLink size={10} />
          </a>
        </header>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

          {/* ── SECTION 1: SERVICE TYPE ────────────────────────────────────── */}
          <Section icon={<Scissors size={14} />} label="Service Type">
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { value: "salon",      label: "Salon",      sub: "Visit the studio",  Icon: Scissors },
                  { value: "house_call", label: "House Call", sub: "We come to you",    Icon: Home      },
                ] as const
              ).map(({ value, label, sub, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    set("serviceType", value);
                    setDistanceKm(null);
                    setGeoStatus("idle");
                    setGeoError(false);
                  }}
                  className={`flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-lg border px-3 py-4 text-center transition-all duration-200
                    ${
                      form.serviceType === value
                        ? "border-[#C2005F] bg-[rgba(194,0,95,0.12)] text-white shadow-[0_0_20px_rgba(194,0,95,0.2)]"
                        : "border-[rgba(194,0,95,0.18)] bg-[rgba(255,255,255,0.02)] text-white/50 hover:border-[rgba(194,0,95,0.35)] hover:text-white/80"
                    }`}
                >
                  <Icon size={18} className={form.serviceType === value ? "text-[#C2005F]" : "text-white/30"} />
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-[10px] font-light text-white/40">{sub}</span>
                </button>
              ))}
            </div>
          </Section>

          {/* ── SECTION 2: PACKAGE + INSPO ────────────────────────────────── */}
          <Section icon={<Sparkles size={14} />} label="Service & Inspiration">

            {/* Package dropdown */}
            <div className="relative">
              <label className={fieldLabelClass}>Package</label>
              <div className="relative">
                <select
                  value={form.packageId}
                  onChange={(e) => set("packageId", e.target.value)}
                  className={`${inputClass} appearance-none pr-10 ${
                    !form.packageId ? "text-white/30" : "text-white"
                  }`}
                >
                  <option value="" disabled>Select a package…</option>
                  {SYSTEM_CONFIG.PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id} className="bg-[#1E0F18]">
                      {pkg.name} — R{pkg.basePrice}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
              </div>
              {selectedPkg && (
                <p className="mt-1.5 text-[10px] text-[#C2005F]">
                  Base price: R{selectedPkg.basePrice}
                </p>
              )}
            </div>

            {/* Inspiration URL */}
            <div>
              <label className={fieldLabelClass}>
                <ImageIcon size={11} className="inline-block mr-1 align-[-1px]" />
                Design Inspiration (optional)
              </label>
              <input
                type="url"
                value={form.inspoLink}
                onChange={(e) => set("inspoLink", e.target.value)}
                placeholder="https://pinterest.com/pin/..."
                className={inputClass}
                autoComplete="url"
              />
              <p className="mt-1.5 text-[10px] text-white/25">
                Paste a Pinterest, Instagram, or TikTok link
              </p>
            </div>
          </Section>

          {/* ── SECTION 3: YOUR DETAILS ───────────────────────────────────── */}
          <Section icon={<User size={14} />} label="Your Details">
            <div>
              <label className={fieldLabelClass}>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your first name"
                className={inputClass}
                autoComplete="given-name"
              />
            </div>

            {/* House-call address — conditionally rendered */}
            {form.serviceType === "house_call" && (
              <div className="animate-[fade-up_0.3s_ease_forwards]">
                <label className={fieldLabelClass}>
                  <MapPin size={11} className="inline-block mr-1 align-[-1px]" />
                  Your Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="Street address, Johannesburg…"
                    className={`${inputClass} pr-10`}
                    autoComplete="street-address"
                  />
                  {/* geocode status icon */}
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                    {geoStatus === "loading" && (
                      <Loader2 size={14} className="animate-spin text-[#C2005F]/60" />
                    )}
                    {geoStatus === "success" && (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    )}
                    {geoStatus === "error" && (
                      <AlertCircle size={14} className="text-amber-400" />
                    )}
                  </div>
                </div>

                {/* Distance feedback */}
                {geoStatus === "success" && distanceKm !== null && (
                  <div className="mt-2 flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                    <CheckCircle2 size={12} className="flex-shrink-0 text-emerald-400" />
                    <p className="text-[11px] text-emerald-300">
                      <span className="font-semibold">{distanceKm} km</span> from studio ·
                      Travel fee: <span className="font-semibold text-white">R{travelFee.toFixed(0)}</span>
                    </p>
                  </div>
                )}
                {geoStatus === "error" && (
                  <div className="mt-2 flex items-start gap-2 rounded-md border border-amber-500/20 bg-amber-500/5 px-3 py-2">
                    <AlertCircle size={12} className="mt-0.5 flex-shrink-0 text-amber-400" />
                    <p className="text-[11px] leading-relaxed text-amber-300">
                      Address could not be auto-calculated. Continue to WhatsApp to get
                      an estimate directly from us!
                    </p>
                  </div>
                )}

                {/* Travel fee breakdown */}
                {form.serviceType === "house_call" && (
                  <div className="mt-3 rounded-lg border border-[rgba(194,0,95,0.15)] bg-[rgba(194,0,95,0.04)] px-4 py-3">
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[2px] text-white/30">
                      House Call Pricing
                    </p>
                    <div className="flex flex-col gap-1.5 text-xs">
                      <PriceLine label="Base house call fee"     value={`R${SYSTEM_CONFIG.PRICING_METRICS.BASE_HOUSE_CALL_FEE}`} />
                      <PriceLine
                        label={`Distance fee ${distanceKm !== null ? `(${distanceKm} km × R${SYSTEM_CONFIG.PRICING_METRICS.PER_KM_RATE}/km)` : "(awaiting address)"}`}
                        value={distanceKm !== null ? `R${(distanceKm * SYSTEM_CONFIG.PRICING_METRICS.PER_KM_RATE).toFixed(0)}` : "—"}
                        muted={distanceKm === null}
                      />
                      {selectedPkg && (
                        <PriceLine label={`Package — ${selectedPkg.name}`} value={`R${selectedPkg.basePrice}`} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Section>

          {/* ── SECTION 4: SUMMARY ────────────────────────────────────────── */}
          {canSend && (
            <div className="animate-[fade-up_0.4s_ease_forwards] rounded-xl border border-[rgba(194,0,95,0.25)] bg-gradient-to-br from-[rgba(194,0,95,0.08)] to-[rgba(139,0,64,0.04)] p-5">
              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[2.5px] text-white/30">
                Quote Summary
              </p>
              <div className="flex flex-col gap-2.5">
                <SummaryRow
                  icon={<Scissors size={12} />}
                  label="Type"
                  value={form.serviceType === "house_call" ? "House Call" : "Salon"}
                />
                {selectedPkg && (
                  <SummaryRow
                    icon={<Sparkles size={12} />}
                    label="Package"
                    value={`${selectedPkg.name} — R${selectedPkg.basePrice}`}
                  />
                )}
                {form.serviceType === "house_call" && (
                  <SummaryRow
                    icon={<MapPin size={12} />}
                    label="Travel"
                    value={geoError ? "Pending Review" : `R${travelFee.toFixed(0)}`}
                  />
                )}
                <div className="mt-1 border-t border-[rgba(194,0,95,0.2)] pt-3 flex items-center justify-between">
                  <span className="text-xs text-white/40">Estimated Total</span>
                  <span
                    className="text-xl text-[#C2005F]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {priceLabel}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed text-white/25">
                ⚠️ This estimate is subject to technician validation on WhatsApp.
              </p>
            </div>
          )}

          {/* ── DESKTOP SUBMIT (hidden on mobile — sticky bar handles it) ── */}
          <button
            type="submit"
            disabled={!canSend}
            className={`hidden sm:flex items-center justify-center gap-2 min-h-[52px] w-full rounded-lg text-[11px] font-bold uppercase tracking-[2.5px] text-white transition-all duration-200
              ${
                canSend
                  ? "bg-[#C2005F] shadow-[0_0_28px_rgba(194,0,95,0.35)] hover:bg-[#8B0040] hover:shadow-[0_0_40px_rgba(194,0,95,0.5)]"
                  : "cursor-not-allowed bg-[rgba(194,0,95,0.2)] text-white/30"
              }`}
          >
            <Phone size={15} />
            {canSend ? `Send via WhatsApp — ${priceLabel}` : "Complete the form above"}
          </button>

        </form>
      </div>

      {/* ── STICKY BOTTOM BAR (mobile only) ────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        {/* frosted glass bar */}
        <div
          className="border-t border-[rgba(194,0,95,0.2)] px-4 py-3"
          style={{ background: "rgba(18,8,16,0.92)", backdropFilter: "blur(20px)" }}
        >
          <div className="mx-auto flex max-w-[550px] items-center gap-3">
            {/* live price pill */}
            <div className="flex flex-col min-w-[80px]">
              <span className="text-[8px] uppercase tracking-[1.5px] text-white/30 font-medium">
                Estimate
              </span>
              <span
                className="text-[20px] leading-none text-[#C2005F]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {priceLabel}
              </span>
            </div>

            {/* WhatsApp CTA */}
            <button
              type="submit"
              form="booking-form"
              disabled={!canSend}
              onClick={canSend ? handleSubmit : undefined}
              className={`flex flex-1 min-h-[52px] items-center justify-center gap-2 rounded-lg text-[11px] font-bold uppercase tracking-[2px] text-white transition-all duration-200
                ${
                  canSend
                    ? "bg-[#C2005F] shadow-[0_0_20px_rgba(194,0,95,0.4)] active:scale-95"
                    : "cursor-not-allowed bg-[rgba(194,0,95,0.18)] text-white/30"
                }`}
            >
              <Phone size={14} />
              {canSend ? "Send via WhatsApp" : "Complete form"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Section({
  icon, label, children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[rgba(194,0,95,0.15)] bg-[rgba(255,255,255,0.02)] p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-[#C2005F]">{icon}</span>
        <span className="text-[9px] font-semibold uppercase tracking-[2.5px] text-white/50">
          {label}
        </span>
        <div className="h-px flex-1 bg-[rgba(194,0,95,0.12)]" />
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function PriceLine({
  label, value, muted = false,
}: {
  label: string; value: string; muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-white/35">{label}</span>
      <span className={`text-[11px] font-medium ${muted ? "text-white/20" : "text-white/70"}`}>
        {value}
      </span>
    </div>
  );
}

function SummaryRow({
  icon, label, value,
}: {
  icon: React.ReactNode; label: string; value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#C2005F]/60">{icon}</span>
      <span className="text-[11px] text-white/40 min-w-[60px]">{label}</span>
      <span className="text-[12px] text-white/80 font-medium">{value}</span>
    </div>
  );
}

// ─── SHARED CLASSES ───────────────────────────────────────────────────────────
const fieldLabelClass =
  "mb-1.5 block text-[10px] font-medium uppercase tracking-[1.5px] text-white/40";

const inputClass = `
  w-full min-h-[48px] rounded-lg border border-[rgba(194,0,95,0.2)]
  bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-white
  placeholder:text-white/20
  focus:border-[rgba(194,0,95,0.5)] focus:outline-none focus:ring-1 focus:ring-[rgba(194,0,95,0.2)]
  transition-colors duration-200
  [&>option]:bg-[#1E0F18]
`.replace(/\s+/g, " ").trim();