import { Reveal } from '../components/animations/Reveal'
import { CtaButton } from '../components/ui/CtaButton'

export function NotFound() {
  return (
    <section className="mx-auto flex max-w-container-max flex-col items-center px-5 py-32 text-center md:px-margin-edge md:py-40">
      <Reveal>
        <span className="mb-6 block font-label-caps text-label-caps uppercase tracking-widest text-secondary">
          Error 404
        </span>
        <h1 className="font-display-lg text-headline-lg text-primary md:text-display-lg">
          <span
            className="inline-block px-8 py-4"
            style={{
              backgroundColor: '#d4ff00',
              color: '#0a2e26',
              borderRadius: '60% 40% 70% 30% / 40% 50% 60% 40%',
            }}
          >
            Page not found.
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you
          back to the results.
        </p>
        <div className="mt-10">
          <CtaButton
            to="/"
            style={{ borderRadius: '70% 30% 50% 50% / 30% 60% 40% 70%' }}
          >
            Back to Home
          </CtaButton>
        </div>
      </Reveal>
    </section>
  )
}
