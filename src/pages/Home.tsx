import { Link } from 'react-router-dom'
import { Reveal } from '../components/animations/Reveal'
import { CtaButton } from '../components/ui/CtaButton'
import { MaterialIcon } from '../components/ui/MaterialIcon'
import { TRUST_ITEMS, IMAGES } from '../data/site'

const serviceCards: ReadonlyArray<{
  icon: string
  title: string
  body: string
  to: string
}> = [
  {
    icon: 'water_drop',
    title: 'HPLC Purity Analysis',
    body: 'Quantitative purity and impurity profiling using reversed-phase gradient chromatography for unambiguous area-% reporting.',
    to: '/services#hplc',
  },
  {
    icon: 'fingerprint',
    title: 'LC-MS Identity Confirmation',
    body: 'Exact molecular weight determination via ESI mass spectrometry to confirm identity down to the isotopic envelope.',
    to: '/services#lcms',
  },
  {
    icon: 'description',
    title: 'Certificates of Analysis',
    body: 'Every result ships as a defensible, raw-data-backed COA with a verifiable accession number and full audit trail.',
    to: '/coa-lookup',
  },
]

function Hero() {
  return (
    <header className="relative mx-auto max-w-container-max px-5 pt-2 pb-24 md:px-margin-edge md:pt-8 md:pb-32">
      <div className="grid grid-cols-1 items-center gap-gutter md:grid-cols-12">
        <div className="relative z-10 md:col-span-5">
          <Reveal>
            <div
              className="mb-6 p-8 md:p-12"
              style={{
                backgroundColor: 'rgb(212, 255, 0)',
                borderRadius: '45% 55% 35% 65% / 60% 40% 70% 30%',
              }}
            >
              <h1 className="mb-6 font-display-lg text-headline-lg text-primary md:text-display-lg">
                Independent analysis.
                <br />
                Clear results.
              </h1>
              <p className="mb-0 max-w-md font-body-lg text-body-lg text-primary">
                Rigorous, verifiable peptide testing. We provide the empirical data you need to
                ensure purity, identity, and concentration.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <CtaButton
                to="/request-testing"
                style={{ borderRadius: '30% 70% 70% 30% / 50% 30% 70% 50%' }}
              >
                Request Testing
              </CtaButton>
              <CtaButton
                to="/services"
                variant="outline"
                style={{ borderRadius: '70% 30% 50% 50% / 30% 60% 40% 70%' }}
              >
                Explore Services
              </CtaButton>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-12 md:col-span-7 md:col-start-6 md:mt-0">
          <div
            aria-hidden="true"
            className="absolute -left-10 top-10 z-0 h-full w-full bg-sand-accent"
            style={{ borderRadius: '60% 40% 70% 30% / 40% 70% 30% 60%' }}
          />
          <Reveal delay={80}>
            <img
              src={IMAGES.heroLab}
              alt="Laboratory equipment in a pristine HPLC lab"
              className="editorial-border relative z-10 h-[420px] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0 md:h-[600px]"
              style={{ borderRadius: '40% 60% / 60% 40%' }}
              loading="eager"
            />
          </Reveal>
        </div>
      </div>
    </header>
  )
}

function TrustStrip() {
  return (
    <section className="border-y border-outline-variant bg-surface-container-low px-5 py-8">
      <div className="mx-auto flex max-w-container-max flex-wrap items-center justify-between gap-8">
        {TRUST_ITEMS.map((item, index) => (
          <Reveal
            key={item.label}
            delay={index * 80}
            className="flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant"
          >
            <img src={item.icon} alt="" className="h-8 w-8 opacity-80" />
            {item.label}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ServicesPreview() {
  return (
    <section className="relative mx-auto max-w-container-max px-5 py-24 md:px-margin-edge md:py-32">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <div>
            <span className="mb-4 block font-label-caps text-label-caps uppercase tracking-widest text-secondary">
              What We Do
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary">Analytical services</h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-xl font-body-md text-body-md text-on-surface-variant">
            Transparent, defensible data from independent chromatography and mass-spectrometry
            platforms — from a single vial to full release panels.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        {serviceCards.map((card, index) => (
          <Reveal key={card.title} delay={index * 100}>
            <Link
              to={card.to}
              className="group flex h-full flex-col border border-outline-variant bg-surface-bright p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                <MaterialIcon name={card.icon} size={24} />
              </span>
              <h3 className="mb-3 font-headline-md text-2xl text-primary">{card.title}</h3>
              <p className="mb-8 flex-1 font-body-md text-body-md text-on-surface-variant">
                {card.body}
              </p>
              <span className="font-cta text-cta uppercase tracking-wider text-primary">
                Learn more
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
              </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="bg-primary text-on-primary">
      <div className="mx-auto flex max-w-container-max flex-col items-center gap-8 px-5 py-24 text-center md:px-margin-edge md:py-32">
        <Reveal>
          <span className="mb-4 block font-label-caps text-label-caps uppercase tracking-widest text-inverse-primary">
            Begin Verification
          </span>
          <h2 className="font-display-lg text-headline-lg text-surface md:text-display-lg">
            Send us a sample.
            <br />
            Get a defensible answer.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body-lg text-body-lg text-surface-variant">
            Request testing in under two minutes, or verify an existing Certificate of Analysis
            against our secure database.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-col gap-4 sm:flex-row">
            <CtaButton
              to="/request-testing"
              variant="light"
              style={{ borderRadius: '30% 70% 70% 30% / 50% 30% 70% 50%' }}
            >
              Request Testing
            </CtaButton>
            <CtaButton
              to="/coa-lookup"
              variant="outline"
              className="border-surface text-surface hover:bg-primary-fixed hover:text-primary"
              style={{ borderRadius: '70% 30% 50% 50% / 30% 60% 40% 70%' }}
            >
              COA Lookup
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <CtaBand />
    </>
  )
}
