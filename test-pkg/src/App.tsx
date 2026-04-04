import {
  Nav,
  Hero,
  Section,
  Footer,
  Button,
  Badge,
  Card,
  useTheme,
} from 'amberbockel-ui'

// ─── Work items ──────────────────────────────────────────────────────────────
const work = [
  {
    tag: 'Design System',
    title: 'amberbockel-ui',
    description:
      'Flat, minimal React component library. Built on Tailwind CSS v4 with atomic architecture — atoms, molecules, organisms.',
    href: 'https://amberbockel.github.io/ui/',
    accent: 'sage' as const,
  },
  {
    tag: 'AI Product',
    title: 'Intelligent Interfaces',
    description:
      'Designing the space where intelligent systems meet human judgment. Exploring how AI tools should feel, not just function.',
    href: '#',
    accent: 'coral' as const,
  },
  {
    tag: 'Open Source',
    title: 'Component Primitives',
    description:
      'Reusable UI primitives for teams building AI-native products. Hooks, design tokens, and accessible patterns out of the box.',
    href: 'https://github.com/amberbockel/ui',
    accent: 'mint' as const,
  },
]

// ─── Principles ──────────────────────────────────────────────────────────────
const principles = [
  { label: 'Flat',        desc: 'No shadows. No gradients. Depth through spacing and contrast.' },
  { label: 'Minimal',     desc: 'Every element earns its place. Remove until it breaks.' },
  { label: 'Intentional', desc: 'Designed for the decisions humans make with AI, not around them.' },
  { label: 'Open',        desc: 'MIT licensed. Fork it, break it, ship it.' },
]

// ─── App ─────────────────────────────────────────────────────────────────────
export function App() {
  const { theme, toggleTheme } = useTheme({ defaultTheme: 'light' })

  return (
    <div
      data-theme={theme}
      style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-white)', position: 'relative' }}
    >
      {/* ── Background gradients (from amberbockel-ui/styles) ── */}
      <div className="mesh-gradient" />
      <div className="sketch-top-gradient" />

      {/* ── Nav ── */}
      <Nav
        logo="amberbockel"
        logoHref="/"
        items={[
          { label: 'Work',   href: '#work' },
          { label: 'About',  href: '#about' },
          { label: 'GitHub', href: 'https://github.com/amberbockel', external: true },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
        fixed
        hideOnScroll
      />

      {/* ── Hero ── */}
      <Section id="hero">
        <Hero
          badge="v0.1.2"
          title="Design for intelligent systems."
          description="I shape how AI tools look, feel, and behave — so the humans using them can do their best work."
          ctas={[
            { label: 'See My Work', href: '#work', variant: 'primary' },
            { label: 'GitHub',      href: 'https://github.com/amberbockel', variant: 'secondary' },
          ]}
          size="large"
        />
      </Section>

      {/* ── Work ── */}
      <Section id="work">
        <div style={{ marginBottom: '48px' }}>
          <Badge variant="outline" style={{ marginBottom: '16px' }}>Work</Badge>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>
            What I'm building
          </h2>
          <p style={{ color: 'var(--color-grey-400)', maxWidth: '480px', lineHeight: 1.6 }}>
            Focused on design systems and AI-native interfaces.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {work.map((item) => (
            <Card key={item.title} style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px' }}>
              <Badge variant={item.accent}>{item.tag}</Badge>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>{item.title}</h3>
              <p style={{ color: 'var(--color-grey-400)', fontSize: '0.9rem', lineHeight: 1.65, flexGrow: 1 }}>
                {item.description}
              </p>
              {item.href !== '#' && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-white)', fontSize: '0.875rem', textDecoration: 'underline', opacity: 0.7 }}
                >
                  View →
                </a>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* ── About / Principles ── */}
      <Section id="about">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>

          {/* Bio */}
          <div>
            <Badge variant="outline" style={{ marginBottom: '16px' }}>About</Badge>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '20px' }}>
              Hi, I'm Amber.
            </h2>
            <p style={{ color: 'var(--color-grey-400)', lineHeight: 1.75, marginBottom: '16px' }}>
              I'm a designer and builder focused on the intersection of AI and human judgment. I think the next decade of software is defined by how well we design the space between human intent and machine capability.
            </p>
            <p style={{ color: 'var(--color-grey-400)', lineHeight: 1.75, marginBottom: '28px' }}>
              amberbockel-ui is my design system — open source, minimal, built for the kind of products I want to exist.
            </p>
            <Button
              variant="outline"
              onClick={() => window.open('https://github.com/amberbockel', '_blank')}
            >
              Follow on GitHub
            </Button>
          </div>

          {/* Principles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {principles.map((p) => (
              <div
                key={p.label}
                style={{
                  padding: '20px 24px',
                  borderRadius: '16px',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                }}
              >
                <p style={{ fontWeight: 600, marginBottom: '6px' }}>{p.label}</p>
                <p style={{ color: 'var(--color-grey-400)', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Footer ── */}
      <Footer
        logo={
          <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            amberbockel
          </span>
        }
        description="Design leadership shaping how intelligent systems meet human judgment."
        copyright="© 2026 Amber Bockel"
        currentSite="with major thanks and credit to"
        sites={[
          { name: 'with major thanks and credit to', href: '#' },
          { name: 'ui.n3wth.com', href: 'https://ui.n3wth.com/' },
        ]}
        sections={[
          {
            title: 'Navigate',
            links: [
              { label: 'Work',   href: '#work' },
              { label: 'About',  href: '#about' },
              { label: 'GitHub', href: 'https://github.com/amberbockel' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'amberbockel-ui docs', href: 'https://amberbockel.github.io/ui/' },
              { label: 'npm package',         href: 'https://npmjs.com/package/amberbockel-ui' },
            ],
          },
          {
            title: 'Legal',
            links: [
              { label: 'Privacy',     href: '/privacy' },
              { label: 'Terms',       href: '/terms' },
              { label: 'MIT License', href: 'https://opensource.org/licenses/MIT' },
            ],
          },
        ]}
        legalLinks={[
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms',   href: '/terms' },
        ]}
      />
    </div>
  )
}
