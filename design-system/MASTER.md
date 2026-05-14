# eDuna demo — design system (source of truth)

Hungarian **consumer electronics e‑commerce UI demo** (TanStack Start + React + Tailwind v4 + shadcn-style primitives). Trust-first, **not** a production storefront.

Aligned with [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) pre-delivery expectations: affordance, motion, contrast, focus, reduced motion, breakpoints.

## Product & tone

- **IA**: Mirrors eduna.hu-style sections (top bar, nav, trust, brands, rails, catalog, news, footer + newsletter consent).
- **Copy**: Hungarian; legal links may point at production URLs; toasts mark demo behavior.
- **Visual personality**: Clean retail tech — readable type, restrained decoration. Avoid “AI slop” neon gradients and gimmicky motion.

## Tokens (see `src/styles.css`)

| Token / area                              | Role                                                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `:root` / `.dark`                         | Semantic colors (`--background`, `--foreground`, `--primary`, `--muted`, `--muted-foreground`, `--border`, `--ring`, …). |
| `--gradient-hero`, `.bg-hero`             | Hero backdrop — keep saturation low for trust.                                                                           |
| `.glass`, `.liquid-panel`                 | Header / sheets — keep borders visible in light and dark.                                                                |
| `.transition-interactive`                 | Default interactive transitions (~200ms); respects `prefers-reduced-motion`.                                             |
| `--font-display` (Outfit), body (DM Sans) | Headings vs UI copy.                                                                                                     |

**Page-specific overrides**: if needed later, add `design-system/pages/<page>.md` and prefer those rules for that page only.

## Non-negotiables (checklist)

1. **Icons**: Lucide (or SVG) only — no emoji as icons.
2. **Clickable affordance**: `cursor-pointer` on interactive controls; `not-allowed` when disabled (see global base styles in `styles.css`).
3. **Hover / focus**: Smooth state changes (about 150–300ms); visible **`focus-visible`** ring (`ring` + `ring-offset`) on custom `<button>` / controls not covered by `Button`.
4. **Contrast**: Aim for **≥ 4.5:1** for body-sized text on default surfaces in **light** mode (`text-muted-foreground` on `bg-card` / `bg-muted` must remain readable). Dark mode: strong but not harsh pairs.
5. **Motion**: Honor `prefers-reduced-motion` (global rules already shorten transitions and disable decorative keyframes).
6. **Responsive**: Sanity-check **375px**, **768px**, **1024px**, **1440px** for header, rails, catalog grid, footer form.

## Anti-patterns (this project)

- Heavy magenta/cyan “neon” marketing gradients on large surfaces.
- Long, bouncy scale hovers on product tiles.
- Fast infinite marquees without reduced-motion guard (animation is disabled when reduced motion is requested).

## Verification (spot-check)

- **Light (2026 baseline)**: `--muted-foreground` in `:root` set to `oklch(0.4 0.022 265)` to improve small text on `bg-card` / `bg-muted/20` (trust strip, product meta). Re-check if tokens change.
- **Dark**: Hero radial accents reduced (`--gradient-hero` in `.dark`) for calmer retail feel; primary links still distinguishable.
- **Keyboard**: Tab header category triggers + dropdown items, mobile sheet links, catalog chips, category tiles, footer quicklinks + newsletter field + checkbox.
- **Motion**: Hero grid overlay ~22% opacity; brand marquee 48s; product image hover scale 1.02; `float-glow` / `pulse-ring` keyframes softened / slowed where defined.
- Optional upstream skill: `npm i -g uipro-cli` then `uipro init --ai cursor` for full UI UX Pro Max skill + `search.py` workflows.
