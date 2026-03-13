# amberbockel-ui - Claude Code Instructions

## Overview

Flat, minimal design system for amberbockel projects. Built on Tailwind CSS 4 with iOS-inspired aesthetics.

## Installation

```bash
npm install amberbockel-ui
```

```tsx
import 'amberbockel-ui/styles'
```

## Key Components

### Nav

Fixed navigation bar with hide-on-scroll behavior.

```tsx
import { Nav } from 'amberbockel-ui'

<Nav
  logo="amberbockel"
  logoHref="/"
  items={[
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'GitHub', href: 'https://github.com/amberbockel', external: true },
  ]}
  fixed           // Position fixed at top
  hideOnScroll    // Hide on scroll down, show on scroll up
  showThemeToggle // Show theme toggle (requires onThemeToggle)
  theme="dark"
  onThemeToggle={() => {}}
/>
```

**Props:**
- `logo` - ReactNode for the logo
- `logoHref` - Link for logo click (default: "/")
- `items` - Array of `{ label, href, isActive?, external? }`
- `fixed` - Fixed position at top
- `hideOnScroll` - Smooth scroll-based visibility
- `theme` - "dark" | "light"
- `onThemeToggle` - Theme toggle callback
- `showThemeToggle` - Show/hide theme toggle (default: true)

**Alignment:** Nav content uses `max-w-6xl mx-auto px-6 md:px-12` on the inner container. Ensure your page sections use the same padding pattern for alignment.

### Tailwind v4 Integration

When using amberbockel-ui components, add the `@source` directive to scan component classes:

```css
@import 'tailwindcss';
@import 'amberbockel-ui/styles';

/* Required: scan amberbockel-ui for Tailwind classes */
@source "../node_modules/amberbockel-ui/dist";
```

### CSS Custom Properties

Components use CSS variables for theming. Define these in your `:root`:

```css
:root {
  --color-bg: #000000;
  --color-white: #ffffff;
  --color-grey-400: #86868b;
  --color-accent: #ffffff;
}
```

The `amberbockel-ui/styles` import provides default values.

## Component Patterns

### Container Alignment

All sections should use consistent container styling:

```tsx
// Page section - padding on inner container to match Nav/Footer
<div className="mx-auto max-w-6xl px-6 md:px-12">
  {/* Content */}
</div>

// Nav handles this internally
<Nav fixed hideOnScroll ... />
```

### Theme Toggle

```tsx
import { Nav, useTheme } from 'amberbockel-ui'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Nav
      theme={theme}
      onThemeToggle={toggleTheme}
      // ...other props
    />
  )
}
```

## File Structure

```
src/
├── atoms/          # Button, Badge, Input, Icon, etc.
├── molecules/      # Card, NavLink, ThemeToggle, MobileDrawer
├── organisms/      # Nav, Hero, Section, Footer
├── hooks/          # useTheme, useMediaQuery, useReducedMotion
├── tokens/         # Design tokens (colors, typography, spacing)
└── styles.css      # Global styles and CSS custom properties
```

## Common Issues

### Nav items not visible
Add `@source` directive to scan amberbockel-ui classes (see Tailwind v4 Integration above).

### Colors showing as black
Ensure `:root` CSS custom properties are defined, or import `amberbockel-ui/styles`.

### Misaligned content
Use matching container constraints: `max-w-6xl mx-auto px-6 md:px-12`

## Deployment

### npm Publishing (GitHub Actions)

Publishing is automated via GitHub Actions. Do NOT use `npm publish` locally.

1. Bump version: `npm version patch` (or minor/major)
2. Push: `git push && git push --tags`
3. Create release: `gh release create v$(node -p "require('./package.json').version") --generate-notes`
4. The `.github/workflows/publish.yml` triggers on release creation and publishes `amberbockel-ui` to npm AND deploys the demo to GitHub Pages

Shortcut: `npm run release:patch` does all steps at once.

### Demo Site (GitHub Pages)

The demo site at https://amberbockel.github.io/ui/ deploys automatically via GitHub Actions on every release.

- **Repo:** `amberbockel/ui`
- **Build:** `npm run demo:build` (Vite, base path `/ui/`)
- **Auto-deploy:** Every GitHub Release triggers a new deployment via `publish.yml`
- **Branch:** Pages are served from the `gh-pages` branch

> **One-time setup required:** Add `NPM_TOKEN` secret in GitHub repo Settings → Secrets → Actions, and enable GitHub Pages from the `gh-pages` branch in repo Settings → Pages.

## Version History

- **v0.1.0** - Initial amberbockel-ui release (forked from n3wth/ui)
