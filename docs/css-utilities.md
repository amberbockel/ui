# CSS Utilities

These classes are available globally when you import `amberbockel-ui/styles`.

## Backgrounds

The signature gradient backgrounds. Add these as `<div>` elements inside your root container — they are **not applied automatically**.

| Class | Position | Description |
|---|---|---|
| `.mesh-gradient` | `fixed`, full-screen, `z-index: -1` | Three radial colour orbs: blue at 15% left, pink at 85% right, purple at 50% bottom. 30% opacity in dark mode, 60% in light. |
| `.sketch-top-gradient` | `absolute`, top of page, 800px tall | Iridescent hero wash. **Dark mode:** magenta top-center, indigo left, warm orange right, blue mid. **Light mode:** soft pink top-center, lavender left, peach right, periwinkle mid. Fades to transparent at the bottom. |

```tsx
<div data-theme={theme} style={{ position: 'relative', minHeight: '100vh' }}>
  <div className="mesh-gradient" />
  <div className="sketch-top-gradient" />
  {/* page content above the gradients */}
</div>
```

> Both classes are `pointer-events: none` so they never block interaction.

## Glass effects

| Class | Description |
|---|---|
| `.glass-card` | Frosted card: `rgba(255,255,255,0.05)` bg, `rgba(255,255,255,0.15)` border, `32px` radius, `blur(20px)` backdrop |
| `.glass-pill` | Rounded pill with glass bg, backdrop blur, scale transform on hover/active |
| `.glass-nav` | Navigation bar background — matches `--color-bg` |
| `.command-box` | Glass input/command area with hover brightening |

## Typography

| Class | Description |
|---|---|
| `.label` | `11px`, uppercase, `letter-spacing: 0.08em`, `--color-grey-400` |
| `.index-num` | `10px`, tabular figures, `--color-grey-600` |
| `.text-glow` | Text shadow for readability over gradient backgrounds (dark mode) |
| `.text-glow-subtle` | Lighter version of `.text-glow` |
| `.hero-gradient-text` | Animated shimmer gradient applied as text fill — used by Hero component |

## Focus and interaction

| Class | Description |
|---|---|
| `.link-hover` | Animated underline: expands from 0 to 100% width on hover with a subtle glow |
| `.copy-btn` | Copy button with a copied-state style |
| `.skill-card` | Card with hover border brightening |

## Animation

| Class | Description |
|---|---|
| `.animate-in` | Fade-up entrance, 0.6s ease |
| `.card-enter` | Card entrance with scale, 0.4s |
| `.skeleton-shimmer` | Loading shimmer pulse |

All animations are disabled when `prefers-reduced-motion: reduce` is active.

## Layout

| Class | Description |
|---|---|
| `.scrollbar-hidden` | Hides scrollbar cross-browser |
| `.sr-only` | Visually hidden but accessible to screen readers |
| `.line-clamp-1` / `.line-clamp-2` / `.line-clamp-3` | Text truncation to N lines |

## Accessibility

- Animations are disabled under `prefers-reduced-motion: reduce`
- Glass borders thicken and focus outlines widen under `prefers-contrast: high`
- Form fields enforce `font-size: 16px` at mobile widths to prevent iOS zoom
