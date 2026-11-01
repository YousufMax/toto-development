# Mobbin-Grade UI/UX & Design Standards (TOTO Development)

This project strictly enforces world-class UI/UX design patterns inspired by [Mobbin](https://mobbin.com/) (benchmarked against top SaaS products: Stripe, Linear, Vercel, Airbnb, Ramp, and Wise).

---

## 1. Zero-Bleed Surface & Layering Architecture
- **100% Opaque Overlays:** All dropdown menus, floating cards, mobile sheets, popovers, and modals MUST use solid, 100% opaque obsidian dark surfaces (`#070b09` or `#060a08`).
- **Never Rely on Pure Translucent Glass for Critical Text:** Never use high-transparency glass (`opacity < 95%`) over large high-contrast text or hero headlines. Background text must NEVER bleed through an open menu or modal.
- **Elevation & Depth:** Use deep, natural ambient drop shadows (e.g. `shadow-[0_25px_70px_rgba(0,0,0,1)]`) and crisp 1px borders (`border-white/10` to `border-white/15`) to achieve true spatial separation.

---

## 2. Typography & Contrast (WCAG AAA Compliance)
- **Primary Labels & Headings:** Pure White (`#FFFFFF`) with tight tracking (`tracking-tight`) and bold weights for immediate legibility.
- **Secondary & Meta Text:** High-contrast muted slates (`#94A3B8` / `#A3A3A3`). Avoid muddy grays or faint opacity.
- **Readability Benchmark:** Menu items must be at least 13px–14px with descriptive 11px micro-copy. Body text should be comfortable (14px–16px) with generous line-height (`leading-relaxed`).

---

## 3. Brand Color Harmony (TOTO Electric Volt & Obsidian)
- **Primary Surface:** Deep Obsidian Dark (`#050705`, `#070b09`).
- **Brand Accent:** `#00FC43` (Electric Volt Lime).
- **The 60-30-10 Palette Rule:**
  - **60% Dominant Base:** Obsidian and deep slate surfaces.
  - **30% Structure & Contrast:** Pure white typography, crisp borders, neutral glass cards.
  - **10% Accent Punch:** `#00FC43` reserved for primary CTAs, active highlights, key metrics, and focus rings.

---

## 4. Mobbin-Style Micro-Interactions & UX Polish
- **Interactive Feedback:** All clickable components must have clear hover and active states (e.g., `hover:scale-[1.02] active:scale-[0.98] transition-all duration-150`).
- **Icon Containers:** Icons must have dedicated visual grounding (e.g., rounded-xl boxes with subtle borders and brand tint on hover).
- **Directional Hints:** Use subtle chevron/arrow reveals on hover (`translate-x-0.5`) to signal navigability without visual clutter.

---

## 5. Mobile-First Ergonomics
- **Touch Target Minimum:** All interactive buttons and links must meet the 44×44px touch target standard.
- **Thumb Zone Navigation:** Sticky or floating mobile triggers (e.g. WhatsApp CTA, Hamburger toggle) must be easily reachable with one hand.
- **Drawer Locking:** Opening mobile drawers or modals must lock body scrolling to prevent background scroll jumping.

---

## 6. Real-World Authenticity (No AI Gimmicks)
- Strictly avoid generic AI clichés: No cheesy "AI-Powered 10x Turbo" badges, unnecessary pulsating neon circles, or robotic jargon.
- All copy, stats, and workflows must read like a battle-tested, high-end digital engineering agency.
- Company address is strictly: `256 Upper Road, Mou Market 3rd Floor, Sonadanga, Khulna - 9000`.
