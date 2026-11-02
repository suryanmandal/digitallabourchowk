# Architecture

## 1. App Flow and Hybrid Rendering Architecture

The frontend combines **Pre-rendering / Server-Side Rendering (SSR)** for SEO with **Single Page Application (SPA) Client-Side Routing (Soft Navigation)** for zero-refresh instant page transitions:

```
[ First Visit / Search Engine Crawler (Googlebot) ]
       │
       ▼
[ Server-Side Rendering (SSR) & Static Pre-rendering ]
       │  (Returns complete ready-to-index HTML + Meta tags)
       ▼
[ User's Browser Hydration ]
       │
       ▼
[ Subsequent Page Navigations (Menu Clicks, Internal Links) ]
       │
       ▼
[ SPA Client-Side Routing / Soft Navigation (SiteInitializer.tsx) ]
       │  (Intercepts click -> router.prefetch -> router.push)
       │  (NO page reload, NO white flash, instantaneous 0ms swap)
       ▼
[ Dynamic Component Tree Update & DOM Rehydration ]
       ├── Layout & Styles remain resident in memory
       ├── Route content swaps seamlessly
       └── Scroll smoothly resets to top
```

### Rendering Strategies Explained:
1. **Initial Page Load & SEO**:
   - **SSR / SSG**: When a user or search engine accesses any URL (`/`, `/about-us`, `/business`, `/worker`, etc.), the full HTML document is served with all 19 headings, hero copy, worker stats, partner logos, and FAQ content. This delivers **100% SEO indexability** and instant Core Web Vitals (LCP, FCP).
2. **In-App Page Transitions**:
   - **SPA / Client-Side Routing (Soft Navigation)**: Handled by `next/navigation` router and intercepted via `SiteInitializer.tsx`. When a user clicks any navigation link or CTA, the browser does **NOT** reload or refresh the page. Instead, Next.js swaps the component tree dynamically and updates the URL via `history.pushState`.

---

## 2. Folder and File Structure

```text
dlc_website/
├── app/
│   ├── layout.tsx                # Global SEO metadata, 33 original stylesheets & SiteInitializer
│   ├── page.tsx                  # SSR Home landing page assembling hosted body
│   ├── globals.css               # Core styling directives & scrollbar customization
│   ├── about-us/page.tsx         # SSR About Us page
│   ├── business/page.tsx         # SSR B2B & Contractor workforce solutions
│   ├── worker/page.tsx           # SSR Worker / Rozgar DLC job search portal
│   ├── projects/page.tsx         # SSR Construction project showcases
│   ├── contact/page.tsx          # SSR Office locations & direct inquiry form
│   ├── for-collaboration/page.tsx# SSR Press coverage & strategic partnerships
│   ├── blogs/page.tsx            # SSR Construction market updates & wage guides
│   ├── onboarding/page.tsx       # Role-based OTP authentication portal
│   ├── admin/leads/page.tsx      # Real-time CRM Leads Dashboard
│   └── api/leads/route.ts        # MERN-ready API endpoint for lead capture (GET & POST)
├── components/
│   ├── SiteInitializer.tsx       # SPA link interceptor, route hydration, accordions & carousels
│   ├── Navbar.tsx                # Brand navigation bar
│   ├── Hero.tsx                  # Hero component with LCP optimization
│   ├── PartnerCarousel.tsx       # Partner carousel
│   ├── RoleCards.tsx             # 3 Stakeholder pillars
│   ├── WorkerCategories.tsx      # Verified trade cards
│   ├── HowItWorks.tsx            # 3-step dispatch explanation
│   ├── LeadForm.tsx              # Instant booking form
│   ├── Testimonials.tsx          # Client reviews
│   └── Footer.tsx                # Global footer
├── public/
│   ├── raw_pages/                # Extracted 1:1 original HTML templates
│   ├── site_files/               # Production CSS stylesheets, JS libraries & fonts
│   ├── wp-content/               # Original uploaded images & media
│   └── assets/                   # Brand assets & logos
├── leads.json                    # Local database for lead inquiries
├── next.config.ts                # Next.js configuration & legacy slug rewrites
├── tailwind.config.ts            # Tailwind styling setup
└── package.json                  # Next.js 15, React 19 & Lucide icons dependencies
```

---

## 3. Tech Stack

- **Framework**: Next.js 15.5 (App Router with Hybrid SSR + SPA Client-Side Routing)
- **UI Runtime**: React 19 + TypeScript
- **Styling**: Tailwind CSS + Original Production CSS Kits (Elementor, Blocksy)
- **Icons**: Lucide React
- **Carousels**: Swiper 11 + CSS Hardware Accelerated Transforms
- **API**: Next.js Route Handlers (Node.js runtime, RESTful JSON)
- **Database**: Local JSON storage (`leads.json`), expandable to MongoDB via Mongoose
