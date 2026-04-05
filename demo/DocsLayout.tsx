import { useState, useEffect, type ComponentType } from 'react'
import { NavLink, useParams } from 'react-router'
import { Logo } from '../src/atoms/Logo'

const docModules = import.meta.glob<{ default: ComponentType }>([
  '../docs/getting-started.md',
  '../docs/building-with-ai.md',
  '../docs/theming.md',
  '../docs/components.md',
  '../docs/hooks.md',
  '../docs/css-utilities.md',
  '../docs/privacy.md',
  '../docs/terms.md',
], { eager: true })

export interface DocPage {
  slug: string
  title: string
  Component: ComponentType
}

function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/css /i, 'CSS ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export const docPages: DocPage[] = Object.entries(docModules)
  .map(([path, mod]) => {
    const slug = path.replace('../docs/', '').replace('.md', '')
    return {
      slug,
      title: slugToTitle(slug),
      Component: mod.default,
    }
  })
  .sort((a, b) => {
    const order = ['getting-started', 'building-with-ai', 'theming', 'components', 'hooks', 'css-utilities', 'terms', 'privacy']
    return order.indexOf(a.slug) - order.indexOf(b.slug)
  })

export function DocsLayout() {
  const { theme, toggleTheme } = useTheme()
  const { slug } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentPage = docPages.find((p) => p.slug === slug) ?? docPages[0]
  const Content = currentPage.Component

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  return (
    <div className="min-h-screen relative text-[var(--color-white)] bg-[var(--color-bg)] transition-colors duration-500">
      <div className="mesh-gradient"></div>
      <div className="sketch-top-gradient"></div>
      <Nav
        logo={<Logo />}
        logoHref={import.meta.env.BASE_URL || '/'}
        items={[
          { label: 'Components', href: import.meta.env.BASE_URL || '/' },
          { label: 'Docs', href: `${import.meta.env.BASE_URL || '/'}docs/getting-started`, isActive: true },
          { label: 'GitHub', href: 'https://github.com/amberbockel/ui', external: true },
        ]}
        theme={theme}
        onThemeToggle={toggleTheme}
        fixed
        hideOnScroll
      />

      <div className="relative z-10 pt-24 max-w-6xl mx-auto px-6 md:px-12 pb-24">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block">
            <nav className="sticky top-20 space-y-1">
              {docPages.map((page) => (
                <NavLink
                  key={page.slug}
                  to={`/docs/${page.slug}`}
                  className={({ isActive }) =>
                    cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm',
                      'transition-colors duration-150',
                      isActive
                        ? 'bg-[var(--glass-bg)] text-[var(--color-white)] border border-[var(--glass-border)]'
                        : 'text-[var(--color-grey-400)] hover:text-[var(--color-white)] hover:bg-[var(--glass-bg)] border border-transparent'
                    )
                  }
                >
                  {page.title}
                </NavLink>
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
              <span>{currentPage.title}</span>
              <Icon name={sidebarOpen ? 'chevron-up' : 'chevron-down'} size="xs" />
            </button>
            {sidebarOpen && (
              <nav className="mt-2 p-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] space-y-1">
                {docPages.map((page) => (
                  <NavLink
                    key={page.slug}
                    to={`/docs/${page.slug}`}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm',
                        'transition-colors duration-150',
                        isActive
                          ? 'bg-[var(--glass-bg)] text-[var(--color-white)]'
                          : 'text-[var(--color-grey-400)]'
                      )
                    }
                  >
                    {page.title}
                  </NavLink>
                ))}
              </nav>
            )}
          </div>

          {/* Content */}
          <main className="min-w-0 pt-8 lg:pt-0">
            <article className="prose">
              <Content />
            </article>
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
              { label: 'Components', href: `${import.meta.env.BASE_URL || '/'}docs/components` },
              { label: 'Hooks', href: `${import.meta.env.BASE_URL || '/'}docs/hooks` },
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
