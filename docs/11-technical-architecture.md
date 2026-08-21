# 11. Technical Architecture & System Specification — Thangam Decorators

## 1. Architectural Principles

1. **Single Source of Truth:** All site-wide metadata, contact details, social links, and feature switches reside in one canonical, non-duplicated configuration file (`src/config/site.ts`).
2. **CMS-Ready, CMS-Free for V1:** Static, strongly typed local data models (`src/data/`) eliminate database maintenance, hosting costs, and security attack vectors while allowing a seamless transition to a headless CMS in the future without UI refactoring.
3. **Zero Hardcoded Contact Endpoints:** Phone numbers, WhatsApp numbers, email addresses, and location strings are consumed exclusively via configuration constants or helper functions.
4. **Performance & Privacy First:** Zero client-side personal data collection, zero third-party blocking scripts, and isolated dynamic imports for any heavy media.

---

## 2. Canonical Site Configuration (`src/config/site.ts`)

```typescript
/**
 * Canonical Site Configuration for Thangam Decorators
 * All components MUST consume contact, brand, and SEO data from this object.
 * NO PROPERTY MAY BE DUPLICATED.
 */

export interface SiteConfig {
  site: {
    name: string;
    url: string;
    description: string;
    locale: string;
  };
  brand: {
    name: string;
    founderName: string;
    taglineEnglish: string;
    taglineTamil: string;
    logoRaster: string;
    logoVector: string | null;
  };
  contact: {
    // Phone numbers known; client confirmation required for primary assignment
    phonePrimary: string;
    phonePrimaryDisplay: string;
    phoneSecondary: string;
    phoneSecondaryDisplay: string;
    email: string;
    // Explicit placeholder: UI conditionally handles unconfirmed WhatsApp routing
    whatsappNumber: string | null;
    // Explicit null: UI hides Google Review CTA until real URL is provided
    googleReviewUrl: string | null;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  location: {
    street: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    fullAddress: string;
    landmarks: string | null;
    geoCoordinates: {
      latitude: number;
      longitude: number;
    } | null; // Set to null; do not fabricate GPS coordinates
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
    defaultOgImage: string;
  };
  analytics: {
    enabled: boolean;
    measurementId: string | null;
    anonymizeIp: boolean;
  };
}

export const SITE_CONFIG: SiteConfig = {
  site: {
    name: "Thangam Decorators",
    url: "https://thangamdecorators.com", // Canonical production URL placeholder
    description: "Premium Stage, Wedding & Luxury Event Decoration Services by P.T. Selvam in Erode and Western Tamil Nadu.",
    locale: "en_IN"
  },
  brand: {
    name: "THANGAM DECORATORS",
    founderName: "P.T. SELVAM",
    taglineEnglish: "Crafting Grandeur for Sacred Celebrations",
    taglineTamil: "உங்கள் இல்ல மங்கல நிகழ்வுகளுக்கு பிரம்மாண்டமான மேடை அலங்காரங்கள்",
    logoRaster: "/assets/brand/logo.jpg",
    logoVector: null // Client confirmation required for SVG/transparent asset
  },
  contact: {
    phonePrimary: "+919842669882", // Client confirmation required: confirm if 98426 69882 is primary
    phonePrimaryDisplay: "+91 98426 69882",
    phoneSecondary: "+919042069882",
    phoneSecondaryDisplay: "+91 90420 69882",
    email: "Ptselvam4970@gmail.com",
    whatsappNumber: null, // Set to null until client confirms which number is the official WhatsApp line
    googleReviewUrl: null // Set to null; rendered conditionally only when real review URL is supplied
  },
  social: {
    instagram: "https://www.instagram.com/selvampts/",
    facebook: "https://www.facebook.com/people/Thangam-Decorators/100065652632732/"
  },
  location: {
    street: "7/11, Agathiyar Veethi",
    city: "Erode",
    postalCode: "638 001",
    state: "Tamil Nadu",
    country: "India",
    fullAddress: "7/11, Agathiyar Veethi, Erode – 638 001, Tamil Nadu, India",
    landmarks: null,
    geoCoordinates: null // Coordinates not fabricated; set when verified
  },
  seo: {
    defaultTitle: "Thangam Decorators — Premium Wedding & Stage Decoration in Erode",
    titleTemplate: "%s | Thangam Decorators",
    defaultDescription: "Transforming wedding mandapams and reception halls with bespoke floral and architectural stage scenography by P.T. Selvam across Erode and Tamil Nadu.",
    keywords: [
      "wedding decorators in erode",
      "stage decoration erode",
      "mandapam decoration erode",
      "reception stage decorators erode",
      "thangam decorators erode",
      "p.t. selvam decorator erode"
    ],
    defaultOgImage: "/assets/brand/og-cover.jpg"
  },
  analytics: {
    enabled: false, // Default false; activated in production when measurement ID is configured
    measurementId: null,
    anonymizeIp: true
  }
};
```

---

## 3. Privacy-Centric Analytics Layer (`src/lib/analytics.ts`)

An abstraction layer decouples tracking implementation from UI components:

```typescript
/**
 * Event Tracking Abstraction Layer
 * Strict Privacy Rule: NEVER pass personal information (names, emails, phone numbers,
 * or enquiry message bodies) into event tracking payloads.
 */

export type ConversionEvent =
  | "page_view"
  | "portfolio_view"
  | "project_view"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "quote_start"
  | "quote_submit"
  | "gallery_open"
  | "service_view";

export interface EventPayload {
  category?: string;
  projectId?: string;
  serviceId?: string;
  sourceLocation?: string; // e.g. 'header', 'footer', 'sticky_bar', 'project_card'
  hasCustomDate?: boolean;
}

export function trackEvent(event: ConversionEvent, payload: EventPayload = {}): void {
  if (!SITE_CONFIG.analytics.enabled || typeof window === "undefined") {
    // Graceful no-op during development or if analytics is disabled
    return;
  }

  try {
    // Non-blocking telemetry dispatcher (GA4 / Custom Webhook)
    if (typeof (window as any).gtag === "function" && SITE_CONFIG.analytics.measurementId) {
      (window as any).gtag("event", event, {
        ...payload,
        event_category: "Conversion",
        anonymize_ip: SITE_CONFIG.analytics.anonymizeIp
      });
    }
  } catch (err) {
    // Silent fail to ensure user experience is never impacted
  }
}
```

---

## 4. Environment Variables & Security Architecture

### Configuration vs. Environment Variable Separation:

| Variable | Scope | Purpose | Stored In |
| :--- | :--- | :--- | :--- |
| `SITE_CONFIG` | Public / Client-side | Brand data, addresses, UI copy, phone numbers | `src/config/site.ts` |
| `NEXT_PUBLIC_SITE_URL` | Public / Build-time | Production base domain for canonical URL generation | `.env.production` |
| `NEXT_PUBLIC_GA_ID` | Public / Client-side | Google Analytics Measurement ID (optional) | `.env.local` / CI |
| `RESEND_API_KEY` | **Server-Only / Secret** | Transactional email delivery for quote forms | Serverless Env (Vercel) |
| `CONTACT_RECIPIENT_EMAIL` | **Server-Only** | Destination inbox for quote forms | Serverless Env (Vercel) |

### Security Measures for Version 1:
1. **Zero Secrets in Repository:** `.gitignore` blocks all `.env`, `.env.local`, and credential files.
2. **Safe External Links:** All outbound links (Instagram, Facebook, Google Maps) enforce `rel="noopener noreferrer"` and `target="_blank"`.
3. **Form Sanitization & Anti-Spam:**
   - Honeypot hidden input field to silently trap automated bot submissions.
   - Strict string length and email regex sanitization on form inputs.
   - Client-side rate-limiting preventing rapid consecutive form submissions.
4. **No Password Storage / Client Credentials:** Domain DNS records are managed directly by the client or delegated via official registrar mechanisms.

---

## 5. Performance Architecture & Asset Budgets

1. **Asset Pipeline:**
   - All portfolio photos pre-compiled to modern WebP with explicit height/width attributes to prevent layout shift (`CLS ≤ 0.05`).
   - Priority hero image uses `<link rel="preload">` and `fetchpriority="high"`.
2. **Modular Dynamic Imports (3D / 360° / Heavy Visualizers):**
   - Immersive features are isolated in lazy wrappers (`React.lazy()` / `next/dynamic` with `ssr: false`).
   - Initial bundle includes **0 KB** of WebGL/Three.js dependencies.
3. **Font Strategy:**
   - Maximum 2 font families (Display Serif + Clean Sans), subsetted to `woff2`, loaded with `font-display: swap`.

---

## 6. Target Project Directory Structure

```text
website thangam/
├── src/
│   ├── config/
│   │   └── site.ts                    # Single canonical configuration
│   ├── types/
│   │   ├── site.ts                    # Configuration types
│   │   ├── project.ts                 # Portfolio data schemas
│   │   ├── service.ts                 # Service data schemas
│   │   ├── testimonial.ts             # Testimonial data schemas
│   │   └── faq.ts                     # FAQ data schemas
│   ├── data/
│   │   ├── projects.ts                # Structured real stage projects
│   │   ├── services.ts                # Confirmed service definitions
│   │   ├── testimonials.ts            # Verified client testimonials (empty-safe)
│   │   ├── faqs.ts                    # Verified FAQs
│   │   └── siteContent.ts             # Static UI section copy
│   ├── components/
│   │   ├── common/                    # Button, Badge, Modal, Lightbox, Container
│   │   ├── layout/                    # Header, Footer, MobileStickyBar
│   │   └── ui/                        # Card, ImageWrapper, Accordion, ContactForm
│   ├── sections/                      # HeroSection, AboutSection, ServicesSection,
│   │                                  # PortfolioSection, ProcessSection, FaqSection
│   ├── hooks/                         # useScroll, useMediaQuery, useLightbox
│   ├── lib/
│   │   └── analytics.ts               # Privacy-friendly tracking layer
│   ├── utils/                         # WhatsApp URL generator, formatters, validators
│   └── styles/
│       └── globals.css                # CSS variables, Tailwind directives, motion tokens
├── assets/
│   ├── brand/                         # logo.jpg, favicon, social share cards
│   ├── portfolio/                     # Optimized WebP stage photography
│   └── raw/                           # Raw client media files
├── docs/                              # Complete product & architecture documentation
└── public/                            # Favicon, robots.txt, sitemap.xml
```
