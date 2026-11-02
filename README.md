<div align="center">

# 🏗️ DIGITAL LABOUR CHOWK (DLC)

### *India's Premier Tech-Driven Construction Workforce & Contractor Marketplace*

[![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](#contributing)

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack--architecture">Architecture</a> •
  <a href="#-pages--routes">Pages</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-documentation">API Docs</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

</div>

## 📌 Executive Overview

**Digital Labour Chowk (DLC)** is an enterprise-grade digital platform transforming India's unorganized daily wage construction ecosystem into a transparent, verified, on-demand workforce exchange.

By leveraging cutting-edge web technologies, DLC connects skilled and semi-skilled blue-collar workers directly with subcontracting teams, project engineers, and major infrastructure conglomerates (e.g., **Tata Projects, Godrej, Piramal, L&T, DLF**).

```
  ┌─────────────────┐       ┌────────────────────────┐       ┌────────────────────────┐
  │  👷 Workers     │       │  🏗️ Contractors        │       │  🏢 Enterprise B2B     │
  │  • Daily Wage   │ ◄───► │  • Project Bidding     │ ◄───► │  • Bulk Dispatch       │
  │  • Trade Jobs   │       │  • Workforce Sourcing  │       │  • Compliance Tracking │
  └─────────────────┘       └────────────────────────┘       └────────────────────────┘
                                         ▲
                                         │
                         ┌───────────────────────────────┐
                         │  🌐 Digital Labour Chowk Hub  │
                         │     (Next.js 15 + React 19)   │
                         └───────────────────────────────┘
```

---

## 📊 Platform Impact at a Glance

| Metric | Achievement | Impact Indicator |
| :--- | :--- | :--- |
| 👷‍♂️ **Registered Workers** | **350,000+** | Masons, Carpenters, Welders, Electricians, Helpers |
| 🏗️ **Trusted Contractors** | **20,000+** | Active subcontractors bidded across India |
| 🏢 **Enterprise Partners** | **50+** | Top-tier construction firms deploying bulk crews |
| 📍 **Geographic Footprint** | **100+ Cities** | Active coverage in Delhi NCR, UP, Haryana, Maharashtra, Tamil Nadu |

---

## ⚡ Core Highlights & Innovations

### 🚀 1. Hybrid SSR + SPA Soft Navigation
- **100% SEO Indexability**: Full Server-Side Rendering (SSR) sends complete ready-to-index HTML payloads (>600 KB) on initial page request for optimal Googlebot indexing.
- **Zero-Refresh Transitions**: Integrated client-side link interception in [`SiteInitializer.tsx`](components/SiteInitializer.tsx) enables instant 0ms page transitions without white flashes or hard browser reloads.
- **Instant Hover Prefetching**: Route payloads pre-fetch in background memory on cursor hover for immediate route swaps.

### 🔍 2. Interactive Contractor Projects Hub
- **Multi-Facet Dynamic Filtering**: Real-time filtering across **5 dimensions**:
  - `Project Type`: *Commercial Building, Industrial, Infrastructure, Residential*
  - `Work Type`: *Labour Supply, Measurement Basis*
  - `Company`: *Tata Projects, Piramal, 7 Star Impex, Shramlink, etc.*
  - `Trade / Work`: *Barbender, Mason, Carpenter, Electrician, Plumber, Welder, etc.*
  - `State`: *Delhi NCR, Haryana, Maharashtra, Tamil Nadu, Uttar Pradesh, Uttarakhand*
- **Live Result Counter & Fallbacks**: Real-time counter badge with instant reset button and "No matching projects" UI fallback.
- **Card Selection & Inquiry Drawer**: Instant toggle for project selection badges and seamless lead submission to the coordinator desk.

### 🛡️ 3. Built-In CRM Leads Dispatch Engine
- Native RESTful API (`/api/leads`) with automatic validation, UUID assignment (`DLC-XXXXXX`), and persistent storage.
- Real-time dispatcher portal (`/admin/leads`) providing team members with filtering by worker trade, instant calling, and application status tracking.

---

## 🛠️ Tech Stack

<table width="100%">
  <tr>
    <th width="30%">Layer</th>
    <th width="70%">Technologies Used</th>
  </tr>
  <tr>
    <td><strong>Frontend Framework</strong></td>
    <td><a href="https://nextjs.org/"><strong>Next.js 15.5</strong></a> (App Router, Server & Client Components)</td>
  </tr>
  <tr>
    <td><strong>UI Library & Runtime</strong></td>
    <td><a href="https://react.dev/"><strong>React 19.0</strong></a> + <a href="https://www.typescriptlang.org/"><strong>TypeScript 5.7</strong></a></td>
  </tr>
  <tr>
    <td><strong>Styling Architecture</strong></td>
    <td><a href="https://tailwindcss.com/">Tailwind CSS 3.4</a> + Production Blocksy Theme & Elementor CSS Kits</td>
  </tr>
  <tr>
    <td><strong>Iconography</strong></td>
    <td><a href="https://lucide.dev/">Lucide React</a> + Font Awesome 6.5.1</td>
  </tr>
  <tr>
    <td><strong>Carousels & Motion</strong></td>
    <td><a href="https://swiperjs.com/">Swiper 11</a>, Intersection Observer API, CSS Hardware Transforms</td>
  </tr>
  <tr>
    <td><strong>Backend & Database</strong></td>
    <td>Next.js Route Handlers (Node.js runtime, REST API) + Local JSON Storage (MERN/MongoDB ready)</td>
  </tr>
  <tr>
    <td><strong>Deployment Ready</strong></td>
    <td>Vercel, AWS Amplify, Docker, Nginx / Node.js VPS</td>
  </tr>
</table>

---

## 🗺️ Application Routes

| Path | Purpose | Key Functionality |
| :--- | :--- | :--- |
| [`/`](app/page.tsx) | **Home Marketplace** | Stakeholder role switcher, live counters, client reviews, FAQ accordion |
| [`/projects`](app/projects/page.tsx) | **Contractor Projects Hub** | 5-facet live filter, project selection, application sidebar |
| [`/business`](app/business/page.tsx) | **B2B / Corporates Portal** | Enterprise workforce hiring, SLA-backed bulk labour deployment |
| [`/worker`](app/worker/page.tsx) | **Rozgar / Worker Portal** | Job listings, wage calculators, direct job application form |
| [`/about-us`](app/about-us/page.tsx) | **Company Story & Metrics** | Mission, vision, core leadership, and nationwide impact |
| [`/contact`](app/contact/page.tsx) | **Corporate Coordinates** | Branch addresses (Noida / Bihar), hotline, and inquiry form |
| [`/for-collaboration`](app/for-collaboration/page.tsx) | **Media & Partnerships** | Press coverage, venture recognitions, ecosystem alliances |
| [`/blogs`](app/blogs/page.tsx) | **DLC Knowledge Hub** | Construction market trends, worker safety guidelines, wage insights |
| [`/onboarding`](app/onboarding/page.tsx) | **Auth & Registration** | Role-based OTP authentication portal for contractors and workers |
| [`/admin/leads`](app/admin/leads/page.tsx) | **CRM Dispatch Dashboard** | Internal leads dashboard with instant search, trade filter, and click-to-call |
| [`/api/leads`](app/api/leads/route.ts) | **RESTful Leads API** | Lead ingestion, contractor application capture, JSON database handler |

---

## 📂 Project Directory Structure

```text
dlc_website/
├── app/                            # Next.js 15 App Router
│   ├── layout.tsx                  # Global HTML wrapper, SEO metadata & production stylesheets
│   ├── page.tsx                    # Landing Page SSR component
│   ├── globals.css                 # Global styling & Tailwind directives
│   ├── about-us/page.tsx           # Mission & Company Story
│   ├── business/page.tsx           # B2B Enterprise Workforce Portal
│   ├── worker/page.tsx             # Blue-Collar Job Search Portal
│   ├── projects/page.tsx           # Contractor Projects Marketplace
│   ├── contact/page.tsx            # Office Coordinates & Inquiries
│   ├── for-collaboration/page.tsx  # Media Coverage & Accolades
│   ├── blogs/page.tsx              # DLC Knowledge Hub & Articles
│   ├── onboarding/page.tsx         # OTP Verification Portal
│   ├── admin/leads/page.tsx        # Internal CRM Leads Management Dashboard
│   └── api/leads/route.ts          # RESTful Leads Ingestion API (GET & POST)
├── components/                     # Reusable React & Client Components
│   ├── SiteInitializer.tsx         # SPA Link Interceptor, Accordion & Carousel Controller
│   ├── Navbar.tsx                  # Desktop & Mobile Navigation Bar
│   ├── Hero.tsx                    # Hero banner with Call-To-Actions
│   ├── PartnerCarousel.tsx         # Swiper-based Enterprise Client Carousel
│   ├── RoleCards.tsx               # 3 Stakeholder Pillar Cards (Worker/Contractor/B2B)
│   ├── WorkerCategories.tsx        # Trade Category Selector
│   ├── HowItWorks.tsx              # 3-Step Labour Dispatch Walkthrough
│   ├── LeadForm.tsx                # Booking Inquiry Form
│   ├── Testimonials.tsx            # Reviews Carousel with Zoom Modal
│   └── Footer.tsx                  # Brand Footer with Legal & Social Links
├── public/                         # Production Static Assets
│   ├── raw_pages/                  # Clean SSR HTML template components
│   ├── site_files/                 # Production CSS kits, JS libraries, & fonts
│   ├── wp-content/                 # Uploaded imagery, worker photos, & icons
│   └── assets/                     # Brand logos, icons, & banner images
├── Architecture.md                 # Technical Architecture Documentation
├── Design.md                       # Design System, Palette & Typography
├── Memory.md                       # Sprint History & Progress Tracking
├── Phases.md                       # Project Roadmap & Implementation Phases
├── Prd.md                          # Product Requirements Document
├── Rules.md                        # Development Guardrails & Boundaries
├── leads.json                      # Persistent Lead Inquiries Database
├── next.config.ts                  # Next.js Config & Legacy Route Rewrites
├── package.json                    # Dependencies & NPM Scripts
├── tailwind.config.ts              # Tailwind CSS Configuration
└── tsconfig.json                   # TypeScript Compiler Configuration
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.18.0` or higher (Node 20+ recommended)
- **NPM**: `v9.0.0` or higher (or Yarn / PNPM / Bun)

### 1. Clone the Repository
```bash
git clone https://github.com/suryanmandal/digitallabourchowk.git
cd digitallabourchowk
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📡 API Documentation

### Capture Lead / Project Application
- **URL**: `/api/leads`
- **Method**: `POST`
- **Header**: `Content-Type: application/json`

#### Request Payload:
```json
{
  "name": "Rajesh Kumar",
  "mobile": "9876543210",
  "email": "rajesh.civil@gmail.com",
  "city": "Noida, Uttar Pradesh",
  "workers": "Masons, Bar Benders",
  "count": "10-20 Workers",
  "company": "Kumar Civil Infra",
  "company_type": "Private Ltd",
  "projects": ["Mason (Plastering Mason)", "Barbender"],
  "source": "Contractor Project Application"
}
```

#### Response (`200 OK`):
```json
{
  "success": true,
  "message": "Lead captured successfully",
  "lead": {
    "id": "DLC-841920",
    "name": "Rajesh Kumar",
    "mobile": "9876543210",
    "email": "rajesh.civil@gmail.com",
    "city": "Noida, Uttar Pradesh",
    "workers": "Mason (Plastering Mason), Barbender",
    "company": "Kumar Civil Infra",
    "company_type": "Private Ltd",
    "source": "Contractor Project Application",
    "timestamp": "2026-11-02 11:30:00"
  }
}
```

---

## 🌐 Production Deployment

### Deploy to Vercel (Recommended)
1. Import the repository directly in **[Vercel](https://vercel.com/)**.
2. Framework Preset: **Next.js**.
3. Click **Deploy**. Vercel will build and serve your site globally on an edge network with free automated SSL.

### Deploy with Docker
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!
1. Fork the Project (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## 📄 License & Attribution

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ for the hardworking construction community of India. Powered by <strong>Digital Labour Chowk</strong>.</sub>
</div>
