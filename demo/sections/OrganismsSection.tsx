import { DemoSection, DemoBlock } from './DemoSection'
import { CodeSnippet } from './CodeSnippet'

export function OrganismsSection() {
  return (
    <DemoSection id="organisms" title="Organisms" description="Complex UI components composed of molecules and atoms that structure Amber's mentorship pages.">
      <DemoBlock title="Nav">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Fixed navigation bar with logo, links, theme toggle, and responsive mobile drawer. See the top of this page for a live example.
        </p>
        <CodeSnippet code={`<Nav
  logo="amber bockel"
  logoHref="/"
  items={[
    { label: 'Mentorship', href: '/mentorship' },
    { label: 'AI Strategy', href: '/ai' },
  ]}
  theme={theme}
  onThemeToggle={toggleTheme}
/>`} />
      </DemoBlock>

      <DemoBlock title="Hero">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Hero section with animated gradient text, badge, description, and CTA buttons. Scroll to the top of the page for the live demo.
        </p>
        <CodeSnippet code={`<Hero
  badge="UX + AI"
  title="Designing for Tomorrow."
  description="Mentorship and design leadership strategies."
  ctas={[
    { label: 'Book a Session', href: '#mentor' },
    { label: 'Read Articles', href: 'https://amberbockel.substack.com', variant: 'secondary' },
  ]}
/>`} />
      </DemoBlock>

      <DemoBlock title="Section">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Content wrapper with optional alternate background. Used throughout this demo site.
        </p>
        <CodeSnippet code={`<Section id="features" variant="alternate">
  <SectionHeader
    title="Mentorship Approach"
    description="Elevate your design career"
  />
  {/* content */}
</Section>`} />
      </DemoBlock>

      <DemoBlock title="Footer">
        <p className="text-sm text-[var(--color-grey-400)] mb-4">
          Multi-column footer with sections, links, logo, and theme toggle. Scroll to the bottom of this page for the live example.
        </p>
        <CodeSnippet code={`<Footer
  logo={<span className="font-display text-lg">amber bockel</span>}
  description="UX Leadership and AI Strategy."
  sections={[
    {
      title: 'Resources',
      links: [
        { label: 'Mentorship', href: '#' },
        { label: 'Articles', href: '#' },
      ],
    },
  ]}
  theme={theme}
  onThemeToggle={toggleTheme}
/>`} />
      </DemoBlock>
    </DemoSection>
  )
}
