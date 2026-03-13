# amberbockel-ui 🛠️

Atomic design system for amberbockel projects. Flat, minimal, iOS-inspired.
No shadows, no glows—just clean glassmorphism and precision typography.

**[Live Demo](https://amberbockel.github.io/ui/)** / **[npm package](https://www.npmjs.com/package/amberbockel-ui)** / **[Registry](https://github.com/amberbockel/ui/blob/main/registry.json)**

---

## 🤖 AI-Native Integration

This library is optimized for AI-driven development (**v0**, **Cursor**, **Google AI Studio**, **Claude Code**).

- **v0 / Shadcn**: Point v0 to this repo or use the [registry.json](./registry.json).
- **Google AI Studio**: Use the [native system instructions](./google-ai-studio-instructions.json).
- **Cursor**: Automated context via [.cursorrules](./.cursorrules).

---

## 📦 Install

```bash
npm install amberbockel-ui
```

### Quick Start

```tsx
import { Button, Card, Hero, Section } from 'amberbockel-ui'
import 'amberbockel-ui/styles'

export default function App() {
  return (
    <Section>
      <Hero title="Hello World" subtitle="iOS-inspired design system" />
      <Card>
        <Button variant="accent">Click Me</Button>
      </Card>
    </Section>
  )
}
```

---

## 🎨 Design Tokens

Built on **Tailwind CSS 4**.

| Token | Description |
| :--- | :--- |
| **Typography** | `font-display` (Mona Sans), `font-sans` (Geist Sans) |
| **Glass** | `.glass-card`, `.glass-pill`, `.glass-nav` |
| **Colors** | Semantic tokens: `bg`, `bg-secondary`, `sage`, `coral`, `gold`, `mint` |
| **Spacing** | iOS-standard safe areas: `safe-top`, `safe-bottom` |

---

## 🧩 Components

| Category | Components |
| :--- | :--- |
| **Atoms** | `Button`, `Badge`, `Input`, `Icon`, `AnimatedText`, `NoiseOverlay`, `ScrollIndicator` |
| **Molecules** | `Card`, `CommandBox`, `ThemeToggle`, `MobileDrawer`, `NavLink`, `CompositeShape` |
| **Organisms** | `Nav`, `Hero`, `Section`, `Footer` |

---

## 🪝 Hooks

- `useTheme` — Dark/light mode with system persistence.
- `useMediaQuery` — Clean responsive breakpoint handling.
- `useKeyboardShortcuts` — Global keyboard event management.
- `useScrollReveal` — Entry animations for atomic elements.
- `useReducedMotion` — Respects user accessibility preferences.

---

## 🛠️ Development

```bash
# Clone and install
git clone https://github.com/amberbockel/ui
npm install

# Run the showcase/demo
npm run demo

# Build for production
npm run build

# Update AI Registry
npm run registry:build
```

### Releasing

Publishing is automated via GitHub Actions. When you're ready to ship:

```bash
# Bump version, push tag, and create a GitHub Release to trigger CI
npm run release:patch
```

The `publish.yml` workflow will automatically:
1. Build and publish `amberbockel-ui` to npm
2. Build the demo site and deploy it to GitHub Pages at https://amberbockel.github.io/ui/

> **One-time setup:** Add your npm token as `NPM_TOKEN` in GitHub repo Settings → Secrets → Actions.

---

## 📜 License

MIT © [Amber Bockel](https://amberbockel.github.io)
