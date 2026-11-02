# Product Requirements Document (PRD)

## 1. What to Build
A modern, high-performance **MERN-stack Next.js Frontend UI** for **Digital Labour Chowk (DLC)**. 
The application digitizes India's unorganized daily-wage construction labor market, connecting civil contractors, enterprise builders, and verified blue-collar tradesmen on one seamless, transparent web platform.

---

## 2. Targeted Users

1. **Civil Contractors & Site Supervisors (Primary B2B)**:
   - Need reliable daily-wage tradesmen (masons, electricians, plumbers, helpers) without delays.
   - Seek fast 15-minute dispatch and fixed local market wage transparency.

2. **Enterprise Builders & Real Estate Developers (B2B Enterprise)**:
   - Need bulk manpower deployment (50 to 500+ laborers) across multiple construction projects.
   - Require GST compliance, digital worker attendance tracking, and replacement guarantees.

3. **Blue-Collar Laborers & Skilled Artisans (Labor Stakeholders)**:
   - Seek dignified, direct daily job calls without standing at roadside chowks in extreme weather.
   - Want 100% free registration, zero middlemen commission, and verified digital identity cards (QR badges).

4. **DLC Dispatch Coordinators & Operations Admin**:
   - Monitor real-time hiring leads, review contractor requests, and assign verified worker gangs.

---

## 3. Features

### Core Frontend Capabilities
- **Exact Brand Hero UI**:
  - Live verified status pill: `INDIA'S TRUSTED CONSTRUCTION WORKFORCE PLATFORM`.
  - Prominent headline: `Hire Verified Construction Workforce, Faster.`
  - 3 targeted category buttons for Businesses, Contractors, and Workers.
  - High-resolution, multi-stakeholder infographic visual.
- **Partner Trust Carousel**:
  - Continuous animated carousel showcasing India's top infrastructure leaders: *Larsen & Toubro, Sobha, Godrej, BSES, Kalpa-Taru*.
- **3 Stakeholder Ecosystem Pillars**:
  - Dedicated value cards detailing specialized benefits for Developers, Contractors, and Workers.
- **Verified Trade Categories Grid**:
  - 8 core construction trades with dual English & Hindi nomenclature (*राजमिस्त्री, इलेक्ट्रीशियन, प्लंबर, बढ़ई, पेंटर, वेल्डर, सरिया कारीगर, हेल्पर*), verified worker counts, and standard wage benchmarks.
- **3-Step 15-Minute Dispatch Workflow**:
  - Clear visual roadmap of requirement posting, algorithmic smart matching, and direct site reporting.
- **Interactive Worker Requisition Form**:
  - Dynamic multi-skill selection, site location input, worker team-size estimation, and instant feedback state.
- **Role-Based Onboarding & Authentication**:
  - Interactive tabbed login/sign-up portal supporting Contractors, Enterprises, and Workers with simulated mobile OTP verification.
- **Multi-Page Routing**:
  - `/` (Home Landing Page)
  - `/about-us` (Mission, Vision, Impact Metrics)
  - `/business` (Enterprise & Contractor Solutions)
  - `/worker` (Rozgar DLC Worker Jobs Portal)
  - `/projects` (High-Rise, Township & Infrastructure Case Studies)
  - `/contact` (HQ Location, Toll-free helpline, and inquiry form)
  - `/for-collaboration` (Media Coverage, Awards & Strategic Partnerships)
  - `/blogs` (Construction Industry Guides & Wage Insights)
  - `/onboarding` (Sign-Up / Login)
  - `/admin/leads` (Internal CRM Leads Dashboard)
- **MERN-Ready API & Persistence**:
  - Integrated Next.js API route (`/api/leads`) with automatic JSON persistence and ready-to-plug MongoDB schemas.
