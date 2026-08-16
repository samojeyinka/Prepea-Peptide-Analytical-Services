import type { ReactNode } from 'react'
import { Reveal } from '../animations/Reveal'

type PageHeaderProps = {
  eyebrow: string
  title: string
  children?: ReactNode
}

/** Consistent inner-page hero: eyebrow, accent-highlighted display title. */
export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <section className="relative mx-auto max-w-container-max px-5 py-20 text-center md:px-margin-edge md:py-28">
      <Reveal>
        <span className="mb-6 block font-label-caps text-label-caps uppercase tracking-widest text-secondary">
          {eyebrow}
        </span>
        <h1 className="font-display-lg text-headline-lg-mobile text-primary md:text-display-lg">
          <span
            className="inline-block px-7 py-3 md:px-10 md:py-5"
            style={{
              backgroundColor: '#d4ff00',
              color: '#0a2e26',
              borderRadius: '60% 40% 70% 30% / 40% 50% 60% 40%',
            }}
          >
            {title}
          </span>
        </h1>
        {children && (
          <p className="mx-auto mt-8 max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
            {children}
          </p>
        )}
      </Reveal>
    </section>
  )
}
