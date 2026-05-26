import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // ─── TYPOGRAPHY ──────────────────────────────────────
      fontFamily: {
        sans:   ["Montserrat", "system-ui", "sans-serif"],
        serif:  ['"Playfair Display"', "Georgia", "serif"],
        script: ['"Dancing Script"', "cursive"],
        mono:   ['"JetBrains Mono"', "Menlo", "monospace"],
      },

      // ─── BRAND COLOR TOKENS ──────────────────────────────
      colors: {
        // shadcn/ui semantic tokens (preserved exactly)
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT:             "hsl(var(--sidebar-background))",
          foreground:          "hsl(var(--sidebar-foreground))",
          primary:             "hsl(var(--sidebar-primary))",
          "primary-foreground":"hsl(var(--sidebar-primary-foreground))",
          accent:              "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border:              "hsl(var(--sidebar-border))",
          ring:                "hsl(var(--sidebar-ring))",
        },

        // Shasha Nails brand palette
        magenta: {
          DEFAULT: "#C2005F",
          deep:    "#8B0040",
          light:   "#E8336B",
          50:      "#FDF0F5",
          100:     "#F9D0E3",
          200:     "#F5A0C8",
          300:     "#EE6AA3",
          400:     "#E03A7D",
          500:     "#C2005F",   // primary
          600:     "#A0004F",
          700:     "#8B0040",
          800:     "#660030",
          900:     "#120810",   // darkest bg
        },
        blush: {
          DEFAULT: "#F5C6D8",
          light:   "#FDF0F5",
          mid:     "#F0AECA",
          50:      "#FFF5F9",
          100:     "#FDE8F1",
          200:     "#F9CDE1",
          300:     "#F5C6D8",
          400:     "#EFA8C4",
          500:     "#E88AB0",
        },
        // Dark backgrounds (site chrome)
        dark: {
          DEFAULT: "#120810",
          2:       "#1E0F18",
          3:       "#2A1520",
          4:       "#3A1D2A",
        },
      },

      // ─── BORDER RADIUS ───────────────────────────────────
      borderRadius: {
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
        xl:  "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },

      // ─── SPACING EXTENSIONS ──────────────────────────────
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
      },

      // ─── FLUID TYPOGRAPHY (clamp) ─────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "hero-sm":  ["clamp(2.5rem,6vw,4rem)",   { lineHeight: "1.05" }],
        "hero-lg":  ["clamp(3.5rem,8vw,5.75rem)", { lineHeight: "1.0"  }],
        "display":  ["clamp(2rem,4vw,3rem)",       { lineHeight: "1.15" }],
        "section":  ["clamp(1.5rem,3vw,2.25rem)",  { lineHeight: "1.2"  }],
      },

      // ─── KEYFRAMES ───────────────────────────────────────
      keyframes: {
        // shadcn/radix (preserved)
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },

        // Image loader shimmer
        shimmer: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },

        // Reveal on scroll / mount
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          from: { opacity: "0", transform: "scale(1.03)" },
          to:   { opacity: "1", transform: "scale(1)"    },
        },
        "fade-down": {
          from: { opacity: "0", transform: "translateY(-16px)" },
          to:   { opacity: "1", transform: "translateY(0)"     },
        },

        // Hero ambient aurora
        "aurora-shift": {
          "0%":   { filter: "hue-rotate(0deg) brightness(1)"    },
          "100%": { filter: "hue-rotate(8deg) brightness(1.08)" },
        },

        // Floating orbs
        "orb-float": {
          "0%":   { transform: "translateY(0px) scale(1)"    },
          "100%": { transform: "translateY(-28px) scale(1.05)" },
        },

        // Marquee scroll
        "marquee-x": {
          "0%":   { transform: "translateX(0%)"   },
          "100%": { transform: "translateX(-50%)" },
        },

        // Pulsing live dot (booking / badge)
        "pulse-dot": {
          "0%,100%": { opacity: "1",   transform: "scale(1)"   },
          "50%":     { opacity: "0.4", transform: "scale(0.65)" },
        },

        // Scroll indicator line
        "scroll-line": {
          "0%,100%": { opacity: "0.25", transform: "scaleY(1)"   },
          "50%":     { opacity: "1",    transform: "scaleY(1.2)" },
        },

        // Skill bar fill
        "skill-fill": {
          from: { transform: "scaleX(0)" },
          to:   { transform: "scaleX(1)" },
        },

        // Slide in from left (mobile nav)
        "slide-in-left": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to:   { transform: "translateX(0)",     opacity: "1" },
        },

        // Notification / toast pop
        "pop-in": {
          "0%":   { transform: "scale(0.85)", opacity: "0" },
          "70%":  { transform: "scale(1.03)", opacity: "1" },
          "100%": { transform: "scale(1)",    opacity: "1" },
        },
      },

      // ─── ANIMATION UTILITIES ─────────────────────────────
      animation: {
        // shadcn/radix (preserved)
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",

        // Image loading
        shimmer:   "shimmer 1.8s ease-in-out infinite",

        // Entrances
        "fade-up":   "fade-up 0.7s ease forwards",
        "fade-in":   "fade-in 0.5s ease forwards",
        "fade-down": "fade-down 0.5s ease forwards",

        // Ambient / looping
        "aurora":      "aurora-shift 8s ease-in-out infinite alternate",
        "orb-float":   "orb-float 6s ease-in-out infinite alternate",
        "marquee":     "marquee-x 18s linear infinite",
        "marquee-slow":"marquee-x 28s linear infinite",
        "pulse-dot":   "pulse-dot 1.5s ease-in-out infinite",
        "scroll-line": "scroll-line 2s ease-in-out infinite",

        // Interactions
        "skill-fill":     "skill-fill 1.2s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        "slide-in-left":  "slide-in-left 0.3s ease forwards",
        "pop-in":         "pop-in 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
      },

      // ─── TRANSITION TIMING ───────────────────────────────
      transitionTimingFunction: {
        "spring":      "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth-out":  "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "smooth-in":   "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
      },

      // ─── BACKDROP BLUR ───────────────────────────────────
      backdropBlur: {
        xs: "2px",
        nav: "20px",
      },

      // ─── BOX SHADOW (brand glow only) ────────────────────
      boxShadow: {
        "glow-sm": "0 0 16px rgba(194,0,95,0.25)",
        "glow-md": "0 0 32px rgba(194,0,95,0.35)",
        "glow-lg": "0 0 56px rgba(194,0,95,0.45)",
        "card":    "0 1px 3px rgba(18,8,16,0.4)",
      },

      // ─── ASPECT RATIOS ───────────────────────────────────
      aspectRatio: {
        "portrait":  "3 / 4",
        "landscape": "4 / 3",
        "gallery":   "5 / 6",
        "hero":      "16 / 9",
      },

      // ─── Z-INDEX SCALE ───────────────────────────────────
      zIndex: {
        "nav":    "100",
        "modal":  "200",
        "cursor": "999",
        "toast":  "300",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;