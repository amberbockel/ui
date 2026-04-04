# Contributing to amberbockel-ui

Thanks for your interest in contributing. This is a personal design system — contributions are welcome for bug fixes, accessibility improvements, and new components that fit the aesthetic.

---

## Getting started

```bash
git clone https://github.com/amberbockel/ui
cd ui
npm install
npm run demo   # starts the docs/showcase at localhost:5173
```

The `demo/` folder is the interactive docs site. The `src/` folder is the published library.

---

## Project structure

```
src/
├── atoms/          # Smallest units: Button, Badge, Input, Logo, Icon...
├── molecules/      # Composed components: Card, ThemeToggle, NavLink...
├── organisms/      # Page-level sections: Nav, Hero, Section, Footer
├── hooks/          # useTheme, useMediaQuery, useReducedMotion, useScrollReveal
├── tokens/         # Design token exports
├── utils/          # cn() and other helpers
└── styles.css      # Global CSS, design tokens, utility classes

demo/               # Interactive docs site (not published to npm)
test-pkg/           # Consumer test project — installs from npm to verify the package works end-to-end
```

---

## Design principles

- **Flat**: No drop shadows. Depth comes from borders and spacing.
- **Minimal**: Every element earns its place. No decorative noise.
- **Intentional**: Designed for clarity, not novelty.
- **Accessible**: Components should work with keyboard navigation and screen readers.

Typography is **Prata** (display/headings via `font-display`) and **DM Sans** (body/UI via `font-sans`), loaded from Google Fonts via `amberbockel-ui/styles`.

---

## Adding a new component

1. Choose the right level: `atoms/` for standalone primitives, `molecules/` for compositions, `organisms/` for page sections.
2. Create a folder: `src/atoms/MyComponent/`
3. Add the component file: `MyComponent.tsx`
4. Add a barrel: `index.ts` — `export { MyComponent } from './MyComponent'`
5. Export from the package: add to `src/index.ts`
6. Add it to the demo: document it in `demo/sections/AtomsSection.tsx` (or Molecules/Organisms)
7. Update the registry: `npm run registry:build`

**Component checklist:**
- Uses CSS custom properties (`var(--color-bg)`, etc.) — no hardcoded colours
- Accepts `className` and spreads remaining props onto the root element
- Exports a TypeScript interface for its props
- Adapts to both `data-theme="dark"` and `data-theme="light"`

---

## Modifying styles

Global styles and design tokens live in `src/styles.css`. This file is published as `amberbockel-ui/styles`.

- Token values for dark mode: `:root, [data-theme='dark'] { ... }`
- Token values for light mode: `[data-theme='light'] { ... }`
- Utility classes (`.glass-card`, `.mesh-gradient`, etc.) live below the tokens section

---

## Running tests

```bash
npm run test          # run all tests once
npm run test:watch    # watch mode
```

Tests use Vitest + Testing Library. Add a `*.test.tsx` file alongside any new component.

---

## Shipping a release

Publishing is automated via GitHub Actions (`publish.yml`). The workflow triggers on GitHub Release creation and will:
1. Build and publish `amberbockel-ui` to npm
2. Build and deploy the demo site to GitHub Pages

**To ship a release from your terminal:**

```bash
# Patch release (bug fixes)
npm run release:patch

# Minor release (new components, non-breaking)
npm run release:minor

# Major release (breaking changes)
npm run release:major
```

These scripts bump the version, push the tag, and create a GitHub Release — the CI takes it from there.

**One-time setup required:**
- Add `NPM_TOKEN` secret in GitHub repo Settings → Secrets → Actions
- Enable GitHub Pages from the `gh-pages` branch in repo Settings → Pages

---

## For AI assistants

If you are an AI coding assistant working in this repo:

- Read `.cursorrules` for design constraints and component conventions
- Import from `../src/...` (not the npm package) when working inside the `demo/` or `src/` folders
- The `test-pkg/` folder installs from the published npm package — use it to verify consumer-facing behaviour
- Run `npm run registry:build` after adding or modifying components
- Do not add `iOS` references, drop shadows, or heavy gradients to components
