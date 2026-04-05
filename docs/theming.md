# Theming

amberbockel-ui uses CSS custom properties for theming. Dark mode is the default; light mode is fully supported. Theme switching works via the `data-theme` attribute on your root element.

## Theme toggle

Use the `useTheme` hook to manage dark/light mode:

```tsx
import { useTheme, Nav, Logo } from 'amberbockel-ui'

function App() {
  const { theme, toggleTheme } = useTheme({ defaultTheme: 'light' })

  return (
    <div data-theme={theme}>
      <Nav
        logo={<Logo />}
        theme={theme}
        onThemeToggle={toggleTheme}
        fixed
        hideOnScroll
      />
    </div>
  )
}
```

The hook persists the user's choice in `localStorage` under the key `amberbockel-theme`. Pass `defaultTheme: 'light'` to start in light mode when no stored preference exists.

```tsx
const { theme, setTheme, toggleTheme, isDark, isLight } = useTheme({
  defaultTheme: 'light',   // "light" | "dark"
  storageKey: 'my-theme',  // custom localStorage key
})
```

## Typography

| Variable | Value | Notes |
|---|---|---|
| `--font-display` | `'Prata', serif` | **400 regular only** — no bold variant |
| `--font-sans` | `'DM Sans', sans-serif` | Variable font, supports 300–800 |
| `--font-mono` | `ui-monospace, 'SF Mono', Menlo, Monaco, monospace` | System mono stack |

> **Important:** Prata ships as a single weight (400). Applying `font-weight: 600` or higher causes browsers to synthesize a fake bold, which looks chunky and uneven. Always use `font-weight: 400` for Prata headings.

## Colors

All values are sourced directly from `src/styles.css`.

### Core colors

| Variable | Dark | Light | Notes |
|---|---|---|---|
| `--color-bg` | `#000000` | `#fafafa` | Page background |
| `--color-bg-secondary` | `#0a0a0a` | `#f5f5f7` | Cards, secondary surfaces |
| `--color-white` | `#ffffff` | `#1d1d1f` | Primary text — **inverts in light mode** |
| `--color-accent` | `#e01a8a` | `#e01a8a` | Pink accent — same in both modes |
| `--color-accent-soft` | `rgba(224,26,138,0.15)` | `rgba(224,26,138,0.10)` | Soft accent fills |

### Greys

Grey values **invert** between modes — dark greys in dark mode become light greys in light mode.

| Variable | Dark | Light |
|---|---|---|
| `--color-grey-100` | `#f5f5f7` | `#1d1d1f` |
| `--color-grey-200` | `#e8e8ed` | `#3a3a3c` |
| `--color-grey-300` | `#c7c7cc` | `#48484a` |
| `--color-grey-400` | `#86868b` | `#636366` |
| `--color-grey-600` | `#6e6e73` | `#8e8e93` |
| `--color-grey-800` | `#1d1d1f` | `#e5e5ea` |

### Accent palette

These four colors stay consistent across light and dark modes:

| Variable | Value | Usage |
|---|---|---|
| `--color-periwinkle` | `#5b93ff` | Blue accent — Badge, highlights |
| `--color-pink` | `#ffb8d9` | Soft pink — Badge, decorative |
| `--color-lavender` | `#c67fff` | Purple — Badge, focus rings |
| `--color-green` | `#71d45c` | Green — success, active states |

### Semantic colors

| Variable | Dark | Light | Usage |
|---|---|---|---|
| `--color-success` / `--color-success-bg` | `#71d45c` / `rgba(113,212,92,0.10)` | same / `rgba(113,212,92,0.08)` | Success states |
| `--color-warning` / `--color-warning-bg` | `#ffd60a` / `rgba(255,214,10,0.10)` | `#b25000` / `rgba(178,80,0,0.08)` | Warning states |
| `--color-error` / `--color-error-bg` | `#ff6961` / `rgba(255,105,97,0.10)` | `#d70015` / `rgba(215,0,21,0.08)` | Error states |
| `--color-info` / `--color-info-bg` | `#64d2ff` / `rgba(100,210,255,0.10)` | `#0071e3` / `rgba(0,113,227,0.08)` | Info states |

### Glass effect

| Variable | Dark | Light |
|---|---|---|
| `--glass-bg` | `rgba(255,255,255,0.05)` | `rgba(0,0,0,0.03)` |
| `--glass-border` | `rgba(255,255,255,0.15)` | `rgba(0,0,0,0.08)` |
| `--glass-highlight` | `rgba(255,255,255,0.25)` | `rgba(0,0,0,0.12)` |

## Custom theme

Override variables in your CSS to apply a custom palette:

```css
:root,
[data-theme='dark'] {
  --color-bg: #0f172a;
  --color-white: #e2e8f0;
  --color-accent: #3b82f6;
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.06);
}

[data-theme='light'] {
  --color-bg: #ffffff;
  --color-white: #0f172a;
  --color-accent: #2563eb;
  --glass-bg: rgba(0, 0, 0, 0.02);
  --glass-border: rgba(0, 0, 0, 0.06);
}
```

## Background gradients

The signature gradient backgrounds are CSS utility classes included in `amberbockel-ui/styles`. They are **not applied automatically** — add them as `<div>` elements inside your root container:

```tsx
<div data-theme={theme} style={{ position: 'relative', minHeight: '100vh' }}>
  <div className="mesh-gradient" />       {/* fixed, full-screen ambient orbs */}
  <div className="sketch-top-gradient" /> {/* absolute, 800px iridescent top wash */}
  {/* page content */}
</div>
```

**What they look like:**

| Mode | `mesh-gradient` | `sketch-top-gradient` |
|---|---|---|
| Dark | Blue (left), pink (right), purple (bottom) orbs at 30% opacity | Magenta top-center, indigo left, orange right, blue mid |
| Light | Same orbs at 60% opacity | Soft pink top-center, lavender left, peach right, periwinkle mid |

See [CSS Utilities](/docs/css-utilities) for the full class reference.

## TypeScript tokens

Design tokens are also exported as typed TypeScript constants:

```tsx
import { colors, typography } from 'amberbockel-ui'

colors.accent        // '#e01a8a'
colors.periwinkle    // '#5b93ff'
typography.fontDisplay  // "'Prata', serif"
```
