💅 Nail Technician Portfolio & Booking Platform

A modern web application built for a professional nail technician based in Randburg, South Africa. The platform showcases services, portfolio work, and enables seamless client booking through **Calendly integration**.

This project is currently in active development:
**Version 2.0.0 is under development** — migrating into a production-grade Next.js + TypeScript architecture with Payload CMS backend and Calendly scheduling integration.

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS, Bootstrap 5 (legacy support)
- **Backend:** Payload CMS (Headless CMS)
- **Booking System:** Calendly Integration
- **Hosting:** Vercel
- **Database:** PostgreSQL 
---

## ✨ Features

### 🧑‍💼 Client Features
- Service catalogue (nails, overlays, pedicures, etc.)
- Portfolio gallery (before & after work)
- Embedded Calendly booking system
- Contact form with email notifications
- Pricing and service information

### 🛠 Admin Features (v2.0)
- Secure admin authentication (Payload CMS)
- Manage services and pricing
- Upload and manage portfolio content
- View client messages
- Booking tracking via Calendly analytics

---

## 📅 Booking System (Calendly Integration)

Instead of a custom booking engine, this system uses **Calendly**:

### Flow:
- Client selects "Book Appointment"
- Redirected or embedded Calendly widget loads
- Client chooses available time slots
- Calendly handles scheduling, reminders, and confirmations
- System receives webhook/email notifications

### Benefits:
- Real-time availability sync
- Automated reminders (email/SMS)
- Reduced backend complexity
- Reliable scheduling infrastructure

---

## 📁 Project Structure

/app → Next.js App Router
/components → UI components (Navbar, Hero, BookingEmbed)
/lib → Utilities (Calendly config, helpers)
/styles → Tailwind + Bootstrap styles
/payload → CMS configuration
/public → Static assets
/types → TypeScript types

---

## 🔄 Version History

### v1.0.0
- Static prototype via Lovable.dev
- Basic contact & portfolio system

### v2.0.0 (Current Development)
- Migrated to Next.js + TypeScript
- Payload CMS integration
- Calendly booking system integration
- Improved UI/UX and scalability

---

## ⚙️ Environment Variables

DATABASE_URL= PAYLOAD_SECRET= CALENDLY_API_KEY= CALENDLY_EVENT_URL= SMTP_HOST= SMTP_USER= SMTP_PASS= NEXT_PUBLIC_SITE_URL=

---

## 📌 Purpose

This platform helps digitize a nail technician business by:
- Showcasing professional nail work
- Allowing clients to easily book appointments via Calendly
- Reducing manual scheduling effort
- Improving brand visibility and client experience

---

## 👨‍💻 Author

**Themba Ntimane**
Software Engineer (Junior Full Stack Developer)
