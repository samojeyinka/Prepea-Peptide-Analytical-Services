import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CtaButtonProps = {
  to: string
  children: ReactNode
  variant?: 'solid' | 'outline' | 'light'
  className?: string
  style?: CSSProperties
}

/** Editorial call-to-action link used across the site. */
export function CtaButton({
  to,
  children,
  variant = 'solid',
  className = '',
  style,
}: CtaButtonProps) {
  const base =
    'inline-block px-8 py-4 text-center font-cta text-cta uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0'

  const tones =
    variant === 'solid'
      ? 'bg-primary text-on-primary hover:bg-secondary'
      : variant === 'light'
        ? 'bg-surface text-primary hover:bg-sand-accent'
        : 'editorial-border text-charcoal-ink hover:bg-sand-accent'

  return (
    <Link to={to} className={`${base} ${tones} ${className}`.trim()} style={style}>
      {children}
    </Link>
  )
}
