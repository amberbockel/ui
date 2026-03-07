import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'periwinkle' | 'pink' | 'indigo' | 'green' | 'outline'
  size?: 'sm' | 'md'
  children: ReactNode
}

export function Badge({
  variant = 'default',
  size = 'sm',
  children,
  className,
  ...props
}: BadgeProps) {
  const baseStyles = [
    'inline-flex items-center justify-center',
    'font-medium',
    'rounded-full',
    'whitespace-nowrap',
    'transition-colors duration-200',
    'backdrop-blur-sm',
  ]

  const variants = {
    default: [
      'bg-[var(--glass-bg)]',
      'text-[var(--color-grey-400)]',
      'border border-[var(--glass-border)]',
    ],
    periwinkle: [
      'bg-[var(--color-periwinkle)]/10',
      'text-[var(--color-periwinkle)]',
      'border border-[var(--color-periwinkle)]/20',
    ],
    pink: [
      'bg-[var(--color-pink)]/10',
      'text-[var(--color-pink)]',
      'border border-[var(--color-pink)]/20',
    ],
    indigo: [
      'bg-[var(--color-indigo)]/10',
      'text-[var(--color-indigo)]',
      'border border-[var(--color-indigo)]/20',
    ],
    green: [
      'bg-[var(--color-green)]/10',
      'text-[var(--color-green)]',
      'border border-[var(--color-green)]/20',
    ],
    outline: [
      'bg-transparent',
      'text-[var(--color-grey-400)]',
      'border border-[var(--glass-border)]',
    ],
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] tracking-wide uppercase',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  )
}
