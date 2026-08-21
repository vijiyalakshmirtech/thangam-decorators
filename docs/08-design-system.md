# 08. Design System & UI Specification — Thangam Decorators

## 1. Visual Theme & Aesthetic Philosophy

The visual design system for **Thangam Decorators** embodies:
> **"Regal South Indian Heritage Infused with Contemporary Architectural Elegance."**

The aesthetic avoids gaudy, chaotic clutter in favor of rich, royal, high-contrast dark and warm-ivory themes, shimmering golden accents, clean editorial typography, and cinematic imagery.

---

## 2. Color Palette System

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        PRIMARY BRAND PALETTE                           │
├──────────────────┬──────────────────┬─────────────────┬────────────────┤
│ ROYAL GOLD       │ MIDNIGHT NOCTURNE│ TEMPLE MAROON   │ WARM IVORY     │
│ #D4AF37 / #F3E5AB│ #0D0F12 / #161A22│ #7A1C28 / #560F18│ #FDFBF7 / #F7F3EB│
│ Primary Accent   │ Deep Background  │ Cultural Accent │ Clean Light BG │
└──────────────────┴──────────────────┴─────────────────┴────────────────┘
```

### Complete Color Tokens (CSS Variables):

```css
:root {
  /* Brand Core */
  --thangam-gold-50:  #FAF7E8;
  --thangam-gold-100: #F4EBC4;
  --thangam-gold-300: #E6CE78;
  --thangam-gold-500: #D4AF37; /* Primary Brand Gold */
  --thangam-gold-600: #B89020;
  --thangam-gold-800: #7A5D0E;

  /* Deep Royal Dark Accents */
  --thangam-dark-950: #0A0C0E; /* Deepest Canvas */
  --thangam-dark-900: #12151A; /* Card Surfaces */
  --thangam-dark-800: #1B2028; /* Elevated Modals & Borders */
  --thangam-dark-700: #2C3442;

  /* Traditional Heritage Accents */
  --thangam-maroon-700: #7A1C28; /* Kumkum / Temple Maroon */
  --thangam-maroon-900: #460E16;
  --thangam-emerald-700: #134E39; /* Banana leaf / Floral foliage */

  /* Neutral & Light Tokens */
  --thangam-ivory-50:  #FDFAF4;
  --thangam-ivory-100: #F5EFE3;
  --thangam-cream-200: #E8DECC;
  --thangam-text-light: #F8F9FA;
  --thangam-text-muted: #9EABB8;

  /* Feedback & Utility */
  --thangam-whatsapp: #25D366;
  --thangam-success:  #2E7D32;
}
```

---

## 3. Typography Hierarchy

### Font Pairings:
1. **Display & Headings:** `Cormorant Garamond` / `Cinzel` / `Playfair Display` (Classic, serif, regal, editorial).
2. **Body & UI Elements:** `Plus Jakarta Sans` / `Montserrat` / `Inter` (Geometric sans, high legibility on mobile screens).
3. **Tamil Cultural Accents:** `Noto Serif Tamil` / `Mukta Malar` (For Tamil headings or cultural quotes where appropriate).

### Scale & Hierarchy:
- **Hero Title (H1):** `clamp(2.5rem, 5vw + 1rem, 4.5rem)` | Line-height: 1.1 | Tracking: -0.02em | Weight: 600
- **Section Heading (H2):** `clamp(2.0rem, 3vw + 0.5rem, 3.0rem)` | Line-height: 1.2 | Weight: 600
- **Subheading / Card Title (H3):** `1.5rem (24px)` | Line-height: 1.3 | Weight: 500
- **Body Large:** `1.125rem (18px)` | Line-height: 1.6
- **Body Base:** `1.0rem (16px)` | Line-height: 1.6
- **Microcopy / Captions / Badges:** `0.75rem – 0.875rem (12px–14px)` | Tracking: 0.05em | Weight: 600 | Uppercase

---

## 4. UI Components & Design Tokens

### Buttons:
1. **Primary Gold Button:**
   - Background: Linear gradient from `#E6CE78` to `#B89020`.
   - Text: `#0A0C0E` (Dark Bold).
   - Padding: `14px 28px`.
   - Radius: `9999px` (Pill) or `4px` (Luxury sharp).
   - Hover: Golden ambient glow `0 0 20px rgba(212, 175, 55, 0.45)`, slight translateY(-2px).
2. **Secondary Ghost Button:**
   - Border: `1px solid var(--thangam-gold-500)`.
   - Text: `#D4AF37`.
   - Background: `transparent` (Hover: `rgba(212, 175, 55, 0.1)`).
3. **Floating WhatsApp Concierge Button:**
   - Background: `#25D366`.
   - Text: `#FFFFFF` with WhatsApp icon and pulsing green radar ring.

### Cards & Surfaces:
- **Stage Portfolio Card:**
  - Background: `rgba(18, 21, 26, 0.75)` with `backdrop-filter: blur(12px)`.
  - Border: `1px solid rgba(212, 175, 55, 0.15)`.
  - Corner Radius: `12px` (Modern Soft).
  - Hover Effect: Gold border illumination + image subtle zoom scale(1.04).

---

## 5. Known Data vs. Client Information Required

- `[CLIENT INFORMATION REQUIRED]` High-resolution vector logo files (.AI / .SVG / .PNG transparent) for Thangam Decorators (we currently have `logo.jpg` raster).
- `[CLIENT INFORMATION REQUIRED]` Any specific font licenses or brand guideline manual if previously commissioned.
