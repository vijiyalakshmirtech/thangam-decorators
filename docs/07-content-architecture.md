# 07. Content Architecture — Thangam Decorators

## 1. Page Content Models & Section Schemas

### 1.1 Hero Section (Home Page)
- **Super-Header:** *"Bespoke Stage Scenography & Luxury Wedding Decor — Erode"*
- **Primary H1 Headline:**
  > *"Crafting Grandeur for Your Most Sacred Celebrations."*
- **Sub-Headline:**
  > *"Led by P.T. Selvam, Thangam Decorators transforms wedding halls, mandapams, and open-air venues into breathtaking royal stages across Erode and Western Tamil Nadu."*
- **Primary CTAs:**
  - `[Primary Button]` "Explore Signature Stages" (Anchor to Portfolio)
  - `[Secondary / WhatsApp Button]` "Check Date on WhatsApp" (Direct WhatsApp pre-filled link)
- **Key Credibility Bar:**
  - Metric 1: `[CLIENT INFORMATION REQUIRED]`+ Weddings Decorated
  - Metric 2: `[CLIENT INFORMATION REQUIRED]`+ Years of Scenography Excellence
  - Metric 3: `100% On-Time Muhurtham Delivery Guarantee`
  - Metric 4: `Bespoke 3D Stage Visualizations`

---

### 1.2 Signature Services Grid
Each service card requires:
1. **Visual Cover Image:** 16:9 or 4:3 high-resolution staged photo.
2. **Service Title:** e.g., *"Traditional Muhurtham Mandapams"*, *"Royal Palace Reception Sets"*, *"Sun-Kissed Haldi & Mehendi Canopies"*, *"Grand Temple Festival Decor"*.
3. **Short Description (40–50 words):** Highlighting traditional reverence, floral artistry, structural majesty, and custom lighting.
4. **Key Features Bullet Points:** (e.g. *Fresh temple flowers, carved gopuram pillars, Oonjal decor, custom brass urlis*).
5. **Card Action Link:** "View Gallery & Pricing ->"

---

### 1.3 Portfolio Gallery Data Schema
Every portfolio project item must follow this structured data format:
```json
{
  "id": "thangam-stage-001",
  "title": "Grand Chola Temple Mandapam & Lotus Pond",
  "category": "traditional-mandapam",
  "location": "Erode, Tamil Nadu",
  "venue": "[CLIENT INFORMATION REQUIRED]",
  "event_type": "Wedding & Muhurtham",
  "dimensions": "[CLIENT INFORMATION REQUIRED] (e.g. 50ft x 20ft)",
  "featured_elements": [
    "Carved Fiber Gopuram Pillars",
    "Fresh Madurai Malli & Lotus Strings",
    "Illuminated Brass Deepam Enclosures",
    "Warm Ambient 3200K Temple Uplighting"
  ],
  "image_primary": "/assets/portfolio/stage-001-main.webp",
  "image_thumbnails": [
    "/assets/portfolio/stage-001-thumb1.webp",
    "/assets/portfolio/stage-001-thumb2.webp"
  ],
  "whatsapp_inquiry_message": "Hello P.T. Selvam, I saw the Grand Chola Temple Mandapam (Stage #001) and would like to check pricing and availability for my wedding."
}
```

---

### 1.4 "The P.T. Selvam Distinction" (About / Brand Story)
- **Founder Spotlight:** Biography and artisanal journey of P.T. Selvam in the decor and wedding styling industry.
- **Craftsmanship & Values:**
  - *Fresh Floral Sourcing:* Daily direct procurement from major flower hubs (Dindigul, Sathyamangalam, Bangalore).
  - *In-House Fabrication:* No relying on third-party rented sets; direct proprietary inventory.
  - *Engineering & Safety:* Structural stage trussing, flame-retardant drapery, high-grade electrical distribution.

---

### 1.5 Frequently Asked Questions (FAQ Section)
1. **Q: How early should we book Thangam Decorators for our wedding?**
   - *A:* For peak Muhurtham dates (such as Thai, Vaikasi, and Aavani months), we recommend locking in your booking 3 to 6 months in advance. For intimate events, we accept bookings with at least 15 days notice depending on date availability.
2. **Q: Do you travel outside Erode for wedding decoration?**
   - *A:* Yes. While our workshop and primary team are based in Erode, we execute weddings and grand events across Coimbatore, Tiruppur, Salem, Namakkal, Karur, and all over Tamil Nadu.
3. **Q: Can you recreate a stage design from a Pinterest or Instagram photo?**
   - *A:* Absolutely. P.T. Selvam and our design team specialize in customized 3D scenography. Share your mood board with us, and we will tailor it to fit your venue’s exact stage dimensions and budget.
4. **Q: Are the flowers real or artificial?**
   - *A:* We offer 100% fresh exotic and traditional flowers, premium silk/artificial flowers, or a hybrid combination to maximize visual grandeur while optimizing your budget.
5. **Q: `[CLIENT INFORMATION REQUIRED]` What is your advance payment and booking confirmation policy?**

---

## 2. Microcopy & Interactive Text Guidelines

- **WhatsApp Lead Button:** *"Chat with P.T. Selvam on WhatsApp (Instant Reply)"*
- **Call Button:** *"Direct Hotline: Call P.T. Selvam"*
- **Form Submit Button:** *"Request Free Bespoke 3D Stage Proposal"*
- **Form Success Message:** *"Thank you! P.T. Selvam and the Thangam Decorators team will review your event details and respond within 2 hours."*

---

## 3. Known Data vs. Client Information Required

- `[CLIENT INFORMATION REQUIRED]` Exact founder bio / background story of P.T. Selvam.
- `[CLIENT INFORMATION REQUIRED]` Official customer service phone number and WhatsApp number.
- `[CLIENT INFORMATION REQUIRED]` Pricing starting rates (e.g., *Stages starting from ₹XX,XXX* or *Custom Quote Only*).
