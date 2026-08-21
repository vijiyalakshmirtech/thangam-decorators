# 13. Performance Strategy & Environmental Variance — Thangam Decorators

## 1. Performance Target Framework & Disclaimers

### Internal Engineering Targets (Benchmark: Mobile 4G / Mid-Range Device)

These metrics serve as **internal engineering benchmarks and optimization guidelines**, rather than absolute guaranteed numbers:

| Metric | Internal Target | Google "Good" Threshold | Optimization Mechanism |
| :--- | :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | **Target: ≤ 2.2s** | ≤ 2.5s | Preloaded priority hero image (< 100KB WebP) with `fetchpriority="high"`. |
| **Interaction to Next Paint (INP)** | **Target: ≤ 100ms** | ≤ 200ms | Lightweight vanilla/React event listeners with zero synchronous main-thread blocking. |
| **Cumulative Layout Shift (CLS)** | **Target: ≤ 0.05** | ≤ 0.1 | Explicit aspect ratio wrappers (`aspect-[4/3]`, `aspect-video`) on all media containers. |
| **First Contentful Paint (FCP)** | **Target: ≤ 1.2s** | ≤ 1.8s | Static HTML pre-rendered on Edge CDN. |
| **Total Blocking Time (TBT)** | **Target: ≤ 150ms** | ≤ 200ms | Core JS kept under 90KB; non-critical scripts deferred. |

### Environmental Variance Disclaimer:
> [!NOTE]
> Actual real-world performance will naturally vary depending on:
> 1. **Client Device Hardware:** CPU speed, memory availability, and GPU hardware acceleration (e.g. entry-level Android vs flagship iPhone).
> 2. **Network & Cellular Conditions:** Local 4G signal strength, carrier throttling, latency, and packet loss in rural/semi-urban areas of Western Tamil Nadu.
> 3. **Browser Engine:** Mobile Chrome (Blink), Mobile Safari (WebKit), Firefox (Gecko), or embedded in-app webviews (Instagram/WhatsApp browser).
> 4. **Hosting & CDN Conditions:** Edge node proximity, cache hit ratio, and DNS resolution latency.

---

## 2. Resource Budget Specification

```text
┌─────────────────────────────────────────────────────────┐
│              MAXIMUM INITIAL PAGE LOAD BUDGET           │
├─────────────────────────┬───────────────────────────────┤
│ Resource Type           │ Maximum Uncompressed Budget   │
├─────────────────────────┼───────────────────────────────┤
│ HTML Document           │ ≤ 25 KB                       │
│ Critical CSS            │ ≤ 20 KB                       │
│ JavaScript (Core)       │ ≤ 90 KB (gzip: ~30 KB)        │
│ Web Fonts (woff2)       │ ≤ 50 KB (Max 2 webfont files) │
│ Above-the-Fold Image    │ ≤ 100 KB (Single Hero WebP)   │
│ Below-the-Fold Images   │ Lazy-loaded on scroll (0 KB)  │
├─────────────────────────┼───────────────────────────────┤
│ TOTAL INITIAL PAYLOAD   │ ≤ 285 KB (gzip: ~140 KB)      │
└─────────────────────────┴───────────────────────────────┘
```
