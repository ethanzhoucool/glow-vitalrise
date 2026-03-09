# glow. — VitalRise Case Competition Entry

> **A cinematic, Apple-inspired product landing page** built for the VitalRise case competition — designing and developing a premium DTC brand experience for a next-generation protein shake.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=flat-square)

---

## About the Competition

This project was created as a submission for the **VitalRise Case Competition**, where teams were tasked with building a go-to-market digital presence for **glow.** — a clean-label, collagen-infused protein shake targeting modern wellness consumers.

The brief called for a brand identity and web experience that could:

- Differentiate from traditional, gym-centric protein brands
- Appeal to health-conscious consumers who value aesthetics and transparency
- Communicate product benefits without feeling clinical or dense
- Feel premium enough to justify a DTC price point

## Approach

Rather than a standard marketing page, I designed and developed a **scroll-driven storytelling experience** inspired by Apple product pages — using cinematic animation, typographic rhythm, and minimal visual density to let the product speak for itself.

### Key design decisions:

- **Scroll-pinned bottle reveal** — the hero bottle stays fixed while nutrition facts animate in, creating a single immersive moment instead of separate sections
- **Mixed typography system** — Playfair Display (serif elegance), Space Grotesk (geometric boldness), and Inter (clean body) create visual rhythm and hierarchy without relying on heavy imagery
- **Interstitial breathers** — single-line typographic moments between sections give the eye rest and build narrative pacing
- **Alternating layouts** — ingredients alternate left/right, benefits use oversized single words, comparison uses a bold grid — no two sections feel the same
- **Soft, warm palette** — off-white backgrounds with baby-blue glows and blush accents position the brand in wellness, not fitness

## Tech Stack

| Tool | Purpose |
|---|---|
| **Next.js 16** (App Router) | Framework, static generation, TypeScript |
| **React 19** | UI components with client-side rendering |
| **Tailwind CSS v4** | Utility-first styling |
| **GSAP + ScrollTrigger** | Scroll-pinned animations, parallax, scrub timelines |
| **Framer Motion** | Hover/tap micro-interactions |

## Sections

The page is composed of 17 scroll sections, each with distinct animation and typography:

| # | Section | Description |
|---|---|---|
| 1 | **Hero** | Full-viewport with floating bottle, parallax background, and nav |
| 2 | **Statement** | Bold grotesk "Protein for strength" / italic Playfair "Collagen for glow" |
| 3 | **Bottle + Nutrition** | GSAP-pinned bottle shrinks left while 4 nutrition stats animate in |
| 4 | *Interstitial* | "What's inside matters." |
| 5 | **Ingredients** | Numbered 01–04, alternating left/right with ghost background numbers |
| 6 | **Benefits** | Oversized italic single words (Glow, Energy, Ease) with offset layout |
| 7 | *Interstitial* | "Taste it to believe it." |
| 8 | **Flavors** | Three flavor cards with emoji accents and grotesk labels |
| 9 | **Texture** | Giant "Smooth. Not chalky." with staggered word reveals |
| 10 | **Convenience** | Three-column card grid with emoji icons and grotesk bold labels |
| 11 | *Interstitial* | "Don't just take our word for it." |
| 12 | **Social Proof** | Testimonials with decorative quotation marks and grotesk author names |
| 13 | **Comparison** | glow. vs typical protein — SVG check/cross icons, slide-in rows |
| 14 | *Interstitial* | "Make it yours." |
| 15 | **Routine** | Three-step daily ritual with oversized ghost step numbers |
| 16 | **Final CTA** | Closing bottle hero with ambient glow particles and dual buttons |
| 17 | **Footer** | Minimal brand footer |

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Google Fonts imports, CSS variables, base styles
│   ├── layout.tsx           # Root layout — Playfair Display, Inter, Space Grotesk
│   └── page.tsx             # Main page composing all 17 sections
├── components/
│   ├── HeroSection.tsx      # Parallax hero with floating bottle
│   ├── StatementSection.tsx # Dual-font brand statement
│   ├── BottleNutritionSection.tsx  # GSAP-pinned bottle + nutrition reveal
│   ├── Interstitial.tsx     # Reusable typographic breaker (4 variants)
│   ├── IngredientsSection.tsx     # Numbered, alternating ingredient cards
│   ├── BenefitsSection.tsx  # Oversized italic benefit words
│   ├── FlavorSection.tsx    # Flavor selection cards
│   ├── TextureSection.tsx   # Giant staggered word animation
│   ├── ConvenienceSection.tsx     # Feature cards with emoji icons
│   ├── SocialProof.tsx      # Testimonial grid with decorative quotes
│   ├── ComparisonSection.tsx      # Comparison table with SVG icons
│   ├── RoutineSection.tsx   # Three-step routine with ghost numbers
│   ├── FinalCTA.tsx         # Closing CTA with ambient particles
│   ├── GlowParticles.tsx    # Reusable floating particle system
│   └── Footer.tsx           # Brand footer
public/
├── bottle.png               # Product bottle image
└── logo.png                 # glow. wordmark
```

## Design System

| Element | Value |
|---|---|
| **Primary background** | `#fafaf8` (warm off-white) |
| **Accent glow** | `rgba(185, 215, 248)` (baby blue) |
| **Text** | `#222` (charcoal) / `#999` (muted) |
| **Serif** | Playfair Display — headlines, statements, quotes |
| **Geometric** | Space Grotesk — bold numbers, labels, contrast moments |
| **Sans** | Inter — body copy, navigation, buttons |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server (Turbopack)
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Technical Highlights

- **Single GSAP pin for bottle + nutrition** — uses `position: fixed` internally, immune to ancestor `overflow-x: hidden` that breaks CSS `position: sticky`
- **`gsap.context()` scoped cleanup** in every component — prevents ScrollTrigger memory leaks on HMR and navigation
- **Dynamic imports with `ssr: false`** — all animation-heavy components are client-only to avoid hydration mismatches
- **Responsive typography** — all font sizes use `clamp()` for fluid scaling across breakpoints
- **Zero external UI libraries** — all components are hand-built with Tailwind utilities and inline styles

---

Built by **Ethan Zhou** · 2025
