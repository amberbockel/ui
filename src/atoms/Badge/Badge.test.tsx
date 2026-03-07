import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { axe } from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'
import { Badge } from './Badge'

expect.extend(matchers)

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders as a span element', () => {
    render(<Badge>Tag</Badge>)
    expect(screen.getByText('Tag').tagName).toBe('SPAN')
  })

  it('applies default variant', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toHaveClass('bg-[var(--glass-bg)]')
  })

  it('applies color variants', () => {
    const { rerender } = render(<Badge variant="periwinkle">periwinkle</Badge>)
    expect(screen.getByText('periwinkle')).toHaveClass('text-[var(--color-periwinkle)]')

    rerender(<Badge variant="pink">Pink</Badge>)
    expect(screen.getByText('Pink')).toHaveClass('text-[var(--color-pink)]')

    rerender(<Badge variant="indigo">Indigo</Badge>)
    expect(screen.getByText('Indigo')).toHaveClass('text-[var(--color-indigo)]')

    rerender(<Badge variant="green">Green</Badge>)
    expect(screen.getByText('Green')).toHaveClass('text-[var(--color-green)]')
  })

  it('applies size classes', () => {
    const { rerender } = render(<Badge size="sm">Sm</Badge>)
    expect(screen.getByText('Sm')).toHaveClass('text-[10px]')

    rerender(<Badge size="md">Md</Badge>)
    expect(screen.getByText('Md')).toHaveClass('text-xs')
  })

  it('merges custom className', () => {
    render(<Badge className="custom">Badge</Badge>)
    expect(screen.getByText('Badge')).toHaveClass('custom')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Badge>New</Badge>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
