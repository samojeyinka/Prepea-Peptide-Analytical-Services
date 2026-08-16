import { Navigate } from 'react-router-dom'
import { Reveal } from '../components/animations/Reveal'
import { PageHeader } from '../components/ui/PageHeader'
import { INFO_PAGES } from '../data/infoPages'

type InfoPageProps = {
  slug: string
}

/** Renders Terms, Privacy, Methodology and Compliance from shared content. */
export function InfoPage({ slug }: InfoPageProps) {
  const page = INFO_PAGES.find((entry) => entry.slug === slug)

  if (!page) return <Navigate to="/" replace />

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title}>
        {page.intro}
      </PageHeader>

      <section className="mx-auto max-w-3xl px-5 pb-20 md:px-margin-edge md:pb-32">
        <div className="space-y-12">
          {page.sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * 60}>
              <div className="border-l-2 border-primary pl-6 md:pl-8">
                <h2 className="mb-4 font-headline-md text-headline-md text-primary">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-body-md text-body-md text-on-surface-variant"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 font-body-md text-body-md text-on-surface-variant marker:text-secondary">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
