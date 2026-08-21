# 14. Master Build Roadmap (Phases 0 to 12) — Thangam Decorators

## Master Architectural Phase Index

```text
┌────────────────────────────────────────────────────────────────────────┐
│               THANGAM DECORATORS 13-PHASE MASTER ROADMAP               │
├────────────────────┬────────────────────┬──────────────────────────────┤
│ FOUNDATIONS        │ CORE BUILD         │ REFINEMENT & LAUNCH          │
├────────────────────┼────────────────────┼──────────────────────────────┤
│ Phase 0: Research  │ Phase 3: Core Site │ Phase 8: SEO + Local SEO     │
│ Phase 1: Business  │ Phase 4: Portfolio │ Phase 9: Performance         │
│         & Strategy │ Phase 5: Conversion│ Phase 10: QA (Comprehensive) │
│ Phase 2: UX +      │ Phase 6: Motion    │ Phase 11: Production +       │
│         Design     │ Phase 7: Immersive │           Analytics          │
│                    │                    │ Phase 12: Future Growth      │
└────────────────────┴────────────────────┴──────────────────────────────┘
```

---

### PHASE 0 — Research
- **Objective:** Consolidate verified client information, raw stage assets, and regional market realities without fabrication.
- **Tasks:**
  - Audit the 24 WhatsApp stage images and `logo.jpg` in `assets/raw/`.
  - Log confirmed business details (P.T. Selvam, Erode 638 001 address, phone numbers: 98426 69882, 90420 69882).
  - Map regional Tamil wedding calendars and Kongu venue patterns.
- **Dependencies:** None.
- **Measurable Acceptance Criteria:**
  - Research document complete with all confirmed client items cataloged.
  - Zero fabricated client metrics, awards, or pricing.
- **Client Information Required:** Confirmation of primary phone number vs secondary phone number; official WhatsApp line.

---

### PHASE 1 — Business & Strategy
- **Objective:** Establish the business positioning, conversion pathways, site hierarchy, and grounded content models.
- **Tasks:**
  - Map user personas (Kongu Wedding Couple, Family Elder, NRI Planner).
  - Define sitemap tree and navigation routes.
  - Formulate brand positioning: *"Erode's Premier Luxury Stage & Wedding Scenography Atelier"*.
  - Design data schemas for services, portfolio items, and FAQs.
- **Dependencies:** Phase 0.
- **Measurable Acceptance Criteria:**
  - Complete sitemap with explicit route paths (`/`, `/about`, `/services`, `/portfolio`, `/contact`).
  - Strategy approved with zero unverified nationwide claims.
- **Client Information Required:** Confirmation of core service specializations.

---

### PHASE 2 — UX + Design System
- **Objective:** Build a cohesive visual design system rooted in South Indian royal heritage and modern elegance.
- **Tasks:**
  - Define CSS custom properties for Royal Gold (`#D4AF37`), Midnight Noir (`#0D0F12`), Temple Maroon (`#7A1C28`), and Warm Ivory (`#FDFBF7`).
  - Establish typographic hierarchy using Display Serif headings and clean Sans-Serif body copy.
  - Build design tokens for buttons (Primary Gold, Ghost Gold, WhatsApp Emerald), cards, badges, and modals.
  - Create wireframe layouts for mobile and desktop viewports.
- **Dependencies:** Phase 1.
- **Measurable Acceptance Criteria:**
  - Color contrast ratios achieve WCAG 2.1 AA standard (≥ 4.5:1 for body text, ≥ 3.0:1 for large display text).
  - Design token CSS variables fully documented and configured.
- **Client Information Required:** High-resolution transparent PNG / SVG logo (if available).

---

### PHASE 3 — Core Website
- **Objective:** Construct the foundational responsive frontend shell and core informational sections.
- **Tasks:**
  - Initialize static Next.js/React engine with Tailwind CSS.
  - Build responsive Navigation Header with click-to-call direct trigger.
  - Build persistent Mobile Sticky Contact Bar (Call, WhatsApp, Portfolio, Quote).
  - Build Hero Section featuring verified photography and dual primary CTAs.
  - Build About Section highlighting P.T. Selvam’s craftsmanship.
  - Build Services Overview grid with structured service cards.
- **Dependencies:** Phase 2.
- **Measurable Acceptance Criteria:**
  - Zero console errors during development build.
  - All navigation links route correctly with 200 HTTP status.
  - Mobile bottom bar persists cleanly across mobile viewports (320px–768px).
- **Client Information Required:** Year business was established (optional milestone text).

---

### PHASE 4 — Portfolio
- **Objective:** Build an organized, high-performance filterable gallery using authentic stage photography.
- **Tasks:**
  - Curate and categorize the 24 client photos into themes: *Traditional Mandapams*, *Reception Stages*, *Pre-Wedding / Haldi*, and *Temple & Cultural*.
  - Convert and optimize raw JPEGs into responsive WebP formats with fallback sizing.
  - Build responsive gallery grid with active category filter tabs.
  - Implement accessible modal lightbox with stage details and context-aware WhatsApp CTA.
- **Dependencies:** Phase 3.
- **Measurable Acceptance Criteria:**
  - 100% of displayed photos are authentic client images.
  - Image lightbox opens and closes cleanly with keyboard (`Escape`) and touch gestures.
  - Category switching performs instantaneously without page reload.
- **Client Information Required:** Specific venue names or stage titles if desired.

---

### PHASE 5 — Conversion System
- **Objective:** Implement reliable lead capture mechanisms and direct communication channels.
- **Tasks:**
  - Build configurable WhatsApp deep-link handler (`WHATSAPP_NUMBER`) with pre-populated event details.
  - Implement 1-tap `tel:` and `mailto:` links with active event trackers.
  - Build structured Quote / Date Inquiry form (date picker, venue input, service selector).
  - Implement client-side form validation with accessible error alerts and submission feedback.
- **Dependencies:** Phase 4.
- **Measurable Acceptance Criteria:**
  - Form validation blocks empty/invalid submissions and highlights incorrect fields with visible error text.
  - WhatsApp links generate valid URLs that open WhatsApp Web on desktop and WhatsApp App on mobile with pre-filled message text.
- **Client Information Required:** Confirmation of official WhatsApp number.

---

### PHASE 6 — Motion & Interactions
- **Objective:** Enhance user experience with subtle, hardware-accelerated animations.
- **Tasks:**
  - Add gentle CSS fade-up entrance animations on scroll.
  - Implement golden ambient glow on card hover states.
  - Add interactive accordion animations for FAQs.
  - Implement strict `prefers-reduced-motion: reduce` CSS media queries.
- **Dependencies:** Phase 5.
- **Measurable Acceptance Criteria:**
  - CSS animations use only GPU-accelerated properties (`transform` and `opacity`).
  - When `prefers-reduced-motion` is active in OS settings, all animation durations evaluate to `0.01ms`.
- **Client Information Required:** None.

---

### PHASE 7 — Immersive / 3D (Fallback Architecture)
- **Objective:** Implement modular architecture for future 360°/3D media with zero current bundle bloat.
- **Tasks:**
  - Implement lightweight Before/After image comparison slider for matching stage angles (if available).
  - Create dynamic lazy-loaded component wrapper for future 360° panorama / 3D viewer.
  - *Strict Rule:* No fake 3D models or unverified assets deployed in V1.
- **Dependencies:** Phase 4.
- **Measurable Acceptance Criteria:**
  - Zero WebGL / Three.js libraries included in the initial JavaScript bundle (0 KB overhead).
  - Dynamic slot gracefully hides when 3D/360 assets are absent.
- **Client Information Required:** 360° photos or 3D CAD files (Phase 12 / Future).

---

### PHASE 8 — SEO + Local SEO
- **Objective:** Maximize search visibility across Erode and Western Tamil Nadu using clean on-page SEO and valid Schema.org markup.
- **Tasks:**
  - Inject audited Schema.org JSON-LD (`LocalBusiness`, `Organization`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`).
  - Configure page-specific Meta titles, descriptions, and Open Graph / Twitter cards.
  - Map grounded keywords for Erode, Perundurai, Bhavani, Gobichettipalayam, Tiruppur, Salem, Coimbatore.
  - Generate automated `sitemap.xml` and `robots.txt`.
- **Dependencies:** Phase 5.
- **Measurable Acceptance Criteria:**
  - Google Rich Results Test reports **0 errors** and **0 warnings** across all schema blocks.
  - All canonical URLs resolve to verified absolute production domains.
- **Client Information Required:** Exact Google Maps pin / Google Business Profile URL.

---

### PHASE 9 — Performance
- **Objective:** Optimize assets and enforce strict internal performance targets.
- **Tasks:**
  - Preload LCP hero image with `<link rel="preload">` and `fetchpriority="high"`.
  - Enforce WebP image compression (thumbnails < 35KB, hero < 100KB).
  - Apply subsetted `woff2` web fonts with `font-display: swap`.
  - Keep total uncompressed core JS < 90KB.
- **Dependencies:** Phases 3–8.
- **Measurable Acceptance Criteria (Internal Targets):**
  - Largest Contentful Paint (LCP) target: **≤ 2.2s** (on simulated 4G mobile).
  - Interaction to Next Paint (INP) target: **≤ 100ms**.
  - Cumulative Layout Shift (CLS) target: **≤ 0.05**.
  - Documented disclaimer that real-world performance varies by device, network, browser, and hosting.
- **Client Information Required:** None.

---

### PHASE 10 — QA (Quality Assurance)
- **Objective:** Rigorous, multi-faceted verification across functional, visual, accessibility, and resilience dimensions.
- **Tasks:**
  - **Link Audit:** Verify 0 broken internal links, valid `tel:` links, and valid `mailto:` links.
  - **Media Audit:** Verify 0 missing images; 100% of images have descriptive, non-empty `alt` attributes.
  - **Form Audit:** Test required field validation, email format checking, and submission success states.
  - **WhatsApp Audit:** Verify phone number formatting and URL parameter encoding across devices.
  - **Utility Pages:** Verify custom 404 page functionality with return-home navigation; verify `favicon.ico` rendering.
  - **SEO & Social Meta:** Validate Open Graph image preview rendering, canonical tags, `sitemap.xml`, and `robots.txt`.
  - **Structured Data:** Re-validate Schema.org JSON-LD via validator.schema.org.
  - **Accessibility (a11y):** Verify full keyboard tab navigation, visible `:focus-visible` rings on all interactive elements, and `prefers-reduced-motion` compliance.
  - **Layout Resilience:** Verify 0 horizontal overflow across viewports from 320px to 2560px.
  - **Touch Ergonomics:** Ensure all mobile touch targets (buttons, links, form inputs) have a minimum interactive dimension of **48px × 48px**.
  - **Network Resilience:** Test on simulated Slow 3G / Fast 3G throttling to verify graceful image loading.
  - **Console & Error States:** Verify **0 JavaScript console errors** or uncaught exceptions during user flows.
- **Dependencies:** Phase 9.
- **Measurable Acceptance Criteria:**
  - 0 broken links (internal or external).
  - 0 missing images (all image `src` resolve with HTTP 200).
  - 100% image `alt` text coverage.
  - 0 horizontal scrolling / layout breakage on screens 320px to 2560px.
  - Minimum touch target dimension ≥ 48px × 48px on mobile interactive elements.
  - 0 unhandled console errors or warnings.
- **Client Information Required:** Confirmation of staging review.

---

### PHASE 11 — Production + Analytics
- **Objective:** Secure, verified deployment to global edge infrastructure with privacy-friendly conversion analytics.
- **Tasks:**
  - **Build Verification:** Run production build (`next build` / `vite build`) and verify clean static asset generation.
  - **Security Audit:** Conduct environment variable audit and secret audit to ensure zero API keys or credentials exist in client bundles.
  - **Deployment:** Deploy production static build to Vercel or Cloudflare Pages with automatic SSL / HTTPS enforcement.
  - **URL & SEO Verification:** Verify canonical URLs, 301 redirects, robots.txt accessibility, and sitemap indexing.
  - **Metadata & Asset Check:** Verify favicon rendering, Open Graph social share cards on WhatsApp/Facebook, and 404 handling.
  - **Analytics Dispatcher Setup:** Deploy lightweight, privacy-friendly event tracking for:
    - `page_view`
    - `portfolio_engagement`
    - `portfolio_project_view`
    - `whatsapp_click`
    - `phone_click`
    - `email_click`
    - `enquiry_form_start`
    - `enquiry_form_submit`
    - `major_cta_click`
    *(No unnecessary personal data or PII collected).*
  - **Search Console Setup:** Configure Google Search Console property and submit verified `sitemap.xml`.
  - **DNS Strategy:** Provide standard DNS CNAME/A-record instructions for the client to apply directly on their domain registrar (no client passwords requested or stored).
- **Dependencies:** Phase 10.
- **Measurable Acceptance Criteria:**
  - Production URL live with valid HTTPS certificate.
  - Clean audit showing 0 exposed secrets in client bundles.
  - All 9 analytics events firing correctly in test runs.
  - Google Search Console property verified and sitemap successfully submitted.
- **Client Information Required:** Domain DNS update by client (or authorized delegation).

---

### PHASE 12 — Future Growth
- **Objective:** Establish an ongoing, sustainable content-growth loop and evaluate future feature expansions.
- **Tasks:**
  - **Event Growth Loop Implementation:** Document workflow for adding new event photography to `src/data/portfolio.ts` to automatically update the gallery, sitemap, and SEO schema.
  - **Google Reviews Evaluation:**
    - *Status:* **FUTURE / OPTIONAL**.
    - *Evaluation:* Direct Google Places API carries recurring billing risks ($17/1000 requests) and complex token maintenance.
    - *V1 Solution:* Manually verified client quote cards on-site + direct *"Review Us on Google"* link (`https://g.page/r/.../review`).
  - **3D / 360° Ingestion Guide:** Standardized ingestion path for when P.T. Selvam captures authentic 360° spherical panoramas or 3D CAD stage models.
- **Dependencies:** Phase 11.
- **Measurable Acceptance Criteria:**
  - Detailed, non-technical maintenance guide delivered to P.T. Selvam for adding new stage photos in 3 simple steps.
  - Future expansion slots documented with zero refactoring needed.
- **Client Information Required:** New event photos, customer reviews, or 360° media as they become available.
