# 10. 3D & Immersive Media Reality Check & Strategy — Thangam Decorators

## 1. Reality Check & Authenticity Directive

**Strict Rule:** DO NOT generate or build synthetic/fake 3D stage models and falsely present them as Thangam Decorators' completed client work.

The website must strictly reflect authentic work executed by **P.T. Selvam**. At present, the business possesses authentic stage photography (24+ raw job photos and real setup documentation) rather than CAD/glTF 3D models or equirectangular 360° panoramic spherical captures.

---

## 2. Phased Architecture: Current vs. Future

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        IMMERSIVE MEDIA STRATEGY                        │
├───────────────────────────────────┬────────────────────────────────────┤
│ VERSION 1 (CURRENT RELEASE)       │ VERSION 2 (FUTURE ENHANCEMENT)     │
├───────────────────────────────────┼────────────────────────────────────┤
│ • 100% Real Client Photography    │ • Optional 360° Interactive Tours  │
│ • Optimized Responsive Lightbox   │   (Only when real panorama photos  │
│ • Before/After Photo Comparison   │   are supplied by P.T. Selvam)     │
│   (Day vs Night lighting if real  │ • 3D WebGL / glTF Viewer           │
│   matching angles exist)          │   (Only if client introduces       │
│ • No heavy 3D engine overhead     │   architectural 3D renders)        │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 3. Fallback & Modular Integration Architecture

To ensure the codebase is future-ready without incurring current bundle overhead:

1. **Zero Runtime Overhead in V1:**
   - Do NOT bundle Three.js, @react-three/fiber, or Pannellum in the main application bundle.
   - All gallery components use lightweight, high-performance responsive image tags (`<img loading="lazy">` / Next.js Image component).

2. **Dynamic Lazy-Import Design for Future Media:**
   - Any future 3D or 360° components will be encapsulated in dynamic, client-side lazy wrappers (`React.lazy()` / `next/dynamic` with `ssr: false`).
   - If a project entry contains a `panoramaUrl` or `model3dUrl` field in the future:
     - The UI renders a lightweight badge: *"View 360° Stage Tour"*.
     - The viewer code and heavy WebGL canvas are downloaded ONLY if the user explicitly clicks the badge.
   - If no 3D/360 asset exists (the current state for all items), the UI cleanly displays the high-resolution photo gallery with zero performance penalty.

---

## 4. Current Action Items & Data Requirements

- `[CONFIRMED CURRENT STATE]` V1 launches exclusively with verified real stage photographs.
- `[FUTURE ENHANCEMENT]` If P.T. Selvam captures 360° photos at future events or commissions 3D CAD stage renders, they will be ingested into the modular viewer slot.
