# 💅 Shasha Nails — Professional Nail Technician Platform

> A production-grade portfolio, booking, and client intake platform built for **Shasha**, a professional nail technician based in **Randburg, Johannesburg, South Africa**. The platform is engineered for performance, SEO visibility, and a seamless mobile-first client experience.

---

## 🌐 Live Platform

| Environment | URL |
|---|---|
| Production | `https://www.shashanails.co.za` |
| Quote Form | `https://www.shashanails.co.za/quote` |
| Booking | `https://calendly.com/nsukugold07` |

---

## 🏗️ Current Version — v1.0.0 (Live)

> This is what is **fully built and shipped** in the current codebase.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Vite + React 18 + TypeScript** |
| Styling | **Tailwind CSS v3** with custom design tokens |
| Routing | **React Router v6** |
| Icons | **Lucide React** |
| Booking | **Calendly** (embedded widget + redirect) |
| Fonts | **Playfair Display** (serif) + **Montserrat** (sans) |
| Hosting | **Vercel** |
| Package Manager | npm |

---

### ✅ Shipped Features

#### 🎨 Design System
- Custom dark-mode-first theme with brand palette (`#C2005F` magenta, blush, dark backgrounds)
- Full CSS token system via `tailwind.config.ts` — brand colors, animations, shadows, spacing, and fluid typography all resolved from config
- Custom animated heart cursor with magenta/white dark-mode variant and lagging ring
- Ambient radial glow backgrounds and aurora gradient animations
- Grain texture overlay on hero section
- Infinite CSS marquee ticker for services

#### 🖥️ Pages & Sections
- **Hero** — full-viewport section with ambient orbs, grid overlay, live "Now Booking" badge, dual CTA buttons, and animated scroll indicator
- **Services** — 6-card bento grid with mouse-tracking radial glow, featured badge, and price display
- **Gallery** — masonry-style bento grid (12-column) with filter buttons (All / Gel / Art / Extensions), hover overlay, and "View Full Gallery" CTA
- **About** — split layout with artist portrait, animated skill progress bars (Haversine-debounced IntersectionObserver), stat counters, and floating badge
- **Testimonials** — auto-scrolling infinite carousel (pauses on hover), 5 client reviews
- **Booking** — Calendly embed container with service pre-selector, time slot preview, and feature list
- **Footer** — 4-column layout with social links, quick nav, operating hours, and legal links
- **404 Not Found** — branded ghost-number page with quick-links back to key sections, Go Back button

#### 📋 Premium Quote Form (`/quote`)
- Single-scroll intake questionnaire (no wizard steps)
- Service type toggle: **Salon Appointment** vs **House Call**
- Package selector dynamically populated from `SYSTEM_CONFIG`
- Design inspiration URL field (Pinterest / Instagram / TikTok)
- **Haversine distance engine** — geocodes client address via OpenStreetMap Nominatim, calculates straight-line km from salon coordinates, computes real-time travel fee
- Live price calculator: `Total = Package Base + Base House Call Fee + (km × per-km rate)`
- Three geocode states: loading spinner, success (distance + fee), amber fallback warning
- **WhatsApp submission** — formats a structured message payload and opens `wa.me` in a new tab (no backend required)
- Sticky bottom bar on mobile: live price + WhatsApp CTA always visible at any scroll position
- "Skip to Calendly" escape hatch for standard bookings
- Graceful error fallback: "Pending Review" pricing when geocoding fails

#### 🪟 Booking Modal
- **Slide-up bottom sheet** on mobile (`slide-up-sheet` keyframe, `92dvh` max height)
- **Centered floating card** on desktop (`pop-in` animation)
- Frosted glass backdrop (`blur(8px)`) with branded dark overlay
- Drag handle indicator on mobile
- Sticky header with close button inside modal
- Body scroll lock while open
- Keyboard accessible (Escape to close)
- `ModalContext` provider — trigger from anywhere in the tree without prop-drilling

#### 🔍 SEO & Meta
- Full Open Graph suite (title, description, image, locale `en_ZA`, site name)
- Twitter/X card (`summary_large_image`) with real `@nailsbyshasha2025` handle
- **JSON-LD structured data** — `@type: BeautySalon` schema with services, pricing (ZAR), opening hours, address, phone, email, and `sameAs` social links
- Local SEO geo tags: `geo.region: ZA-GP`, `geo.placename`, `ICBM` coordinates
- `robots.txt` — priority crawlers, social media bots, SEO tool rate-limiting, AI training crawler blocks, internal path protection
- `site.webmanifest` — PWA manifest with `theme-color: #C2005F`, icons, `display: standalone`
- `canonical` URL, `robots: index, follow, max-image-preview:large`

#### ⚡ Performance
- `LazyImage` component — IntersectionObserver with `rootMargin: 300px` pre-fetch, `loading="lazy"`, `decoding="async"`, `fetchPriority` control
- `ImageSkeleton` — animated shimmer sweep with floral pulse icon placeholder
- Three image states: loading skeleton → fade-in reveal → error fallback (layout-preserving)
- `priority` prop for above-fold images (`fetchPriority="high"`, `loading="eager"`)
- Custom cursor runs on `requestAnimationFrame` with 0.12 lerp factor (no layout thrash)
- All scroll reveal animations use `IntersectionObserver` (no scroll event listeners)
- Skill bar fills triggered by IntersectionObserver with CSS `scaleX` transform

#### 📱 Mobile-First
- All interactive elements minimum `48px` touch target height
- Sticky bottom bar on quote form (price + CTA always visible)
- Mobile nav: full-screen overlay with Playfair italic links
- Bottom sheet modal replaces full-page route on mobile
- `dvh` units for correct viewport height on mobile browsers

#### ⚙️ Configuration
```env
VITE_OWNER_PHONE=27691255967
VITE_SALON_LAT=-26.0936
VITE_SALON_LNG=28.0064
VITE_PER_KM_RATE=12.00
VITE_BASE_HOUSE_FEE=150.00
VITE_CALENDLY_URL=https://calendly.com/nsukugold07
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── LazyImage.tsx          # Lazy loader with skeleton
│   │   └── ImageSkeleton.tsx      # Shimmer placeholder
│   ├── BookingQuestionnaire.tsx   # Premium quote form
│   ├── BookingModal.tsx           # Slide-up modal shell
│   └── CustomCursor.tsx           # Heart cursor + ring
├── context/
│   └── ModalContext.tsx           # Global modal state
├── hooks/
│   ├── useImageLoader.ts          # IntersectionObserver + img preload
│   └── useGlobalInteractions.ts   # Scroll + bento glow observers
├── pages/
│   ├── Index.tsx                  # Main one-page site
│   └── NotFound.tsx               # Branded 404
├── App.tsx                        # Router + modal provider
├── main.tsx
public/
├── favicon-32x32.png
├── apple-touch-icon.png
├── og-image.jpg                   # 1200×630 social share image
└── site.webmanifest
.env                               # Local env (git-ignored)
.env.example                       # Safe template (committed)
tailwind.config.ts                 # Full brand token system
vite.config.ts                     # SWC compiler + @ alias
robots.txt                         # Crawler rules
```

---

## 🗓️ Contact Details

```
Phone / WhatsApp : +27 (0) 69 125 5967
Instagram        : @nailsbyshasha2025
Email            : nsukugold07@gmail.com
Hours            : Mon–Sat 09:00–17:00 | Sun & Public Holidays 10:00–15:00
Location         : Randburg, Johannesburg, Gauteng, ZA
```

---

---

## 🔮 Version 2.0 — Roadmap (In Planning)

> Everything below is **planned and not yet built**. v2 migrates the platform to a full-stack architecture with a CMS-managed backend and admin dashboard.

### Planned Tech Stack Changes

| Layer | v1 (Current) | v2 (Planned) |
|---|---|---|
| Framework | Vite + React | **Next.js 14 App Router** |
| Rendering | CSR | **SSR + ISR** (better SEO) |
| CMS | None | **Payload CMS 3.0** |
| Database | None | **PostgreSQL** (via Payload) |
| Auth | None | **Payload built-in auth** |
| Image CDN | Static `/public` | **Payload media uploads** |
| Email | WhatsApp only | **Nodemailer / Resend** |
| Hosting | Vercel (static) | **Vercel (serverless + DB)** |

---

### 🛠️ v2 Planned Features

#### Admin Dashboard
- Secure login portal for Shasha (Payload CMS admin UI)
- **Gallery management** — upload, tag, reorder, and delete nail photos without touching code
- **Services management** — update service names, descriptions, and prices from a UI
- **Testimonials management** — add, edit, and approve client reviews
- **Operating hours** — update salon hours dynamically (reflected on site and JSON-LD schema)
- **Quote inbox** — view all WhatsApp quote inquiries logged to the database
- **Booking overview** — Calendly webhook integration to surface upcoming appointments in the dashboard

#### Client-Facing Upgrades
- **Dynamic gallery** — photos served from Payload CMS with tag filtering (gel, art, extensions, etc.)
- **Dynamic services** — prices and descriptions pulled from CMS (no redeployment needed to update a price)
- **Dynamic testimonials** — reviews managed from admin, rendered with ISR
- **Blog / Nail Tips section** — Payload-powered articles for SEO content marketing
- **Email notifications** — confirmation email to client + notification to Shasha when a quote form is submitted
- **Google Maps embed** — interactive map showing salon location on the About/Contact section

#### Technical Upgrades
- Migration from Vite CSR → **Next.js SSR/ISR** for improved Core Web Vitals and Google indexing
- **Sitemap.xml** auto-generated from Next.js routes
- **Image optimisation** via `next/image` (automatic WebP conversion, responsive `srcset`)
- **Payload webhooks** → trigger ISR revalidation when gallery or services are updated in CMS

---

### v2 Planned Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# Payload CMS
PAYLOAD_SECRET=

# Calendly
CALENDLY_API_KEY=
CALENDLY_EVENT_URL=
CALENDLY_WEBHOOK_SECRET=

# Email
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
RESEND_API_KEY=

# Site
NEXT_PUBLIC_SITE_URL=https://www.shashanails.co.za
NEXT_PUBLIC_OWNER_PHONE=27691255967

# Geo
NEXT_PUBLIC_SALON_LAT=-26.0936
NEXT_PUBLIC_SALON_LNG=28.0064
```

---

## 🔄 Version History

| Version | Status | Description |
|---|---|---|
| v0.1.0 | ✅ Archived | Static prototype — basic HTML/CSS portfolio |
| v1.0.0 | ✅ **Live** | Vite + React, full design system, quote form, SEO, PWA |
| v2.0.0 | 🔧 Planning | Next.js + Payload CMS + admin dashboard |

---

## 👨‍💻 Author

**Themba Ntimane**
Junior Full Stack Developer

---

## 📄 License

Private — All rights reserved. This codebase is proprietary to the Shasha Nails business.
