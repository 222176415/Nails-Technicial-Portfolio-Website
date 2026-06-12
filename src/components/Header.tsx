import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import logo from "@/assets/shasha-logo.png";
/* ─────────────────────────────────────────────────────────────────
   NAV LINKS — edit here to add / remove items
───────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "About",    href: "#about"        },
  { label: "Services", href: "#services"     },
  { label: "Gallery",  href: "#gallery"      },
  { label: "Reviews",  href: "#testimonials" },
  { label: "Contact",  href: "#contact"      },
];

/* ─────────────────────────────────────────────────────────────────
   CSS — injected once into <head>.
   All responsive rules live here so inline styles stay simple.
───────────────────────────────────────────────────────────────── */
const HEADER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=DM+Sans:wght@300;400;500&display=swap');

  /* ── reset ── */
  .sn-header *, .sn-header *::before, .sn-header *::after {
    box-sizing: border-box;
  }

  /* ── root ── */
  .sn-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.4s ease, border-color 0.4s ease;
  }
  .sn-header.scrolled {
    background: --foreground;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(201, 132, 122, 0.18);
  }

  /* ── inner bar ── */
  .sn-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  /* ── logo ── */
  .sn-logo {
    display: flex;
    align-items: center;
    gap: 9px;
    text-decoration: none;
    flex-shrink: 0;
    z-index: 10;
  }
  .sn-logo-mark {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
    border: 1.5px solid rgba(255,255,255,0.28);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Dancing Script', cursive;
    color: #fff;
    font-size: 17px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .sn-logo-text {
    font-family: 'Dancing Script', cursive;
    font-size: 1.35rem;
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  /* ── desktop nav links ── */
  .sn-desktop-nav {
    display: none; /* hidden on mobile — shown via media query below */
    align-items: center;
    gap: 0.1rem;
  }
  .sn-nav-link {
    color: rgba(255,255,255,0.82);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.42rem 0.8rem;
    border-radius: 100px;
    white-space: nowrap;
    transition: background 0.2s, color 0.2s;
  }
  .sn-nav-link:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
  }

  /* ── right-side actions cluster ── */
  .sn-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  /* ── icon button (theme toggle + hamburger) ── */
  .sn-icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 7px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .sn-icon-btn:hover { background: rgba(255,255,255,0.1); }

  /* ── desktop CTA buttons ── */
  .sn-cta-ghost {
    display: none; /* hidden on mobile */
    color: rgba(255,255,255,0.82);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 0.42rem 0.85rem;
    border-radius: 100px;
    white-space: nowrap;
    transition: background 0.2s;
  }
  .sn-cta-ghost:hover { background: rgba(255,255,255,0.1); }

  .sn-cta-primary {
    display: none; /* hidden on mobile */
    background: #C9847A;
    color: #fff;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 0.5rem 1.25rem;
    border-radius: 100px;
    white-space: nowrap;
    transition: background 0.2s, transform 0.15s;
  }
  .sn-cta-primary:hover { background: #b97169; transform: translateY(-1px); }

  /* ── hamburger — ALWAYS visible on mobile ── */
  .sn-hamburger {
    display: flex; /* shown by default (mobile-first) */
  }

  /* ── mobile drawer ── */
  .sn-mobile-menu {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    pointer-events: none;
    transition: max-height 0.38s ease, opacity 0.3s ease;
    background: rgba(8, 2, 5, 0.97);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .sn-mobile-menu.open {
    max-height: 480px;
    opacity: 1;
    pointer-events: auto;
  }
  .sn-mobile-menu-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.5rem 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
  }
  .sn-mobile-link {
    display: flex;
    align-items: center;
    color: rgba(255,255,255,0.76);
    text-decoration: none;
    font-size: 1.05rem;
    font-weight: 400;
    letter-spacing: 0.03em;
    padding: 0.9rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: color 0.2s;
  }
  .sn-mobile-link:last-of-type { border-bottom: none; }
  .sn-mobile-link:hover { color: #fff; }
  .sn-mobile-cta-wrap {
    margin-top: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .sn-mobile-book {
    display: block;
    text-align: center;
    padding: 0.85rem;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    border: 1px solid rgba(255,255,255,0.22);
    color: rgba(255,255,255,0.88);
    transition: background 0.2s;
  }
  .sn-mobile-book:hover { background: rgba(255,255,255,0.08); }
  .sn-mobile-quote {
    display: block;
    text-align: center;
    padding: 0.9rem;
    border-radius: 10px;
    background: #C9847A;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: background 0.2s;
  }
  .sn-mobile-quote:hover { background: #b97169; }

  /* ═══════════════════════════════════════
     BREAKPOINT: tablet / desktop  ≥ 768 px
  ═══════════════════════════════════════ */
  @media (min-width: 768px) {
    .sn-nav-inner      { height: 72px; padding: 0 1.5rem; }
    .sn-desktop-nav    { display: flex; }
    .sn-cta-ghost      { display: inline-flex; }
    .sn-cta-primary    { display: inline-flex; align-items: center; }
    .sn-hamburger      { display: none; }   /* hide hamburger on desktop */
    .sn-mobile-menu    { display: none; }   /* never show drawer on desktop */
  }

  /* ═══════════════════════════════════════
     BREAKPOINT: large desktop  ≥ 1024 px
  ═══════════════════════════════════════ */
  @media (min-width: 1024px) {
    .sn-nav-inner   { padding: 0 2rem; }
    .sn-nav-link    { font-size: 0.83rem; padding: 0.45rem 0.9rem; }
    .sn-logo-text   { font-size: 1.45rem; }
  }
`;

/* inject stylesheet once */
function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("sn-header-css")) return;
  const tag = document.createElement("style");
  tag.id = "sn-header-css";
  tag.textContent = HEADER_CSS;
  document.head.appendChild(tag);
}

/* ─────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────── */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark,   setIsDark]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* inject CSS */
  injectStyles();

  /* ── theme init ── */
  useEffect(() => {
    const saved       = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark        = saved === "dark" || (!saved && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close drawer on desktop resize ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── lock body scroll when menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const close = () => setMenuOpen(false);

  return (
      <header className={`sn-header${scrolled ? " scrolled" : ""}`}>

        {/* ────────────────── TOP BAR ────────────────── */}
        <div className="sn-nav-inner">

          {/* Logo */}
          <a href="/" className="sn-logo">
            <img src={logo} alt="Shasha Nails" className="h-9 sm:h-11 w-auto dark:rounded-lg rounded-lg" />
            <span className="sn-logo-text">Shasha Nails</span>
          </a>

          {/* Desktop nav — hidden on mobile via CSS */}
          <nav className="sn-desktop-nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="sn-nav-link">
                  {label}
                </a>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="sn-actions">

            {/* Theme toggle */}
            <button
                className="sn-icon-btn"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark
                  ? <Sun  size={18} color="rgba(255,255,255,0.85)" />
                  : <Moon size={18} color="rgba(255,255,255,0.85)" />}
            </button>

            {/* Desktop ghost CTA — hidden on mobile via CSS */}
            <a href="#booking" className="sn-cta-ghost">
              Book Now
            </a>

            {/* Desktop primary CTA — hidden on mobile via CSS */}
            <a href="/quote" className="sn-cta-primary">
              Get a Quote
            </a>

            {/* ── Hamburger — ALWAYS rendered, shown on mobile via CSS ── */}
            <button
                className="sn-icon-btn sn-hamburger"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                aria-controls="sn-mobile-menu"
                onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen
                  ? <X    size={22} color="rgba(255,255,255,0.9)" />
                  : <Menu size={22} color="rgba(255,255,255,0.9)" />}
            </button>

          </div>
        </div>

        {/* ────────────────── MOBILE DRAWER ────────────────── */}
        <div
            id="sn-mobile-menu"
            className={`sn-mobile-menu${menuOpen ? " open" : ""}`}
            aria-hidden={!menuOpen}
        >
          <div className="sn-mobile-menu-inner">

            {NAV_LINKS.map(({ label, href }) => (
                <a
                    key={label}
                    href={href}
                    className="sn-mobile-link"
                    onClick={close}
                >
                  {label}
                </a>
            ))}

            <div className="sn-mobile-cta-wrap">
              <a href="#booking" className="sn-mobile-book" onClick={close}>
                Book a Session
              </a>
              <a href="/quote" className="sn-mobile-quote" onClick={close}>
                Get a Quote
              </a>
            </div>

          </div>
        </div>

      </header>
  );
};

export default Header;