import { Link } from 'react-router-dom'
import { Reveal } from '../components/animations/Reveal'
import { Accordion } from '../components/ui/Accordion'
import { MaterialIcon } from '../components/ui/MaterialIcon'
import { PageHeader } from '../components/ui/PageHeader'

const faqItems: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'What is the minimum sample quantity for testing?',
    answer:
      'We recommend at least 10 mg of lyophilized powder per assay. For panels combining HPLC purity and LC-MS confirmation we recommend 20 mg so that a full re-analysis is possible if ever needed.',
  },
  {
    question: 'How long does analysis take?',
    answer:
      'Standard single-assay turnaround is 5–7 business days from sample receipt. Rush service (2–3 business days) and full release panels are available — status is always available through your accession number.',
  },
  {
    question: 'How should I ship my samples?',
    answer:
      'Ship lyophilized material at ambient temperature unless it is temperature-sensitive, in which case use cold packs. Include the printed intake form and your accession number. Full instructions are emailed on request.',
  },
  {
    question: 'What does a Certificate of Analysis include?',
    answer:
      'Every COA contains the accession number, identity and purity results, chromatogram and mass spectrum, batch information, method references, and an overall conformity statement — all backed by raw data visualizations.',
  },
  {
    question: 'How do you handle confidentiality?',
    answer:
      'Samples are assigned anonymous accession numbers and identity is never disclosed without your consent. Requesting entities may be redacted per NDA, as shown on the sample COA in our Lookup tool.',
  },
  {
    question: 'Is your testing intended for human use?',
    answer:
      'No. All services are strictly for research use only. Results must not be used for clinical, diagnostic, or human-consumption decisions.',
  },
  {
    question: 'Can anyone verify my certificate?',
    answer:
      'Yes. Every COA is indexed in our public Lookup database, so anyone with the accession number can confirm authenticity and review the analytical results.',
  },
]

export function Faq() {
  return (
    <>
      <PageHeader eyebrow="Help Center" title="Frequently Asked Questions">
        Quick answers about shipping, turnaround, reporting, and verification. Can&apos;t find what
        you need? We&apos;re a message away.
      </PageHeader>

      <section className="mx-auto max-w-container-max px-5 pb-20 md:px-margin-edge md:pb-32">
        <Reveal>
          <Accordion items={faqItems} />
        </Reveal>
      </section>

      <section className="border-y border-outline-variant bg-primary text-on-primary">
        <div className="mx-auto flex max-w-container-max flex-col items-center px-5 py-16 text-center md:px-margin-edge md:py-24">
          <Reveal>
            <MaterialIcon name="support_agent" size={40} className="mb-4 text-inverse-primary" />
            <h2 className="mb-3 font-headline-lg text-headline-lg text-surface">
              Still have a question?
            </h2>
            <p className="mx-auto mb-8 max-w-xl font-body-md text-body-md text-surface-variant">
              Our lab coordinators respond to every inquiry within one business day.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-surface px-8 py-4 font-cta text-cta uppercase tracking-wider text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-sand-accent"
              style={{ borderRadius: '70% 30% 50% 50% / 30% 60% 40% 70%' }}
            >
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
