# Project Development Phases

## Overview
This roadmap outlines the systematic phased transition of Digital Labour Chowk from WordPress backup assets to an enterprise-grade MERN/Next.js web application.

---

### Phase 1: Foundation & Component Architecture ✅
- Initialize Next.js 15 App Router project with TypeScript and Tailwind CSS.
- Establish design tokens, typography, and color palette.
- Configure asset pipeline and migrate high-resolution brand assets into `public/`.
- Build shared base layout, responsive `Navbar`, and corporate `Footer`.

---

### Phase 2: High-Conversion Landing Page & 100% Brand Match ✅
- Build exact-match `Hero` section with LCP optimization (`fetchPriority="high"`), dual-column copy, and platform infographic.
- Build interactive `PartnerCarousel` showcasing Tier-1 builders (L&T, Sobha, Godrej, BSES, Kalpataru).
- Build `RoleCards` highlighting 3 ecosystem pillars (B2B Enterprise, Contractors, Workers).
- Build `WorkerCategories` grid with 8 trade cards, Hindi labels, and daily wage benchmarks.
- Build `HowItWorks` 3-step dispatch roadmap and `Testimonials` section.

---

### Phase 3: Interactive Lead Capture & API Layer ✅
- Create `LeadForm` with real-time trade multi-selection, site location, and crew size estimation.
- Implement Next.js API route `/api/leads` supporting both `GET` and `POST` methods.
- Integrate local database persistence (`leads.json`) with automatic unique ID generation (`DLC-XXXXXX`).
- Add instant feedback screen and error handling boundaries.

---

### Phase 4: Multi-Page Routing Expansion ✅
- Implement `/about-us`: Mission, vision, core metrics, and leadership story.
- Implement `/business`: Dedicated contractor and B2B bulk workforce portal.
- Implement `/worker`: Rozgar DLC worker jobs page with Hindi messaging and mobile app links.
- Implement `/projects`: Commercial, residential, and infrastructure project deployments.
- Implement `/contact`: Office coordinates, toll-free helpline, and direct inquiry form.
- Implement `/for-collaboration`: Media coverage, awards, and partnership inquiries.
- Implement `/blogs`: Construction market guides, safety regulations, and wage insights.

---

### Phase 5: Role-Based Authentication & Onboarding Portal ✅
- Implement `/onboarding`: Unified login/registration hub for Contractors, Enterprises, and Workers.
- Add mobile number validation and simulated 4-digit OTP verification flow.
- Add success states, role switching, and session redirection.

---

### Phase 6: Admin CRM Leads Dashboard ✅
- Implement `/admin/leads`: Internal dashboard for dispatch coordinators.
- Provide real-time data table, lead statistics, phone calling links, and timestamp sorting.
- Add client-side live refresh and error recovery.

---

### Phase 7: MongoDB / MERN Backend Integration (Upcoming)
- Replace `leads.json` with a production MongoDB Atlas connection via Mongoose.
- Define schemas for `Lead`, `Contractor`, `Worker`, and `JobPosting`.
- Add JWT-based authentication and SMS gateway integration (Twilio / Fast2SMS).

---

### Phase 8: Advanced Matchmaking & Deployment (Upcoming)
- Connect frontend to the C# Worker Matching Engine API for real-time geolocation matching.
- Implement contractor job requisition tracking and worker dispatch push notifications.
- Deploy to Vercel / Docker production cluster with CI/CD automation.
