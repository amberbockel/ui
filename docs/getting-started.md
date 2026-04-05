# Getting Started

## Prerequisites

- Node.js 18+
- React 18 or 19
- Tailwind CSS 4

## Install

```bash
npm install amberbockel-ui
```

**Peer dependencies** — React is required; GSAP is optional:

```bash
npm install react react-dom
npm install gsap  # optional, needed for AnimatedText and scroll animations
```

## Setup

### 1. Import styles

In your root CSS file:

```css
@import 'tailwindcss';
@import 'amberbockel-ui/styles';

/* Required: lets Tailwind scan component class names */
@source "../node_modules/amberbockel-ui/dist";
```

This provides:
- Font imports (Prata + DM Sans from Google Fonts)
- CSS custom properties for dark and light theming
- Glass utility classes (`.glass-card`, `.glass-pill`, `.glass-nav`)
- Background gradient classes (`.mesh-gradient`, `.sketch-top-gradient`)
- Animation keyframes and reduced-motion support

### 2. Wrap your app

```tsx
// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

// Default to light mode on first visit
if (!localStorage.getItem('amberbockel-theme')) {
  localStorage.setItem('amberbockel-theme', 'light')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
)
```

### 3. Use components

```tsx
import { Button, Card, Hero, Section, Logo, useTheme } from 'amberbockel-ui'

export function App() {
  const { theme, toggleTheme } = useTheme({ defaultTheme: 'light' })

  return (
    <div data-theme={theme}>
      <Card>
        <Hero title="Hello" description="Flat, minimal design system." />
        <Button variant="primary">Get started</Button>
      </Card>
    </div>
  )
}
```

## The signature look

To reproduce the amberbockel aesthetic — iridescent gradient hero, glass cards, Prata headlines — apply these three things to your root wrapper:

```tsx
import { Nav, Hero, Section, Footer, Logo, useTheme } from 'amberbockel-ui'

function App() {
  const { theme, toggleTheme } = useTheme({ defaultTheme: 'light' })

  return (
    <div
      data-theme={theme}
      style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-white)', position: 'relative' }}
    >
      {/* 1. Full-screen ambient colour orbs (fixed, behind everything) */}
      <div className="mesh-gradient" />

      {/* 2. Iridescent top-of-page wash (light: lavender/peach; dark: magenta/indigo) */}
      <div className="sketch-top-gradient" />

      {/* 3. Nav with the exported Logo wordmark */}
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
          description="Supporting copy goes here."
          ctas={[
            { label: 'Get Started', href: '#work', variant: 'primary' },
            { label: 'GitHub', href: 'https://github.com/amberbockel', variant: 'secondary' },
          ]}
          size="large"
        />
      </Section>

      <Footer
        logo={<Logo size="sm" />}
        copyright="© 2026 Your Name"
        sections={[
          { title: 'Links', links: [{ label: 'GitHub', href: 'https://github.com/amberbockel' }] },
        ]}
      />
    </div>
  )
}
```

## Typography notes

**Prata** is the display font (`font-display`). It ships as a **single weight — 400 regular only**. There is no bold or semibold variant. Applying `font-weight: 600+` causes the browser to synthesize a fake bold, which produces chunky, uneven strokes. Keep all Prata headings at weight 400.

**DM Sans** (`font-sans`) is the variable body font and handles all weights (300–800) cleanly.

```css
/* ✓ correct */
h1 { font-family: var(--font-display); font-weight: 400; }

/* ✗ avoid — synthesized bold looks wrong with Prata */
h1 { font-family: var(--font-display); font-weight: 600; }
```

## Container alignment

All sections use consistent container constraints. Match these across your layout to stay aligned with Nav and Footer:

```tsx
<div className="mx-auto max-w-6xl px-6 md:px-12">
  {/* Your content */}
</div>
```

The `Nav`, `Footer`, and `Section` components handle this internally.

## TypeScript

The library ships full TypeScript types. No `@types` package needed.

```tsx
import type { LogoProps, HeroProps, NavItem } from 'amberbockel-ui'
```
