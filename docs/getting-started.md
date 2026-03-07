# Getting Started

## Prerequisites

- Node.js 18+
- React 18 or 19
- Tailwind CSS 4

## Install

Since this repository is custom-built and hosted on GitHub, install it directly from the URL:

```bash
npm install github:amberbockel/ui
```

## Setup

### 1. Import Styles

Add the global stylesheet to your React app entry point:

```tsx
import 'amberbockel/ui/styles'
```

This provides:
- Font faces (Prata, DM Sans)
- CSS custom properties for theming
- Glass utility classes
- Animation keyframes
- Reduced motion and high contrast support

### 2. Configure Tailwind CSS 4

Add the `@source` directive so Tailwind scans the library's class names:

```css
@import 'tailwindcss';
@import 'amberbockel/ui/styles';

/* Required: scan amberbockel/ui for Tailwind classes */
@source "../node_modules/amberbockel/ui/dist";
```

Without this directive, component styles that use Tailwind classes won't be included in your CSS output.

### 3. Use components

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from 'amberbockel/ui'
import 'amberbockel/ui/styles'

export default function App() {
  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Hello</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Optional: GSAP animations

Some hooks (`useScrollReveal`, `useCountUp`, `useStaggerList`, `usePageTransition`, `useTextReveal`, `useButtonPulse`) and the `AnimatedText` component require GSAP as a peer dependency:

```bash
npm install gsap
```

GSAP is optional. All other components and hooks work without it.

## Fonts

The stylesheet automatically imports the required typography from Google Fonts:

- `Prata` (display/headings)
- `DM Sans` (body/UI and code)

You no longer need to manually copy any `.woff2` files.

## Quick example: full page

To re-create Amber's signature look, apply the dark background classes and insert the mesh gradient background utility classes immediately inside your root container:

```tsx
import { Nav, Hero, Section, SectionHeader, Footer, useTheme } from 'amberbockel/ui'
import 'amberbockel/ui/styles'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen relative bg-[var(--color-bg)] text-[var(--color-white)]">
      {/* ⚠️ Crucial for the Amber Bockel aesthetic: */}
      <div className="mesh-gradient"></div>
      <div className="sketch-top-gradient"></div>

      <Nav
        logo="My App"
        items={[
          { label: 'Features', href: '#features' },
          { label: 'GitHub', href: 'https://github.com/amberbockel/ui', external: true },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
        fixed
        hideOnScroll
      />

      <Hero
        title="Build fast"
        description="A flat, minimal design system."
        ctas={[{ label: 'Get Started', href: '#features' }]}
      />

      <Section id="features">
        <SectionHeader title="Features" description="Everything you need." />
      </Section>

      <Footer
        copyright="© 2026 Amber Heinbockel"
        sites={[{ name: 'amberbockel/ui', href: 'https://github.com/amberbockel/ui' }]}
      />
    </div>
  )
}
```

## Container alignment

All sections use consistent container constraints. Match these across your layout:

```tsx
<div className="mx-auto max-w-6xl px-6 md:px-12">
  {/* Your content */}
</div>
```

The `Nav`, `Footer`, and `Section` components handle this internally.
