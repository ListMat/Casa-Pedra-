---
name: web-performance-and-a11y
description: High-performance React/Next.js practices and accessibility rules for production web applications.
---

# Web Performance & Accessibility

## 1. Performance Guidelines
- **Zero Heavy Bundles:** Avoid importing heavy animation or parallax libraries when native browser APIs (`IntersectionObserver`, CSS transforms) suffice.
- **Render Discipline:** Keep state collocated and use lightweight React Context without global re-renders.
- **Instant Assets:** Lazy-load below-the-fold media with explicit dimensions to prevent layout recalculations.

## 2. Accessibility Compliance
- **Skip Navigation:** Provide accessible skip links for keyboard and screen-reader users.
- **Semantic ARIA:** Use `aria-label`, `aria-expanded`, and descriptive accessible roles on interactive elements.
- **Focus Rings:** Ensure `:focus-visible` outlines are distinct with sufficient contrast across dark and light themes.
