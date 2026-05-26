import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#120810] px-6 py-16 text-center">

      {/* Ambient glow orb */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[360px] w-[360px] rounded-full"
        style={{ background: "rgba(194,0,95,0.12)", filter: "blur(80px)" }}
        aria-hidden="true"
      />

      {/* 404 ghost number */}
      <span
        className="relative z-10 select-none font-serif leading-none"
        style={{
          fontSize: "clamp(80px, 20vw, 130px)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "1px rgba(194,0,95,0.25)",
          letterSpacing: "-4px",
          fontFamily: "'Playfair Display', serif",
        }}
        aria-hidden="true"
      >
        404
      </span>

      {/* Badge */}
      <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(194,0,95,0.35)] bg-[rgba(194,0,95,0.08)] px-4 py-1.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C2005F]" />
        <span className="text-[9px] font-semibold uppercase tracking-[2.5px] text-[#F5C6D8]">
          Page Not Found
        </span>
      </div>

      {/* Heading */}
      <h1
        className="relative z-10 mb-3 text-white"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(22px, 5vw, 34px)",
          fontStyle: "italic",
          fontWeight: 400,
        }}
      >
        Lost your way?
      </h1>

      {/* Description */}
      <p className="relative z-10 mb-8 max-w-sm text-sm font-light leading-relaxed text-white/50">
        The page{" "}
        <span className="font-medium text-[#C2005F]">
          {location.pathname}
        </span>{" "}
        doesn't exist or may have been moved. Let's get you back on track.
      </p>

      <div className="relative z-10 flex w-full max-w-xs flex-col gap-3">
        <a
          href="/"
          className="block w-full rounded-sm py-3.5 text-center text-[11px] font-bold uppercase tracking-[2.5px] text-white transition-all"
          style={{
            background: "#C2005F",
            boxShadow: "0 0 24px rgba(194,0,95,0.3)",
          }}
        
         
        > Back to Home
          </a>
        <button
          onClick={() => navigate(-1)}
          className="w-full rounded-sm border py-3 text-[11px] font-medium uppercase tracking-[2px] text-white/50 transition-all hover:border-[rgba(194,0,95,0.4)] hover:text-white"
          style={{ borderColor: "rgba(194,0,95,0.2)", background: "transparent" }}
        >
          Go Back
        </button>
      </div>

      {/* Divider */}
      <div
        className="relative z-10 my-7 h-px w-10"
        style={{ background: "rgba(194,0,95,0.25)" }}
        aria-hidden="true"
      />

      {/* Quick links */}
      <div className="relative z-10 w-full max-w-xs">
        <p className="mb-3 text-[8px] uppercase tracking-[2px] text-white/30">
          You might be looking for
        </p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Services & Pricing", href: "/#services" },
            { label: "Book a Session",     href: "/#booking"  },
            { label: "Portfolio Gallery",  href: "/#gallery"  },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="flex items-center justify-between rounded px-3 py-2.5 text-[11px] text-white/50 transition-all hover:border-[rgba(194,0,95,0.3)] hover:text-white"
              style={{ border: "0.5px solid rgba(194,0,95,0.18)" }}
            >
              <span>{label}</span>
              <span className="text-[#C2005F]">→</span>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default NotFound;