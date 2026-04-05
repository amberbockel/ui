import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { version } from '../package.json'
import { Nav } from '../src/organisms/Nav'
import { Hero } from '../src/organisms/Hero'
import { Footer } from '../src/organisms/Footer'
import { Icon } from '../src/atoms/Icon'
import { Logo } from '../src/atoms/Logo'
import { useTheme } from '../src/hooks/useTheme'
import { cn } from '../src/utils/cn'
import { TokensSection } from './sections/TokensSection'
import { AtomsSection } from './sections/AtomsSection'
import { MoleculesSection } from './sections/MoleculesSection'
import { OrganismsSection } from './sections/OrganismsSection'
import { HooksSection } from './sections/HooksSection'
import { DocsLayout } from './DocsLayout'

const sidebarItems = [
  { id: 'tokens', label: 'Design Tokens', icon: 'sparkles' as const },
  { id: 'atoms', label: 'Atoms', icon: 'grid' as const },
  { id: 'molecules', label: 'Molecules', icon: 'code' as const },
  { id: 'organisms', label: 'Organisms', icon: 'list' as const },
  { id: 'hooks', label: 'Hooks', icon: 'terminal' as const },
]

function Showcase() {
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('tokens')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Track active section via intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const item of sidebarItems) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen relative text-[var(--color-white)] transition-colors duration-500">
      <div className="mesh-gradient"></div>
      <div className="sketch-top-gradient"></div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-lavender)] focus:text-black focus:rounded"
      >
        Skip to main content
      </a>

      {/* Nav */}
      <Nav
        logo={<Logo />}
        logoHref={import.meta.env.BASE_URL || '/'}
        items={[
          { label: 'Components', href: import.meta.env.BASE_URL || '/', isActive: true },
          { label: 'Docs', href: `${import.meta.env.BASE_URL || '/'}docs/getting-started` },
          { label: 'GitHub', href: 'https://github.com/amberbockel/ui', external: true },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
        fixed
        hideOnScroll
      />

      {/* Hero */}
      <div className="relative z-10">
        <Hero
          badge="v0.1.0"
          title={<span className="font-display font-light text-5xl md:text-7xl lg:text-[95px] tracking-[0.05em] leading-[1.1]">Tokens, Atoms, Molecules - Oh My!</span>}
          description={<>Atomic design system for AmberBockel sites.<br />Clean, fun, delightful.</>}
          ctas={[
            { label: 'Browse Components', href: '#atoms' },
            { label: 'View Source', href: 'https://github.com/amberbockel/ui', variant: 'secondary' },
          ]}
        />
      </div>

      {/* Main content with sidebar */}
      <div id="main-content" className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-24">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block">
            <nav className="sticky top-20 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left',
                    'transition-colors duration-150',
                    activeSection === item.id
                      ? 'bg-[var(--glass-bg)] text-[var(--color-white)] border border-[var(--glass-border)]'
                      : 'text-[var(--color-grey-400)] hover:text-[var(--color-white)] hover:bg-[var(--glass-bg)] border border-transparent'
                  )}
                >
                  <Icon name={item.icon} size="sm" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Mobile sidebar toggle */}
          <div className="lg:hidden sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-[var(--color-bg)]/80 backdrop-blur-lg border-b border-[var(--glass-border)]">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 text-sm text-[var(--color-grey-400)]"
            >
              <Icon name="menu" size="sm" />
              <span>{sidebarItems.find((i) => i.id === activeSection)?.label || 'Navigate'}</span>
              <Icon name={sidebarOpen ? 'chevron-up' : 'chevron-down'} size="xs" />
            </button>
            {sidebarOpen && (
              <nav className="mt-2 p-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left',
                      'transition-colors duration-150',
                      activeSection === item.id
                        ? 'bg-[var(--glass-bg)] text-[var(--color-white)]'
                        : 'text-[var(--color-grey-400)]'
                    )}
                  >
                    <Icon name={item.icon} size="sm" />
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Content */}
          <main className="min-w-0 space-y-20 pt-8 lg:pt-0">
            <TokensSection />
            <AtomsSection />
            <MoleculesSection theme={theme} onThemeToggle={toggleTheme} />
            <OrganismsSection />
            <HooksSection />
          </main>
        </div>
      </div>

      <Footer
        logo={
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <div className="scale-75 origin-left"><Logo /></div>
          </a>
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
              { label: 'Documentation', href: `${import.meta.env.BASE_URL || '/'}docs/getting-started` },
              { label: 'Components', href: '#atoms' },
              { label: 'Hooks', href: '#hooks' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'amberbockel.com', href: 'https://amberbockel.com' },
              { label: 'GitHub', href: 'https://github.com/amberbockel/ui' },
            ],
          },
          {
            title: 'Legal',
            links: [
              { label: 'Privacy', href: `${import.meta.env.BASE_URL || '/'}docs/privacy` },
              { label: 'Terms', href: `${import.meta.env.BASE_URL || '/'}docs/terms` },
              { label: 'MIT License', href: 'https://opensource.org/licenses/MIT' },
            ],
          },
        ]}
        legalLinks={[
          { label: 'Privacy', href: `${import.meta.env.BASE_URL || '/'}docs/privacy` },
          { label: 'Terms', href: `${import.meta.env.BASE_URL || '/'}docs/terms` },
        ]}
      />
    </div>
  )
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Showcase />} />
      <Route path="/docs/:slug" element={<DocsLayout />} />
      <Route path="/docs" element={<Navigate to="/docs/getting-started" replace />} />
    </Routes>
  )
}
