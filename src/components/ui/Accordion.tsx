import { useState } from 'react'
import { MaterialIcon } from './MaterialIcon'

export type AccordionItem = {
  question: string
  answer: string
}

type AccordionProps = {
  items: ReadonlyArray<AccordionItem>
}

/** Accessible, animated FAQ accordion (only one panel open at a time). */
export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      {items.map((item, index) => {
        const open = openIndex === index
        return (
          <div
            key={item.question}
            className={`border bg-surface-bright transition-colors duration-300 ${
              open ? 'border-primary' : 'border-outline-variant hover:border-outline'
            }`}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`faq-panel-${index}`}
              id={`faq-trigger-${index}`}
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8"
            >
              <span className="font-body-lg text-body-lg font-semibold text-primary">
                {item.question}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  open
                    ? 'rotate-180 border-primary bg-primary text-on-primary'
                    : 'border-outline-variant text-on-surface-variant'
                }`}
              >
                <MaterialIcon name="expand_more" size={20} />
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 font-body-md text-body-md text-on-surface-variant md:px-8">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
