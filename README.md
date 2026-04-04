# amberbockel-ui

Atomic design system for amberbockel projects. Flat, minimal, delightful.
No shadows, no glows — just clean glassmorphism and precision typography.

**[Live Demo](https://amberbockel.github.io/ui/)** · **[npm](https://www.npmjs.com/package/amberbockel-ui)** · **[GitHub](https://github.com/amberbockel/ui)**

---

## Install

```bash
npm install amberbockel-ui
```

**Peer dependencies** (React is required; gsap is optional for animated components):

```bash
npm install react react-dom
npm install gsap  # optional
```

---

## Setup

### 1. Import styles

In your root CSS file:

```css
@import 'tailwindcss';
@import 'amberbockel-ui/styles';

/* Required: lets Tailwind scan amberbockel-ui component classes */
@source "../node_modules/amberbockel-ui/dist";
```

### 2. Wrap your app with a theme attribute

```tsx
// main.tsx or App.tsx
import { useTheme } from 'amberbockel-ui'

export function App() {
  const { theme, toggleTheme } = useTheme({ defaultTheme: 'light' })

  return (
    <div data-theme={theme}>
      {/* your app */}
    </div>
  )
}
```

### 3. Add the gradient background (optional but recommended)

These CSS utility classes ship with `amberbockel-ui/styles` and produce the signature iridescent gradient hero background:

```tsx
<div data-theme={theme} style={{ minHeight: '100vh' }}>
  <div className="mesh-gradient" />       {/* full-screen ambient orbs */}
  <div className="sketch-top-gradient" /> {/* hero iridescent top wash */}
  {/* rest of your page */}
</div>
```

---

## Quick Start

```tsx
import { Nav, Hero, Section, Card, Badge, Footer, Logo, useTheme } from 'amberbockel-ui'

export function App() {
  const { theme, toggleTheme } = useTheme({ defaultTheme: 'light' })

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <div className="mesh-gradient" />
      <div className="sketch-top-gradient" />

      <Nav
        logo={<Logo />}
        logoHref="/"
        items={[
          { label: 'Work', href: '#work' },
          { label: 'GitHub', href: 'https://github.com/amberbockel', external: true },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
        fixed
        hideOnScroll
      />

      <Section id="hero">
        <Hero
          badge="v0.1.2"
          title="Your headline here."
          description="A short description of what you're building."
          ctas={[
            { label: 'Get Started', href: '#work', variant: 'primary' },
            { label: 'GitHub', href: 'https://github.com/amberbockel', variant: 'secondary' },
          ]}
          size="large"
        />
      </Section>

      <Section id="work">
        <Card>
          <Badge variant="sage">New</Badge>
          <h2>Feature title</h2>
          <p>Feature description.</p>
        </Card>
      </Section>
    </div>
  )
}
```

---

## Components

### Atoms
| Component | Description |
| :--- | :--- |
| `Button` | Primary, secondary, ghost, accent, and outline variants |
| `Badge` | Inline labels — outline, sage, coral, mint, gold variants |
| `Input` | Styled text input with label support |
| `Icon` | Iconoir-based icon set |
| `Logo` | Official amberbockel SVG wordmark — use in Nav and footers |
| `AnimatedText` | Character-by-character entrance animation |
| `NoiseOverlay` | Subtle film grain texture layer |
| `ScrollIndicator` | Animated scroll cue for hero sections |
| `Skeleton` / `CardSkeleton` | Loading placeholders |

### Molecules
| Component | Description |
| :--- | :--- |
| `Card` | Glass-morphism content card |
| `ThemeToggle` | Light/dark toggle button |
| `MobileDrawer` | Slide-in nav drawer for mobile |
| `NavLink` | Animated underline nav link |

### Organisms
| Component | Description |
| :--- | :--- |
| `Nav` | Fixed navigation with hide-on-scroll and theme toggle |
| `Hero` | Full-bleed hero section with badge, title, description, and CTAs |
| `Section` | Consistent vertical spacing wrapper |
| `Footer` | Multi-column footer with logo, nav links, and legal row |

---

## Component Reference

### `Logo`

The official brand wordmark. Fills using `var(--color-white)` so it automatically adapts to light/dark theme.

```tsx
import { Logo } from 'amberbockel-ui'

<Logo />              // default (md)
<Logo size="sm" />    // small
<Logo size="lg" />    // large
```

### `Hero`

```tsx
<Hero
  badge="v0.1.2"                    // optional pill above headline
  title="Your headline."
  description="Supporting copy."
  ctas={[
    { label: 'Primary', href: '#', variant: 'primary' },
    { label: 'Secondary', href: '#', variant: 'secondary' },
  ]}
  align="center"     // "center" | "left"
  size="large"       // "default" | "large"
  gradient={true}    // animated shimmer on headline text
/>
```

### `Nav`

```tsx
<Nav
  logo={<Logo />}
  logoHref="/"
  items={[
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'GitHub', href: 'https://github.com/amberbockel', external: true },
  ]}
  theme={theme}
  onThemeToggle={toggleTheme}
  fixed
  hideOnScroll
/>
```

### `useTheme`

```tsx
const { theme, toggleTheme, setTheme, isDark, isLight } = useTheme({
  defaultTheme: 'light',   // "light" | "dark" — used when no stored preference exists
  storageKey: 'my-theme',  // localStorage key (default: 'amberbockel-theme')
})
```

---

## Design Tokens

All tokens are CSS custom properties, set on `[data-theme]` and automatically switch between light and dark.

| Token | Dark | Light |
| :--- | :--- | :--- |
| `--color-bg` | `#000000` | `#fafafa` |
| `--color-white` | `#ffffff` | `#1d1d1f` |
| `--color-accent` | `#e01a8a` | `#e01a8a` |
| `--color-periwinkle` | `#5b93ff` | `#5b93ff` |
| `--color-pink` | `#ffb8d9` | `#ffb8d9` |
| `--color-lavender` | `#c67fff` | `#c67fff` |
| `--color-green` | `#71d45c` | `#71d45c` |
| `--font-display` | `'Prata', serif` | — |
| `--font-sans` | `'DM Sans', sans-serif` | — |

---

## CSS Utility Classes

These classes are included in `amberbockel-ui/styles`:

| Class | Effect |
| :--- | :--- |
| `.mesh-gradient` | Fixed full-screen ambient colour orbs |
| `.sketch-top-gradient` | Tall iridescent wash at top of page (dark: magenta/indigo; light: lavender/peach) |
| `.glass-card` | Frosted glass card with border |
| `.glass-nav` | Nav background |
| `.glass-pill` | Rounded pill with glass border |
| `.hero-gradient-text` | Animated shimmer applied to headline text |
| `.animate-in` | Fade-up entrance animation |
| `.label` | Uppercase tracking label style |

---

## Hooks

| Hook | Description |
| :--- | :--- |
| `useTheme` | Light/dark mode with localStorage persistence |
| `useMediaQuery` | Responsive breakpoint detection |
| `useReducedMotion` | Respects `prefers-reduced-motion` |
| `useScrollReveal` | Entry animations tied to viewport intersection |

---

## AI-native Integration

This library ships integration files for AI coding tools.

| Tool | File |
| :--- | :--- |
| Cursor | [`.cursorrules`](./.cursorrules) — auto-loaded context |
| v0 / shadcn | [`registry.json`](./registry.json) |
| Google AI Studio | [`google-ai-studio-instructions.json`](./google-ai-studio-instructions.json) |
| Claude / Cowork | [`CLAUDE.md`](./CLAUDE.md) |

---

## Development

```bash
git clone https://github.com/amberbockel/ui
cd ui
npm install

npm run demo       # start demo/docs site at localhost:5173
npm run dev        # build library in watch mode
npm run build      # production build
npm run test       # run tests
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add components and ship a release.

---

## License

MIT © [Amber Bockel](https://amberbockel.com)
