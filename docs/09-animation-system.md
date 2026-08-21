# 09. Animation & Motion System — Thangam Decorators

## 1. Motion Philosophy

The motion system for **Thangam Decorators** communicates **elegance, deliberate craftsmanship, and theatrical wonder**. 

Unlike rapid tech SaaS animations, event scenography animations should feel like the opening of a velvet stage curtain or the unveiling of a royal mandapam:
- **Smooth & Weighted:** Graceful easing with gentle deceleration.
- **Performant & Lightweight:** Hardware-accelerated CSS/Framer Motion transforms without frame drops on mid-range Android & iOS devices.
- **Accessibility-Compliant:** Strict adherence to `prefers-reduced-motion: reduce`.

---

## 2. Timing, Easing & Choreography Tokens

```css
:root {
  /* Easing Curves */
  --ease-royal:      cubic-bezier(0.16, 1, 0.3, 1);    /* Smooth luxury entry */
  --ease-cinematic:  cubic-bezier(0.25, 1, 0.5, 1);    /* Floating stage transitions */
  --ease-sharp-out:  cubic-bezier(0.0, 0.0, 0.2, 1);   /* Fast UI feedback */

  /* Duration Standards */
  --duration-micro:   150ms;  /* Button click, toggle */
  --duration-hover:   280ms;  /* Card hover, color shift */
  --duration-reveal:  600ms;  /* Section fade-up, text reveal */
  --duration-stage:   900ms;  /* Fullscreen image expansion */
}
```

---

## 3. Core Motion Patterns

### 3.1 Hero Stage Unveil & Curtain Reveal
- Background hero image starts at `scale(1.08)` and gently eases to `scale(1.0)` over 1.8 seconds.
- Headline and CTA buttons fade in with a staggered upward slide (`translateY(24px) -> translateY(0px)`).

### 3.2 Portfolio Staggered Grid Reveal
- As the user scrolls into the stage gallery, each card reveals sequentially with a 60ms stagger:
  - `opacity: 0 -> 1`
  - `transform: translateY(30px) -> translateY(0px)`
  - `duration: 500ms`, `ease: var(--ease-royal)`

### 3.3 Golden Shimmer / Ambient Light Hover
- Interactive cards feature a subtle golden highlight sweep on hover (`linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent)`).
- Images smoothly zoom `scale(1.04)` inside their masked overflow containers.

### 3.4 Filter Tab Switching
- Dynamic layout animations when switching between *Traditional*, *Reception*, *Haldi*, and *Temple* tabs using FLIP technique / CSS layout transitions.

---

## 4. Accessibility & Mobile Performance Guardrails

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- **Strict Rules:**
  - Animate only `transform` and `opacity` properties (never animate `width`, `height`, `margin`, or `padding` to avoid layout re-flows).
  - Use `will-change: transform, opacity` sparingly on active scrolling elements.

---

## 5. Known Data vs. Client Information Required

- `[CLIENT INFORMATION REQUIRED]` Are there short 4K/1080p drone or gimbal video clips of live stages available for a video hero background reel?
