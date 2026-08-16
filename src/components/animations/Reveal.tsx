import { createElement, type CSSProperties, type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type RevealProps = {
  children: ReactNode
  /** Stagger delay in milliseconds */
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'span' | 'li' | 'article' | 'figure'
}

/**
 * Fades and slides its children into view the first time they enter the
 * viewport. Pairs with the `.reveal` / `.reveal-visible` utilities.
 */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  const style: CSSProperties | undefined = delay
    ? { transitionDelay: `${delay}ms` }
    : undefined

  return createElement(
    as,
    {
      ref: ref as never,
      style,
      className: `reveal ${inView ? 'reveal-visible' : ''} ${className}`.trim(),
    },
    children,
  )
}
