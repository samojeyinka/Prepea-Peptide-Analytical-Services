import { Reveal } from '../components/animations/Reveal'
import { CtaButton } from '../components/ui/CtaButton'
import { MaterialIcon } from '../components/ui/MaterialIcon'
import { IMAGES } from '../data/site'

const standards: ReadonlyArray<{
  icon: string
  title: string
  body: string
}> = [
  {
    icon: 'science',
    title: 'Precision Chromatography',
    body: 'Utilizing ultra-high-performance liquid chromatography (UHPLC) coupled with mass spectrometry for ultimate resolution and sensitivity.',
  },
  {
    icon: 'verified',
    title: 'Calibrated Accuracy',
    body: 'Daily calibration against NIST-traceable reference standards guarantees that our quantitative data is consistently reliable.',
  },
  {
    icon: 'policy',
    title: 'Transparent Reporting',
    body: 'Every Certificate of Analysis includes raw data visualizations, ensuring full transparency in our analytical findings.',
  },
  {
    icon: 'biotech',
    title: 'Continuous Validation',
    body: 'Our methods undergo rigorous, ongoing validation processes to adapt to new analytical challenges and ensure robust results.',
  },
]

function Hero() {
  return (
    <section className="mx-auto max-w-container-max px-5 py-20 md:px-margin-edge md:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <span className="mb-6 block font-label-caps text-label-caps uppercase tracking-widest text-secondary">
            Our Ethos
          </span>
          <h1 className="font-display-lg text-headline-lg text-primary md:text-display-lg">
            <span
              className="inline-block px-7 py-3 md:px-10 md:py-5"
              style={{
                backgroundColor: 'rgb(212, 255, 0)',
                color: 'rgb(10, 46, 38)',
                borderRadius: '60% 40% 70% 30% / 40% 50% 60% 40%',
              }}
            >
              Built around better answers.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-3xl font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            We exist to provide unequivocal clarity in an industry often clouded by ambiguity. By
            maintaining absolute structural independence, we ensure that every Certificate of
            Analysis represents objective truth, free from commercial influence.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ImageBanner() {
  return (
    <section className="relative h-[50vh] min-h-[380px] w-full overflow-hidden border-y border-outline-variant bg-sand-accent md:h-[60vh]">
      <div
        role="img"
        aria-label="A modern, sterile analytical laboratory"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${IMAGES.aboutBanner})`,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }}
      />
    </section>
  )
}

function Standards() {
  return (
    <section className="mx-auto max-w-container-max px-5 py-20 md:px-margin-edge md:py-32">
      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="mb-6 font-headline-lg text-headline-lg text-primary">
              Our Scientific Standards
            </h2>
            <p className="mb-8 font-body-md text-body-md text-on-surface-variant">
              Rigorous methodology is not just a protocol; it is the foundation of our independence.
              We employ state-of-the-art analytical techniques to ensure unparalleled accuracy.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {standards.map((standard, index) => (
              <Reveal key={standard.title} delay={index * 90}>
                <div className="border-l border-primary pl-6 transition-transform duration-300 hover:translate-x-1">
                  <MaterialIcon
                    name={standard.icon}
                    filled
                    size={32}
                    className="mb-4 block text-secondary"
                  />
                  <h3 className="mb-3 font-headline-md text-2xl text-primary">{standard.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{standard.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Independence() {
  return (
    <section className="border-y border-outline-variant bg-surface-container-low py-20 md:py-32">
      <div className="mx-auto max-w-container-max px-5 md:px-margin-edge">
        <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
          <div className="relative order-2 lg:col-span-5 lg:order-1">
            <div
              aria-hidden="true"
              className="absolute inset-0 z-0 translate-x-4 translate-y-4 border border-outline bg-sand-accent"
              style={{ borderRadius: '40% 60% 70% 30% / 50% 60% 40% 50%' }}
            />
            <Reveal>
              <img
                src={IMAGES.scientist}
                alt="Lead research scientist analyzing a chromatography readout"
                className="editorial-border relative z-10 w-full object-cover grayscale contrast-125"
                style={{ borderRadius: '40% 60% 70% 30% / 50% 60% 40% 50%' }}
                loading="lazy"
              />
            </Reveal>
          </div>

          <div className="order-1 mb-10 lg:col-span-6 lg:col-start-7 lg:order-2 lg:mb-0">
            <Reveal>
              <h2 className="mb-6 font-headline-lg text-headline-lg text-primary">
                The Value of Independence
              </h2>
              <p className="mb-6 font-body-lg text-body-lg text-on-surface-variant">
                True analytical integrity requires distance. We are not affiliated with any
                manufacturer, distributor, or research sponsor. Our sole product is truth,
                quantified and verified.
              </p>
              <p className="mb-8 font-body-md text-body-md text-on-surface-variant">
                This absolute independence allows us to report findings without bias or external
                pressure. When you read our Certificate of Analysis, you are seeing unvarnished
                data derived entirely from objective scientific methodology. We do not adjust
                results to meet expectations; we report the reality of the sample.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <CtaButton
                to="/methodology"
                variant="outline"
                style={{ borderRadius: '70% 30% 50% 50% / 30% 30% 70% 70%' }}
              >
                Review Methodology
              </CtaButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <>
      <Hero />
      <ImageBanner />
      <Standards />
      <Independence />
    </>
  )
}
