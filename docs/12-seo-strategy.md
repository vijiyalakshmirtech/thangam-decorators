# 12. Local & Regional SEO Strategy — Thangam Decorators

## 1. Schema.org Structured Data Audit

To prevent search console validation warnings and rich snippet rejections, we audit and retain ONLY valid, officially supported Schema.org types:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        SCHEMA.ORG AUDIT MATRIX                         │
├────────────────────┬───────────┬───────────────────────────────────────┤
│ SCHEMA TYPE        │ STATUS    │ USAGE / RATIONALE                     │
├────────────────────┼───────────┼───────────────────────────────────────┤
│ LocalBusiness /    │ APPROVED  │ Primary entity schema with verified   │
│ ProfessionalService│           │ Erode address, NAP, coordinates & owner│
│ Organization       │ APPROVED  │ Brand identity, logo, social links    │
│ WebSite            │ APPROVED  │ Sitelinks search box & publisher data │
│ Service            │ APPROVED  │ Itemized decor offerings (Mandapams,  │
│                    │           │ Reception stages, Haldi, etc.)        │
│ BreadcrumbList     │ APPROVED  │ Clear hierarchical navigational trail │
│ FAQPage            │ APPROVED  │ Authentic FAQ answers for rich snippets│
│ ImageGallery       │ REMOVED   │ Not a distinct standard Google rich-  │
│                    │           │ result schema; replaced by standard   │
│                    │           │ ImageObject in page body.             │
│ EventVenueService  │ REMOVED   │ Non-standard schema type; replaced    │
│                    │           │ by standard ProfessionalService.      │
└────────────────────┴───────────┴───────────────────────────────────────┘
```

---

## 2. Validated Schema.org JSON-LD Implementation

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://[DOMAIN_PLACEHOLDER]/#business",
      "name": "Thangam Decorators",
      "legalName": "Thangam Decorators",
      "founder": {
        "@type": "Person",
        "name": "P.T. Selvam"
      },
      "image": "https://[DOMAIN_PLACEHOLDER]/assets/brand/logo.jpg",
      "telephone": "+919842669882",
      "email": "Ptselvam4970@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "7/11, Agathiyar Veethi",
        "addressLocality": "Erode",
        "postalCode": "638001",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Erode"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Western Tamil Nadu"
        }
      ],
      "url": "https://[DOMAIN_PLACEHOLDER]",
      "sameAs": [
        "https://www.instagram.com/selvampts/",
        "https://www.facebook.com/people/Thangam-Decorators/100065652632732/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://[DOMAIN_PLACEHOLDER]/#website",
      "url": "https://[DOMAIN_PLACEHOLDER]",
      "name": "Thangam Decorators — P.T. Selvam",
      "publisher": {
        "@id": "https://[DOMAIN_PLACEHOLDER]/#business"
      }
    }
  ]
}
```

---

## 3. Grounded Local SEO Strategy (Erode & Western Tamil Nadu)

### Primary Service Area Focus:
- **Core Hub:** Erode City (638 001), Perundurai, Bhavani, Gobichettipalayam.
- **Extended Regional Service:** Tiruppur, Salem, Coimbatore, Namakkal, Karur.
- *Strict Rule:* No fabricated multi-state or nationwide claims. Focus solely on genuine service radius in Western Tamil Nadu.

### Verified NAP (Name, Address, Phone):
- **Name:** Thangam Decorators — P.T. Selvam
- **Address:** 7/11, Agathiyar Veethi, Erode – 638 001, Tamil Nadu, India
- **Phone:** +91 98426 69882 / +91 90420 69882
- **Email:** Ptselvam4970@gmail.com
