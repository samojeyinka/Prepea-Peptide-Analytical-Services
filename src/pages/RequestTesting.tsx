import { useState, type FormEvent } from 'react'
import { Reveal } from '../components/animations/Reveal'
import { MaterialIcon } from '../components/ui/MaterialIcon'
import { PageHeader } from '../components/ui/PageHeader'

const assays: ReadonlyArray<{ id: string; label: string; hint: string }> = [
  { id: 'hplc', label: 'HPLC Purity Analysis', hint: 'Area-% purity + impurity profile' },
  { id: 'lcms', label: 'LC-MS Identity Confirmation', hint: 'Exact mass + spectrum' },
  { id: 'panel', label: 'Full Release Panel', hint: 'Purity, identity, content' },
]

const nextSteps: ReadonlyArray<{ icon: string; title: string; body: string }> = [
  {
    icon: 'schedule',
    title: 'Accession within hours',
    body: 'You receive an ACC number and shipping instructions by email.',
  },
  {
    icon: 'local_shipping',
    title: 'Ship your sample',
    body: 'Send the lyophilized material with the intake reference included.',
  },
  {
    icon: 'science',
    title: 'Analysis begins',
    body: 'Runs execute on calibrated instruments with raw data captured.',
  },
  {
    icon: 'fact_check',
    title: 'COA delivered',
    body: 'A verifiable Certificate of Analysis lands in 5–7 business days.',
  },
]

const inputClasses =
  'w-full border-b border-outline-variant bg-surface-bright px-4 py-4 font-body-md text-body-md text-on-surface transition-colors placeholder:text-outline focus:border-primary focus:outline-none'

export function RequestTesting() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    material: '',
    batch: '',
    notes: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const update =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
    }

  return (
    <>
      <PageHeader eyebrow="Start An Analysis" title="Request Testing">
        Tell us about your material and we&apos;ll handle the rest. You&apos;ll receive an
        accession number and shipping instructions within hours.
      </PageHeader>

      <section className="mx-auto max-w-container-max px-5 pb-20 md:px-margin-edge md:pb-32">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="border border-outline-variant bg-surface-bright p-8 md:p-12">
                {submitted ? (
                  <div className="py-10 text-center">
                    <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-primary">
                      <MaterialIcon name="task_alt" size={32} />
                    </span>
                    <h2 className="mb-3 font-headline-md text-headline-md text-primary">
                      Request received
                    </h2>
                    <p className="mx-auto max-w-md font-body-md text-body-md text-on-surface-variant">
                      Thank you, {form.name || 'there'}. We&apos;re reviewing your request for{' '}
                      <span className="font-semibold text-primary">
                        {form.material || 'your material'}
                      </span>{' '}
                      and will email your accession number to {form.email || 'you'} within hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-8 font-headline-md text-headline-md text-primary">
                      Analysis request
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="rt-name" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                            Name
                          </label>
                          <input
                            id="rt-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={update('name')}
                            placeholder="Jane Researcher"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label htmlFor="rt-email" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                            Email
                          </label>
                          <input
                            id="rt-email"
                            type="email"
                            required
                            value={form.email}
                            onChange={update('email')}
                            placeholder="jane@lab.org"
                            className={inputClasses}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="rt-material" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                          Material
                        </label>
                        <input
                          id="rt-material"
                          type="text"
                          required
                          value={form.material}
                          onChange={update('material')}
                          placeholder="e.g. Tirzepatide, 5 mg lyophilized"
                          className={inputClasses}
                        />
                      </div>

                      <div>
                        <label htmlFor="rt-batch" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                          Batch / Lot Number (optional)
                        </label>
                        <input
                          id="rt-batch"
                          type="text"
                          value={form.batch}
                          onChange={update('batch')}
                          placeholder="e.g. TZP-882-LQ"
                          className={inputClasses}
                        />
                      </div>

                      <fieldset>
                        <legend className="mb-4 font-label-caps text-label-caps text-on-surface-variant">
                          Analyses Requested
                        </legend>
                        <div className="space-y-3">
                          {assays.map((assay) => (
                            <label
                              key={assay.id}
                              className="flex cursor-pointer items-start gap-4 border border-outline-variant bg-surface p-5 transition-colors hover:border-primary"
                            >
                              <input
                                type="checkbox"
                                name="assays"
                                value={assay.id}
                                defaultChecked={assay.id === 'hplc'}
                                className="mt-1 h-4 w-4 accent-primary"
                              />
                              <span>
                                <span className="block font-body-md text-body-md font-semibold text-primary">
                                  {assay.label}
                                </span>
                                <span className="block font-label-caps text-label-caps text-outline">
                                  {assay.hint}
                                </span>
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <div>
                        <label htmlFor="rt-notes" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                          Notes (optional)
                        </label>
                        <textarea
                          id="rt-notes"
                          rows={4}
                          value={form.notes}
                          onChange={update('notes')}
                          placeholder="Storage conditions, expected concentration, special handling…"
                          className={inputClasses}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-primary px-8 py-4 font-cta text-cta uppercase tracking-wider text-on-primary transition-colors hover:bg-secondary md:w-auto"
                        style={{ borderRadius: '30% 70% 70% 30% / 50% 30% 70% 50%' }}
                      >
                        Submit Request
                      </button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>

          {/* What happens next */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <div className="border border-outline bg-primary p-8 text-on-primary md:p-10">
                <h2 className="mb-8 font-headline-md text-headline-md text-surface">
                  What happens next
                </h2>
                <div className="space-y-8">
                  {nextSteps.map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary-fixed-dim bg-primary-container text-inverse-primary">
                          <MaterialIcon name={step.icon} size={22} />
                        </span>
                        {index < nextSteps.length - 1 && (
                          <span className="mt-2 w-px flex-1 border-l border-dashed border-primary-fixed-dim" />
                        )}
                      </div>
                      <div className="pb-2">
                        <h3 className="mb-1 font-body-md text-body-md font-semibold text-surface">
                          <span className="mr-1 font-label-caps text-inverse-primary">
                            {String(index + 1).padStart(2, '0')}.
                          </span>
                          {step.title}
                        </h3>
                        <p className="font-body-md text-body-md text-surface-variant opacity-90">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
