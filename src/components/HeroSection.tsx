import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────
   SLIDES
   All photo IDs verified live on pexels.com — free for commercial use.
   Pexels CDN supports ?auto=compress&cs=tinysrgb&w=<px>&h=<px>&fit=crop
───────────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    label: "The Studio Experience",
    // Nail tech in white shirt applying manicure — RDNE Stock
    src: "https://images.pexels.com/photos/36331453/pexels-photo-36331453.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    srcMobile: "https://images.pexels.com/photos/7755178/pexels-photo-7755178.jpeg?auto=compress&cs=tinysrgb&w=800&h=1100&fit=crop",
    alt: "Professional nail technician in white uniform performing a manicure for a client",
    position: "center center",
  },
  {
    id: 2,
    label: "Handcrafted Artistry",
    // Nail tech carefully applying nail art — Cheda Stankovic
    src: "https://images.pexels.com/photos/361754/pexels-photo-361754.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    srcMobile: "https://images.pexels.com/photos/361754/pexels-photo-361754.jpeg?auto=compress&cs=tinysrgb&w=800&h=1100&fit=crop",
    alt: "Nail artist applying precise nail art detailing for a client in a salon",
    position: "center 30%",
  },
  {
    id: 3,
    label: "Precision & Care",
    // Manicurist working on client with tools — Artem Podrez
    src: "https://images.pexels.com/photos/4783342/pexels-photo-4783342.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    srcMobile: "https://images.pexels.com/photos/4783342/pexels-photo-4783342.jpeg?auto=compress&cs=tinysrgb&w=800&h=1100&fit=crop",
    alt: "Close-up of manicurist using precision tools on a client's nails in a salon",
    position: "center 40%",
  },
  {
    id: 4,
    label: "Every Set, a Masterpiece",
    // Woman providing manicure — RDNE Stock
    src: "https://images.pexels.com/photos/15275280/pexels-photo-15275280.jpeg?auto=compress&cs=tinysrgb&w=1400&h=900&fit=crop",
    srcMobile: "https://images.pexels.com/photos/7755182/pexels-photo-7755182.jpeg?auto=compress&cs=tinysrgb&w=800&h=1100&fit=crop",
    alt: "Nail technician delivering a professional manicure service with care and elegance",
    position: "center center",
  },
];

const SLIDE_DURATION = 5500;

const STATS = [
  { value: "500+",  label: "Happy Clients" },
  { value: "4.9★",  label: "Avg. Rating"   },
  { value: "3 yrs", label: "Of Artistry"   },
];

/* ─────────────────────────────────────────────────────────────────
   CSS — injected once into <head>
   Mobile-first: base styles target smallest screens,
   media queries progressively enhance upward.
───────────────────────────────────────────────────────────────── */
const HERO_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── reset ── */
  .snh-root *, .snh-root *::before, .snh-root *::after {
    box-sizing: border-box;
    margin: 0; padding: 0;
  }

  /* ── section root ── */
  .snh-root {
    position: relative;
    width: 100%;
    /* Mobile: 100dvh with fallback */
    height: 100vh;
    height: 100dvh;
    min-height: 580px;
    overflow: hidden;
    background: #0d0508;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── slide images — stacked, cross-faded ── */
  .snh-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
    will-change: opacity;
    display: block;
  }
  .snh-img.active { opacity: 1; }

  /* ── gradient overlay ── */
  .snh-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    /* Mobile: heavier bottom gradient so text always readable on small screens */
    background: linear-gradient(
      to bottom,
      rgba(10,3,7,0.55) 0%,
      rgba(10,3,7,0.10) 35%,
      rgba(10,3,7,0.55) 65%,
      rgba(10,3,7,0.93) 100%
    );
  }

  /* ── content wrapper — bottom-anchored ── */
  .snh-content {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* Mobile padding: extra bottom for iPhone home indicator */
    padding: 0 1rem 2.5rem;
  }
  .snh-inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ── eyebrow badge ── */
  .snh-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.17em;
    text-transform: uppercase;
    color: rgba(245, 214, 195, 0.9);
    background: rgba(201, 132, 122, 0.18);
    border: 1px solid rgba(201, 132, 122, 0.3);
    padding: 0.3rem 0.8rem;
    border-radius: 100px;
    margin-bottom: 0.65rem;
    max-width: 100%;
  }
  .snh-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #C9847A;
    flex-shrink: 0;
    animation: snh-pulse 2s ease-in-out infinite;
  }
  @keyframes snh-pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.4; transform:scale(0.6); }
  }

  /* ── slide label ── */
  .snh-slide-label {
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(245, 214, 195, 0.5);
    margin-bottom: 0.5rem;
    font-weight: 400;
  }

  /* ── headline ── */
  .snh-h1 {
    font-family: 'Playfair Display', serif;
    /* Mobile: smaller, never overflows */
    font-size: clamp(1.9rem, 8vw, 3.2rem);
    font-weight: 400;
    line-height: 1.1;
    color: #fff;
    letter-spacing: -0.01em;
    margin-bottom: 0.85rem;
  }
  .snh-h1 em {
    font-style: italic;
    color: #E8A89C;
    display: block;
  }

  /* ── sub-copy ── */
  .snh-sub {
    font-size: 0.88rem;
    color: rgba(245, 225, 210, 0.7);
    line-height: 1.65;
    margin-bottom: 1.4rem;
    font-weight: 300;
    /* Mobile: hidden to save space */
    display: none;
  }

  /* ── CTA row ── */
  .snh-cta-row {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
    width: 100%;
  }
  .snh-btn-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #C9847A;
    color: #fff;
    border: none;
    padding: 0.85rem 1.5rem;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    width: 100%;
    text-align: center;
  }
  .snh-btn-primary:hover { background: #b97169; transform: translateY(-1px); }

  .snh-btn-ghost {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.08);
    color: #fff;
    border: 1px solid rgba(255,255,255,0.35);
    padding: 0.85rem 1.5rem;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.04em;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s, border-color 0.2s;
    width: 100%;
    text-align: center;
  }
  .snh-btn-ghost:hover { background: rgba(255,255,255,0.14); border-color: rgba(255,255,255,0.6); }

  /* ── stats row ── */
  .snh-stats {
    display: flex;
    align-items: center;
    gap: 0;
    padding-top: 1rem;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .snh-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    text-align: center;
  }
  .snh-stat:not(:last-child) {
    border-right: 1px solid rgba(255,255,255,0.12);
    margin-right: 0;
    padding-right: 0;
  }
  .snh-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
    line-height: 1;
  }
  .snh-stat-lbl {
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(245, 214, 195, 0.5);
    font-weight: 400;
  }

  /* ── dots rail (vertical, right side) ── */
  .snh-dots {
    position: absolute;
    right: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }
  .snh-dot-btn {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.28);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background 0.3s, transform 0.3s;
    flex-shrink: 0;
  }
  .snh-dot-btn.active {
    background: #C9847A;
    transform: scale(1.5);
  }

  /* ── progress bar ── */
  .snh-progress-track {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: rgba(255,255,255,0.1);
    z-index: 20;
  }
  .snh-progress-fill {
    height: 100%;
    background: #C9847A;
    width: 0%;
  }

  /* ═══════════════════════════════════════════
     sm — 480px+
  ═══════════════════════════════════════════ */
  @media (min-width: 480px) {
    .snh-content     { padding: 0 1.25rem 3rem; }
    .snh-h1          { font-size: clamp(2.2rem, 7vw, 3.6rem); }
    .snh-sub         { display: block; }
    .snh-cta-row     { flex-direction: row; width: auto; }
    .snh-btn-primary { width: auto; }
    .snh-btn-ghost   { width: auto; }
    .snh-stat        { text-align: left; }
    .snh-stat:not(:last-child) { border-right: none; padding-right: 1.5rem; }
    .snh-stats       { gap: 0; }
    .snh-stat-val    { font-size: 1.4rem; }
    .snh-dots        { right: 1.25rem; }
  }

  /* ═══════════════════════════════════════════
     md — 768px+
  ═══════════════════════════════════════════ */
  @media (min-width: 768px) {
    .snh-content  { padding: 0 2rem 4rem; }
    .snh-h1       { font-size: clamp(2.8rem, 6vw, 4.5rem); margin-bottom: 1rem; }
    .snh-sub      { font-size: 1rem; margin-bottom: 1.75rem; max-width: 520px; }
    .snh-cta-row  { margin-bottom: 2rem; gap: 0.875rem; }
    .snh-stat-val { font-size: 1.5rem; }
    .snh-stat-lbl { font-size: 0.63rem; }
    .snh-stats    { gap: 2rem; padding-top: 1.25rem; }
    .snh-stat:not(:last-child) { padding-right: 0; }
    .snh-dots     { right: 1.5rem; }
  }

  /* ═══════════════════════════════════════════
     lg — 1024px+
  ═══════════════════════════════════════════ */
  @media (min-width: 1024px) {
    .snh-h1  { font-size: clamp(3.5rem, 5.5vw, 5.2rem); }
    .snh-sub { font-size: 1.05rem; }
    .snh-overlay {
      background: linear-gradient(
        to bottom,
        rgba(10,3,7,0.48) 0%,
        rgba(10,3,7,0.08) 35%,
        rgba(10,3,7,0.52) 68%,
        rgba(10,3,7,0.90) 100%
      );
    }
  }
`;

function injectHeroCSS() {
  if (typeof document === "undefined") return;
  if (document.getElementById("snh-hero-css")) return;
  const tag = document.createElement("style");
  tag.id = "snh-hero-css";
  tag.textContent = HERO_CSS;
  document.head.appendChild(tag);
}

/* ─────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────── */
const HeroSlideshow = () => {
  const [current,  setCurrent]  = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef       = useRef<number | null>(null);
  const pausedRef    = useRef(false);

  injectHeroCSS();

  /* ── go to slide ── */
  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgress(0);
    startTimeRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── RAF ticker ── */
  useEffect(() => {
    const tick = (ts: number) => {
      if (pausedRef.current) {
        startTimeRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        setCurrent(c => (c + 1) % SLIDES.length);
        setProgress(0);
        startTimeRef.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [current]);

  /* ── touch swipe ── */
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45)
      goTo(dx < 0
          ? (current + 1) % SLIDES.length
          : (current - 1 + SLIDES.length) % SLIDES.length);
    touchX.current = null;
  };

  /* ── responsive src: use srcMobile on narrow screens ── */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 479px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
      <section
          className="snh-root"
          aria-label="Hero slideshow"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
      >
        {/* ── Images — all mounted, cross-faded via opacity ── */}
        {SLIDES.map((slide, i) => (
            <img
                key={slide.id}
                src={isMobile ? slide.srcMobile : slide.src}
                alt={slide.alt}
                className={`snh-img${i === current ? " active" : ""}`}
                style={{ objectPosition: slide.position }}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "sync" : "async"}
            />
        ))}

        {/* ── Overlay ── */}
        <div className="snh-overlay" aria-hidden="true" />

        {/* ── Copy content ── */}
        <div className="snh-content">
          <div className="snh-inner">

            {/* Eyebrow */}
            <div className="snh-eyebrow" aria-hidden="true">
              <span className="snh-dot" />
              Now accepting bookings
            </div>

            {/* Slide label */}
            <p className="snh-slide-label" aria-live="polite" aria-atomic="true">
              {SLIDES[current].label}
            </p>

            {/* Headline */}
            <h1 className="snh-h1">
              Nails that feel like
              <em>a love letter.</em>
            </h1>

            {/* Sub-copy */}
            <p className="snh-sub">
              Hi, I'm Shasha — a licensed nail technician crafting bespoke gel,
              acrylic, and hand-painted designs. Every set is an intimate
              collaboration between you, me, and a little bit of magic.
            </p>

            {/* CTAs */}
            <div className="snh-cta-row">
              <a href="#booking" className="snh-btn-primary">Book Your Session</a>
              <a href="#gallery" className="snh-btn-ghost">View Gallery</a>
            </div>

            {/* Stats */}
            <div className="snh-stats" role="list" aria-label="Studio highlights">
              {STATS.map(({ value, label }) => (
                  <div key={label} className="snh-stat" role="listitem">
                    <span className="snh-stat-val">{value}</span>
                    <span className="snh-stat-lbl">{label}</span>
                  </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Dot nav ── */}
        <div className="snh-dots" role="tablist" aria-label="Slide navigation">
          {SLIDES.map((slide, i) => (
              <button
                  key={slide.id}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Slide ${i + 1}: ${slide.label}`}
                  className={`snh-dot-btn${i === current ? " active" : ""}`}
                  onClick={() => goTo(i)}
              />
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div className="snh-progress-track" aria-hidden="true">
          <div
              className="snh-progress-fill"
              style={{
                width: `${progress}%`,
                transition: progress <= 0.5 ? "none" : `width ${SLIDE_DURATION}ms linear`,
              }}
          />
        </div>
      </section>
  );
};

export default HeroSlideshow;