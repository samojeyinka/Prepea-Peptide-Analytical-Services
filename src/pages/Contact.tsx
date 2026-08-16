import { useState, type FormEvent } from 'react'
import { Reveal } from '../components/animations/Reveal'
import { MaterialIcon } from '../components/ui/MaterialIcon'
import { PageHeader } from '../components/ui/PageHeader'
import { SITE } from '../data/site'

const contactPoints: ReadonlyArray<{
  icon: string
  label: string
  value: string
  href?: string
}> = [
  { icon: 'mail', label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: 'call', label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/[^+\d]/g, '')}` },
  { icon: 'location_on', label: 'Laboratory', value: SITE.address },
  { icon: 'schedule', label: 'Hours', value: 'Mon–Fri, 9:00–17:00 PT' },
]

const inputClasses =
  'w-full border-b border-outline-variant bg-surface-bright px-4 py-4 font-body-md text-body-md text-on-surface transition-colors placeholder:text-outline focus:border-primary focus:outline-none'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const update = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  return (
    <>
      <PageHeader eyebrow="Get In Touch" title="Contact the Lab">
        Questions about methodology, turnaround, or your specific material? Our lab coordinators
        respond within one business day.
      </PageHeader>

      <section className="mx-auto max-w-container-max px-5 pb-20 md:px-margin-edge md:pb-32">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          {/* Contact info */}
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="mb-8 font-headline-md text-headline-md text-primary">Reach us directly</h2>
              <div className="space-y-6">
                {contactPoints.map((point) => (
                  <div key={point.label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-container text-primary">
                      <MaterialIcon name={point.icon} size={22} />
                    </span>
                    <div>
                      <div className="font-label-caps text-label-caps text-outline">{point.label}</div>
                      {point.href ? (
                        <a
                          href={point.href}
                          className="font-body-md text-body-md font-medium text-primary hover:underline"
                        >
                          {point.value}
                        </a>
                      ) : (
                        <div className="font-body-md text-body-md font-medium text-primary">
                          {point.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={100}>
              <div className="border border-outline-variant bg-surface-bright p-8 md:p-12">
                {submitted ? (
                  <div className="py-10 text-center">
                    <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-primary">
                      <MaterialIcon name="mark_email_read" size={32} />
                    </span>
                    <h2 className="mb-3 font-headline-md text-headline-md text-primary">
                      Message sent
                    </h2>
                    <p className="mx-auto max-w-md font-body-md text-body-md text-on-surface-variant">
                      Thanks, {form.name || 'there'} — we&apos;ve received your message and will
                      reply to {form.email || 'your email'} within one business day.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-8 font-headline-md text-headline-md text-primary">
                      Send a message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="contact-name" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                            Name
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={form.name}
                            onChange={update('name')}
                            placeholder="Jane Researcher"
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                            Email
                          </label>
                          <input
                            id="contact-email"
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
                        <label htmlFor="contact-subject" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          type="text"
                          required
                          value={form.subject}
                          onChange={update('subject')}
                          placeholder="Turnaround time for a new peptide"
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="mb-2 block font-label-caps text-label-caps text-on-surface-variant">
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={update('message')}
                          placeholder="Tell us about your material and what you need."
                          className={inputClasses}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-primary px-8 py-4 font-cta text-cta uppercase tracking-wider text-on-primary transition-colors hover:bg-secondary md:w-auto"
                        style={{ borderRadius: '30% 70% 70% 30% / 50% 30% 70% 50%' }}
                      >
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
