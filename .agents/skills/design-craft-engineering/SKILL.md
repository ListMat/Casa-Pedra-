---
name: design-craft-engineering
description: Rules and best practices for high-craft UI, fluid motion curves, micro-interactions, and premium tactile feel.
---

# Design Craft & Engineering

## 1. Motion & Physics
- **Fluid Easing:** Always use intentional, physics-based cubic-bezier curves (e.g., `cubic-bezier(0.22, 1, 0.36, 1)`) rather than generic `linear` or `ease`.
- **Micro-interactions:** Interactive elements (buttons, links, controls) must give clear visual feedback on `:hover`, `:focus-visible`, and `:active`.
- **Directional Transitions:** Icons and indicator arrows (like `↗`) should translate smoothly in their indicated vector on hover.

## 2. Visual Hierarchy & Spacing
- **No Random Gaps:** Maintain consistent rhythm using the defined spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px).
- **Subtle Depth:** Use layered shadows with colored tints matching the background tones rather than harsh black shadows.
- **Glassmorphism & Surfaces:** When using `backdrop-filter: blur()`, always combine with a subtle border and high-contrast text to ensure legibility.
