import { Link } from 'react-router-dom'
import { Reveal } from '../components/animations/Reveal'
import { CtaButton } from '../components/ui/CtaButton'
import { MaterialIcon } from '../components/ui/MaterialIcon'
import { PageHeader } from '../components/ui/PageHeader'

const steps: ReadonlyArray<{
  number: string
  icon: string
  title: string
  body: string
}> = [
  {
    number: '01',
    icon: 'assignment_turned_in',
    title: 'Request & Submit',
    body: 'Complete a short intake form describing your material and the analyses you need. You will receive an accession number and shipping instructions within hours.',
  },
  {
    number: '02',
    icon: 'inventory_2',
    title: 'Intake & Registration',
    body: 'Your sample is logged into a secure chain-of-custody, assigned a unique ACC code, and stored under controlled conditions until analysis.',
  },
  {
    number: '03',
    icon: 'monitor_heart',
    title: 'Analysis',
    body: 'HPLC and LC-MS runs are executed on calibrated instruments verified against NIST-traceable reference standards, with raw data captured at every step.',
  },
  {
    number: '04',
    icon: 'fact_check',
    title: 'COA & Verification',
    body: 'You receive a defensible Certificate of Analysis with full data visualizations — and it is indexed in our database for independent verification.',
  },
]

const preparation: ReadonlyArray<string> = [
  '≥ 10 mg lyophilized powder per assay (recommended)',
  'Batch / lot number if available',
  'MSDS or material description for handling',
  'Shipping on cold packs for temperature-sensitive material',
]

export function HowItWorks() {
  return (
    <>
      <PageHeader eyebrow="The Process" title="How It Works">
        From submission to a verifiable Certificate of Analysis in four transparent steps.
        No guesswork, no hidden margins — just a clear chain from sample to data.
      </PageHeader>

      {/* Timeline */}
      <section className="mx-auto max-w-container-max px-5 pb-20 md:px-margin-edge md:pb-32">
        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-6 top-6 w-px border-l border-dashed border-outline-variant md:left-1/2"
          />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative mb-16 flex flex-col gap-6 last:mb-0 md:mb-20 md:flex-row ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Node */}
              <Reveal className="relative z-10 flex md:w-1/2">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-surface text-primary shadow-lg">
                  <MaterialIcon name={step.icon} size={26} />
                </span>
              </Reveal>

              <Reveal
                delay={100}
                className={`relative z-10 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'
                }`}
              >
                <div className="border border-outline-variant bg-surface-bright p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl">
                  <div className="mb-3 font-label-caps text-label-caps text-secondary">
                    STEP {step.number}
                  </div>
                  <h2 className="mb-3 font-headline-md text-2xl text-primary">{step.title}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">{step.body}</p>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Preparation + CTA */}
      <section className="border-y border-outline-variant bg-surface-container-low">
        <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-5 py-20 md:grid-cols-12 md:px-margin-edge md:py-28">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="mb-6 font-headline-lg text-headline-lg text-primary">
                Preparing your sample
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                A few simple guidelines help us move your analysis to the front of the queue and
                avoid re-runs.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={100}>
              <ul className="space-y-4">
                {preparation.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <MaterialIcon name="check" size={20} className="mt-0.5 text-secondary" />
                    <span className="font-body-md text-body-md text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-10">
                <CtaButton
                  to="/request-testing"
                  style={{ borderRadius: '30% 70% 70% 30% / 50% 30% 70% 50%' }}
                >
                  Start Your Request
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="mx-auto max-w-container-max px-5 py-20 text-center md:px-margin-edge md:py-28">
        <Reveal>
          <h2 className="mb-4 font-headline-lg text-headline-lg text-primary">
            Still have questions?
          </h2>
          <p className="mx-auto mb-8 max-w-xl font-body-md text-body-md text-on-surface-variant">
            Browse the FAQ for turnaround times, shipping details and reporting — or reach out
            directly.
          </p>
          <Link
            to="/faq"
            className="font-cta text-cta uppercase tracking-wider text-primary underline decoration-outline underline-offset-8 transition-colors hover:text-secondary"
          >
            Read the FAQ
          </Link>
        </Reveal>
      </section>
    </>
  )
}
