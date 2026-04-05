# Integrating Amber Bockel UI with AI

Because building with beautiful design systems should be easy, we've provided pre-optimized instructions you can copy and paste into your favorite AI coding assistants (like **Cursor**, **v0.dev**, **Claude Sonnet**, or **ChatGPT**).

These system prompts instruct the AI to generate code that perfectly matches Amber's modern, glassmorphic aesthetic.

---

## 🤖 Global System Instructions

If you are using **Cursor**, copy the text below and paste it into your `.cursorrules` file at the root of your project. 
If you are using **Claude** or **ChatGPT**, paste this as your first Custom Instruction or System Prompt.

```markdown
You are an expert UI engineer building with the Amber Bockel atomic design system. 

When generating React/Tailwind code, you MUST adhere to the following strict aesthetic guidelines:

CORE PRINCIPLES:
- Minimalism: Use ample whitespace. Avoid strong, solid borders or flat backgrounds.
- High-End Glassmorphism: Utilize `bg-[var(--glass-bg)]` and `backdrop-blur-lg` to create depth.
- Brand Colors: 
  - Primary Action (Success Green): `#71d45c` (must always have white text)
  - Accent/Interactive (Periwinkle): `#5b93ff`
- Typography: 
  - ALWAYS use `font-display` (Google Font: Prata) for Headings (h1, h2, h3).
  - ALWAYS use `font-sans` (Google Font: DM Sans) for Body text and UI elements.
  - Heading sizes should be slightly reduced, keeping styling refined.

TECHNICAL REQUIREMENTS:
- Imports: Import components exclusively from `amberbockel-ui` (e.g., `import { Button, Hero } from 'amberbockel-ui'`).
- Setup: Ensure `import 'amberbockel-ui/styles'` is present in `App.tsx` or `main.tsx`.
- Dark Mode by Default: The design system is optimized for sleek, dark neon aesthetics.

COMPONENT USAGE:
- Buttons: Use `variant="primary"` for the #71d45c brand green, and `variant="secondary"` or `"glass"` for the original transparent glassmorphism look.
- Structure: Always wrap primary page content in the `<Section>` organism component to ensure consistent vertical padding.
```

---

## ⚡ v0.dev Integration

If you use [v0 by Vercel](https://v0.dev) to generate React components, you can add this repository as a custom preset so it knows exactly which components are available.

1. Go to your v0 dashboard settings or project config.
2. Add the following repository URL to your Registry settings:
   `https://github.com/amberbockel/ui/blob/main/registry.json`

When you prompt v0, you can now say:  
*"Create a pricing page using the amberbockel-ui design system"*

---

## 📝 Manual Usage Example

If you aren't using an AI, constructing an elegant layout is still just playing with Lego blocks. Here is the perfect boilerplate to start any page:

```tsx
import { Nav, Hero, Section, Footer } from 'amberbockel-ui'
import 'amberbockel-ui/styles'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-white)] relative">
      <div className="mesh-gradient"></div>
      <div className="sketch-top-gradient"></div>
      
      <Nav logo="My Brand" items={[{ label: 'Home', href: '/' }]} fixed />

      <Hero
        badge="New Release"
        title={<span className="font-display font-light">Elegance, Standardized.</span>}
        description="A flat, minimal design system by Amber Bockel."
        ctas={[{ label: 'Get Started', href: '#features', variant: 'primary' }]}
      />

      <Section id="features">
        <p className="font-sans text-xl">The rest of your beautiful app goes here.</p>
      </Section>
      
      <Footer copyright="© 2026 Your Brand Here" />
    </div>
  )
}
```
