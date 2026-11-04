# Digital Labour Chowk (DLC) — System Memory & Operational Handbook

> **AGENT SPEED PROTOCOL (CRITICAL — READ FIRST)**:
> 1. **Do NOT run blind grep or wide directory scans**: Consult the **Site Map & File Directory** below first.
> 2. **Targeted Edits**: Only open and edit the specific file mapped to the requested feature.
> 3. **Avoid Unnecessary Full Builds**: Do not run `npm run build` for minor HTML/CSS tweaks unless verifying complex TypeScript changes.
> 4. **Keep Responses Concise**: Explain the fix directly without re-summarizing unchanged code.
> 5. **Update This File**: When significant features or fixes are completed, record them in the **Changelog** section.

---

## 1. Quick Technical Reference

- **Framework**: Next.js 15.5.28 (App Router, Webpack) + React 19 + TypeScript + Tailwind CSS
- **Architecture Pattern**: Hybrid Server-Side Rendered (SSR) HTML with Client-Side Hydration
  - Server components load raw HTML files via `fs.readFileSync` with `suppressHydrationWarning`.
  - [`components/SiteInitializer.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/components/SiteInitializer.tsx) handles all client-side hydration: SPA link routing, Swiper carousels, FAQ accordions, counters, and form submission listeners.
- **Brand Colors**:
  - Primary Blue: `#0C59D4`
  - Deep Navy / Footer Background: `#090D16` / `#0A1E3F`
  - Emerald Green: `#10B981`
  - Slate Backgrounds: `#F8FAFC` / `#0B132B`
- **Typography**: `Poppins, sans-serif` universally enforced across all components, headings, and metric counters.
- **Dev Server**: `http://localhost:3000`
- **Git Remote**: `https://github.com/suryanmandal/digitallabourchowk.git` (Branch: `main`)

---

## 2. Complete Site Map & File Index

| Route | Page Component | Raw HTML Template | Main Features / Widgets |
| :--- | :--- | :--- | :--- |
| **`/`** (Home) | [`app/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/page.tsx) | [`public/raw_pages/home.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/raw_pages/home.html) & [`public/home_body.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/home_body.html) | Hero buttons, Video showcase, Partner logos ticker, Impact numbers, Voices from the Community carousel, FAQ accordion. |
| **`/about-us`** | [`app/about-us/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/about-us/page.tsx) | [`public/raw_pages/about-us.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/raw_pages/about-us.html) | Mission/Vision, Leadership, Partner Logos swiper (`d1861b9`), Core metrics. |
| **`/business`** | [`app/business/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/business/page.tsx) | [`public/raw_pages/business.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/raw_pages/business.html) | Enterprise hiring, Metric stats (`300,000+`, `10+`), Client logos carousel, Reviews carousel (`1cefe1ab`), Video player. |
| **`/worker`** | [`app/worker/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/worker/page.tsx) | [`public/raw_pages/worker.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/raw_pages/worker.html) | Blue-collar job opportunities, YouTube explainer video with autoplay, Job category cards, Stat counters. |
| **`/projects`** | [`app/projects/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/projects/page.tsx) | [`public/raw_pages/projects.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/raw_pages/projects.html) | 5-facet Project Filter, Contractor Application Form (`#projectApplyForm`), Card selection toggling. |
| **`/contact`** | [`app/contact/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/contact/page.tsx) | [`public/raw_pages/contact.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/raw_pages/contact.html) | Contact Form (`#fluentform_8`), Google Maps iframe, Office details, FAQ accordion. |
| **`/for-collaboration`** | [`app/for-collaboration/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/for-collaboration/page.tsx) | [`public/raw_pages/media-coverage.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/raw_pages/media-coverage.html) | Media coverage carousels, Press releases, Awards gallery. |
| **`/blogs`** | [`app/blogs/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/blogs/page.tsx) | [`public/raw_pages/blogs.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/raw_pages/blogs.html) | Industry blog articles, Guides, Construction hiring insights. |
| **`/onboarding`** | [`app/onboarding/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/onboarding/page.tsx) | [`public/raw_pages/onboarding.html`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/public/raw_pages/onboarding.html) | Multi-role user registration / login portal. |
| **`/admin/leads`** | [`app/admin/leads/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/admin/leads/page.tsx) | N/A (React Client Component) | Real-time CRM Dashboard: view leads, search filter, 1-click CSV download. |
| **`/api/leads`** | [`app/api/leads/route.ts`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/api/leads/route.ts) | N/A (Next.js REST Route) | `POST` / `GET` leads; writes to `leads.json` and optionally forwards to Google Sheets webhook. |

---

## 3. Data Storage Architecture (Forms & Leads)

### Current Flow
1. **Frontend Submission**:
   - `contact.html` (`#fluentform_8`) captures name, phone, email, subject, and message.
   - `projects.html` (`#projectApplyForm`) captures name, phone, company, type, and selected projects.
   - Any general booking form posts to `/api/leads`.
2. **API Handler ([`app/api/leads/route.ts`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/api/leads/route.ts))**:
   - Assigns a unique tracking ID: `DLC-XXXXXX`.
   - Records UTC timestamp, contact info, role, source page, and message.
   - Prepends lead to [`leads.json`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/leads.json) in the project root.
3. **Admin Dashboard ([`app/admin/leads/page.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/admin/leads/page.tsx))**:
   - Accessible at `http://localhost:3000/admin/leads`.
   - Search across all leads by name, phone, city, or source.
   - **Export CSV**: 1-click download of all records into an Excel-compatible `.csv` file.

### Cloud / Production Persistence (Google Sheets Integration)
Because serverless hosts (e.g., Vercel) have read-only lambdas, [`/api/leads/route.ts`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/api/leads/route.ts) includes webhook support. To mirror all leads directly into Google Sheets:
1. Deploy a Google Apps Script Web App on a Google Sheet.
2. Add the URL to `.env.local`:
   ```env
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Every submission will automatically append a new row in Google Sheets in real-time.

---

## 4. Completed Fixes & Engineering History

### A. Voices from the Community Testimonial Carousel
- **Location**: `public/raw_pages/home.html` & `public/home_body.html` (`2e4a130b`, `.elementor-widget-testimonial-carousel`).
- **Fix**: Removed static duplicate slides; added swiper initialization in [`components/SiteInitializer.tsx`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/components/SiteInitializer.tsx) with autoplay (4.5s delay), pause on hover, infinite loop, and responsive breakpoints (3 desktop, 2 tablet, 1 mobile).
- **Styling**: Overrode `font-size: 0px` on navigation buttons in [`app/globals.css`](file:///Users/suryanarayanmandal/Company%20Project/dlc_website/app/globals.css) with circular blue-hover buttons (`#0C59D4`).

### B. Contact Us & Project Forms Overhaul
- **Location**: `public/raw_pages/contact.html`, `public/raw_pages/projects.html`, `app/api/leads/route.ts`.
- **Fix**: Corrected field name extraction for FluentForm (`names_1[first_name]`, `numeric_field`, `input_text`, `message`). Added in-page confirmation banner with reference ID. Enabled CSV export and search filtering on `/admin/leads`.

### C. Hero Buttons Alignment & Dimensions
- **Location**: `public/raw_pages/home.html` & `public/home_body.html`.
- **Fix**: Standardized dimensions for the 3 hero action buttons (`Find Contractors`, `Find Workers / Projects`, `Find Verified Jobs`) to `min-width: 195px; max-width: 215px; height: 48px`, aligned left.

### D. Metric Stat Numbers Typography
- **Location**: `business.html`, `worker.html`, `contact.html`, and `app/globals.css`.
- **Fix**: Numbers (`300,000+`, `10+`, `12,000+`, `10,000+`) styled in bold pure white (`#ffffff`, `font-weight: 700`), labels in normal white (`#ffffff`, `font-weight: 400`).

### E. Video Framing & Autoplay
- **Worker Page Video** (`worker.html`): Replaced remote YouTube thumbnail with high-res local asset (`/wp-content/uploads/2026/03/Youtube-Thumbnail.jpg`), enabled autoplay parameters (`autoplay=1&mute=1&playsinline=1`), and eliminated black bar framing.
- **Home Video** (`home.html`): Configured `autoplay`, `muted`, `loop`, `playsinline` attributes.

### F. Google Maps Display
- **Location**: `public/raw_pages/contact.html`.
- **Fix**: Replaced broken Elementor iframe placeholder with responsive Google Maps embed showing Digital Labour Chowk's official registered office.

### G. Media Coverage Carousel Recovery
- **Location**: `public/raw_pages/media-coverage.html`.
- **Fix**: Restored missing image carousels (`d426b04`, `3e8d1fd`, `8fa8043`), reconnected local media assets, and added dynamic Swiper bindings.

### H. About Us Carousel Flash Resolution
- **Location**: `components/SiteInitializer.tsx` & `app/globals.css`.
- **Fix**: Resolved flash-and-disappear bug by stripping stale duplicate clones and ensuring `pagination` option is never passed with a `null` or `undefined` DOM element.

### I. Favicon Branding
- **Location**: `app/layout.tsx`, `public/favicon.ico`, `public/favicon.png`, `app/icon.png`.
- **Fix**: Replaced generic logo with official high-res DLC emblem (`200x200` PNG) with multi-format support (`ico`, `png`, Apple touch icon).

### J. "Numbers That Speak" Mobile Overlap & Repetition Fix
- **Location**: `app/globals.css`.
- **Fix**: Scoped `.elementor-element-3d0a2f97` (desktop 4-column counter grid) strictly to `@media (min-width: 1025px)` and explicitly set `display: none !important;` on screens `≤ 1024px`. This prevents the desktop grid from rendering below the vertical mobile counters on phone view, completely eliminating repeated numbers and horizontal crushing/overlapping.

### K. "Still have questions?" CTA Card Centering & Vertical Stacking
- **Location**: `public/raw_pages/home.html` & `public/home_body.html`.
- **Fix**: Restored `elementor-element-baa0256` container. Enforced centering on both outer wrapper and inner container (`display: flex; justify-content: center; align-items: center; width: 100%; margin: 2.5rem auto 1.5rem auto;`). Inside the card, centered all headings and paragraphs (`text-center`, `max-w-lg mx-auto`), stacked the "Contact Support" button directly below the text (`flex justify-center w-full mt-2`), and standardized responsiveness (`w-full max-w-2xl sm:max-w-3xl`) across desktop and phone views.

### L. Preserved Heading Boldness & Subtitle Styling
- **Location**: `public/raw_pages/home.html` & `public/home_body.html`.
- **Details**: Preserved user's custom inline styles (`font-size: 1em !important; font-weight: inherit !important; vertical-align: baseline;`) on colored heading spans to maintain uniform text boldness across all display sizes. Synchronized across both files and committed (`commit 0b65c3a`).

### M. Direct Routing for Projects Portal
- **Location**: `app/projects/page.tsx`, `next.config.ts`, `components/SiteInitializer.tsx`, and raw HTML headers/footers.
- **Details**: Replaced internal `/projects` route with direct routing to official DLC external portal `https://jobs.dlc.org.in/projects`. Handled at Next.js server redirect level (307 redirect), client navigation level in `SiteInitializer`, and in all header/footer HTML hyperlinks.

### N. Unified Admin Dashboard & Blog Control Desk
- **Location**: `app/admin/layout.tsx`, `app/admin/page.tsx`, `app/admin/blogs/page.tsx`, `app/api/blogs/route.ts`, `data/blogs.json`, and `app/admin/leads/page.tsx`.
- **Details**: Built an enterprise-grade DLC Command Hub with unified sidebar navigation:
  - **Overview (`/admin`)**: Real-time KPI metrics (Total leads, Published blogs, Jobs & Projects status), latest inquiries, and content control.
  - **Leads & CRM (`/admin/leads`)**: Full CRM with search, source filtering, CSV export, and 1-click WhatsApp messaging (`https://wa.me/91...`).
  - **Blog Control Desk (`/admin/blogs`)**: Full CRUD publishing system (Create, Edit, Delete, Draft/Publish toggling, image presets, tags, reading time, and preview). Backed by REST API (`/api/blogs`) and structured `data/blogs.json`.

---

## 5. Working Rules for Future Tasks

1. **Check this file first**: Always verify if a component has an existing fix or specific styling rule documented here.
2. **Poppins Font Family**: Any new text, button, or card must adhere to `font-family: Poppins, sans-serif`.
3. **Swiper Initialization Rule**: Always check `if (prevBtn && nextBtn)` and `if (paginationEl)` before adding them to `new window.Swiper()`. Never pass `undefined` to Swiper options.
4. **Link Routing Rule**: Internal hyperlinks must point to clean Next.js paths (e.g., `/business`, `/worker`, `/contact`) so delegated client-side SPA routing functions seamlessly.
