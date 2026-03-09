# glow. Landing Page — Copilot Instructions

- This is a Next.js 16 project with App Router, TypeScript, and Tailwind CSS v4
- Uses GSAP ScrollTrigger for scroll animations and Framer Motion for interactions
- All section components are in `src/components/`
- The main page assembly is in `src/app/page.tsx`
- Components use `"use client"` directive and dynamic imports with `ssr: false`
- Color palette: off-white (#fafaf8), baby-blue glow (rgba(185,215,248)), charcoal (#222)
- Typography: Playfair Display (serif via `var(--font-playfair)`), Inter (body via `var(--font-inter)`), Space Grotesk (geometric via `var(--font-grotesk)`)
- Product assets: `public/bottle.png`, `public/logo.png`
- Keep the premium, minimal wellness aesthetic in all new components
- All GSAP effects must use `gsap.context()` scoped cleanup
- BottleNutritionSection uses a single ScrollTrigger pin (position: fixed) — do not use CSS position: sticky under the main overflow-x-hidden container
