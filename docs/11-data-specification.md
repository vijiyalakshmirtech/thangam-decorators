# 11. Data Specification & Content Models — Thangam Decorators

## 1. Data Architecture Principles

1. **CMS-Ready, CMS-Free (V1):** Data is modeled in strongly typed TypeScript files located in `src/data/`. This enables zero-latency build-time generation with strict compile-time validation.
2. **Zero Fabrication Policy:** Data files must contain only verified client facts. Where information is pending, safe default states or empty arrays are used. The UI is built to gracefully handle empty collections (e.g., zero testimonials).
3. **Seamless Future Migration:** TypeScript interfaces map 1-to-1 to headless CMS document schemas (e.g., Sanity / Strapi / Decap) for seamless Phase 12 upgrades.

---

## 2. Portfolio / Project Data Model (`src/types/project.ts`)

```typescript
export type ProjectCategory =
  | "traditional-mandapam"
  | "reception-stage"
  | "pre-wedding"
  | "temple-cultural";

export interface ProjectImage {
  url: string;
  altText: string;
  width: number;
  height: number;
  caption?: string;
  isCover?: boolean;
}

export interface Project {
  id: string;                      // Unique identifier, e.g. "thangam-stage-001"
  slug: string;                    // URL-safe slug, e.g. "traditional-chola-mandapam"
  title: string;                   // Display title, e.g. "Traditional Grand Mandapam"
  category: ProjectCategory;       // Category for filtering
  eventType: string;               // e.g. "Wedding & Muhurtham", "Evening Reception"
  location: string;                // e.g. "Erode, Tamil Nadu"
  date?: string;                   // Event date or year, e.g. "2025"
  coverImage: ProjectImage;        // Primary high-resolution optimized WebP
  images: ProjectImage[];          // Additional angle photos
  shortDescription: string;        // 1-2 sentence overview for cards
  description: string;             // Detailed description of materials, floral work, lighting
  style: string[];                 // e.g. ["Vedic Architecture", "Fresh Malli", "Brass Urlis"]
  featured: boolean;               // True if highlighted on Home page
  seoTitle?: string;               // Optional custom meta title
  seoDescription?: string;         // Optional custom meta description
  
  // Future Expansion Slots (Optional, default undefined in V1)
  panoramaUrl?: string;            // 360° spherical image URL (when supplied by client)
  model3dUrl?: string;             // 3D GLB model URL (when supplied by client)
}
```

### Production Data Rule:
- In production, `src/data/projects.ts` contains only authentic stage setups photographed from P.T. Selvam’s past events.
- During early wireframing, any mock records must be tagged with `isDevelopmentMock: true` and excluded from production builds.

---

## 3. Services Data Model (`src/types/service.ts`)

```typescript
export interface Service {
  id: string;                      // e.g. "wedding-mandapams"
  slug: string;                    // e.g. "traditional-wedding-mandapams"
  titleEnglish: string;            // e.g. "Traditional Wedding Mandapams"
  titleTamil: string;              // e.g. "பாரம்பரிய திருமண முகூர்த்த மேடைகள்"
  shortDescription: string;        // Brief card summary
  description: string;             // Comprehensive service scope
  features: string[];              // Key bullet points (e.g. "Fresh temple florals", "Custom pillars")
  featuredImage: ProjectImage;     // Representative stage photograph
  relatedCategory: ProjectCategory;// Maps to portfolio filter
  seoTitle: string;
  seoDescription: string;
}
```

### Verified V1 Service Catalog:
1. **Traditional Wedding & Muhurtham Mandapams** (`traditional-mandapam`)
2. **Grand Reception Stages** (`reception-stage`)
3. **Pre-Wedding & Family Ceremonies — Haldi / Mehendi / Seemantham** (`pre-wedding`)
4. **Temple & Cultural Festival Decor** (`temple-cultural`)

---

## 4. Testimonials Data Model (`src/types/testimonial.ts`)

```typescript
export interface Testimonial {
  id: string;
  customerName: string;            // e.g. "Karthik & Deepa"
  eventType: string;               // e.g. "Wedding Reception"
  location: string;                // e.g. "Erode"
  content: string;                 // Authentic client quote
  date: string;                    // e.g. "January 2025"
  source: "Google" | "Direct" | "WhatsApp";
  verified: boolean;
}
```

### Zero-Fabrication Rule:
- `src/data/testimonials.ts` begins as an empty array `[]` unless verified real feedback from P.T. Selvam's clients is supplied.
- The UI gracefully collapses or replaces the testimonial section with a *"Review Us on Google"* CTA when the array is empty.

---

## 5. FAQs Data Model (`src/types/faq.ts`)

```typescript
export type FaqCategory = "booking" | "services" | "logistics" | "pricing";

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}
```

### Verified Initial FAQs:
- **Q1 (Locations):** *Which locations does Thangam Decorators serve?*  
  *A:* We are based in Erode (638 001) and regularly execute wedding and event decorations across the entire Kongu region, including Perundurai, Bhavani, Gobichettipalayam, Tiruppur, Salem, Coimbatore, Namakkal, and Karur.
- **Q2 (Customization):** *Can you build a stage design from our Pinterest or Instagram reference photos?*  
  *A:* Yes. P.T. Selvam works closely with families to adapt inspiration photos to the exact stage dimensions, lighting conditions, and aesthetic preferences of your marriage hall.
- **Q3 (Advance Booking):** *How early should we book for auspicious Muhurtham dates?*  
  *A:* Auspicious Tamil Muhurtham dates book out rapidly. We advise contacting us as soon as your hall and date are locked in.
- **Q4 (Consultation):** *How do we get a quote for our event?*  
  *A:* You can contact P.T. Selvam directly via phone call, WhatsApp, or through our website inquiry form with your event date and venue details.

---

## 6. Site Content Data Model (`src/types/siteContent.ts`)

```typescript
export interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export interface SiteContent {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  about: {
    heading: string;
    founderQuote: string;
    paragraphs: string[];
    pillars: Array<{
      title: string;
      description: string;
    }>;
  };
  process: {
    heading: string;
    subheading: string;
    steps: ProcessStep[];
  };
  ctaBanner: {
    heading: string;
    subheading: string;
    callButtonText: string;
    whatsappButtonText: string;
  };
}
```

---

## 7. Migration Mapping: Local Data to Future CMS (V2)

When migrating to a Headless CMS in Phase 12, each data file maps directly without modifying React components:

```text
src/data/projects.ts     ───►  CMS Collection: "project" (Sanity / Decap)
src/data/services.ts     ───►  CMS Collection: "service"
src/data/testimonials.ts ───►  CMS Collection: "testimonial"
src/data/faqs.ts         ───►  CMS Collection: "faq"
src/data/siteContent.ts  ───►  CMS Singleton:  "siteSettings" / "homePage"
```
