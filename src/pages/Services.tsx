import type { CSSProperties } from 'react'
import { Reveal } from '../components/animations/Reveal'
import { CtaButton } from '../components/ui/CtaButton'
import { MaterialIcon } from '../components/ui/MaterialIcon'
import { PageHeader } from '../components/ui/PageHeader'
import { IMAGES } from '../data/site'

type Deliverable = {
  icon: string
  text: string
}

type ServiceBlockProps = {
  id: string
  number: string
  title: string
  scientificName: string
  methodology: string
  deliverables: ReadonlyArray<Deliverable>
  image: string
  imageAlt: string
  imageStyle: CSSProperties
  decorationStyle: CSSProperties
  dark?: boolean
}

function ServiceBlock({
  id,
  number,
  title,
  scientificName,
  methodology,
  deliverables,
  image,
  imageAlt,
  imageStyle,
  decorationStyle,
  dark = false,
}: ServiceBlockProps) {
  const onDark = dark

  return (
    <section
      id={id}
      className={`scroll-mt-28 py-20 md:py-32 ${onDark ? 'bg-primary text-surface' : 'bg-surface'}`}
    >
      <div className="mx-auto max-w-container-max px-5 md:px-margin-edge">
        <div className="grid grid-cols-1 items-center gap-gutter md:grid-cols-12">
          {/* Copy */}
          <div className={`${onDark ? 'md:col-span-5 md:col-start-2' : 'md:col-span-5 md:col-start-7'}`}>
            <Reveal>
              <div
                className={`mb-4 font-label-caps text-label-caps uppercase tracking-widest ${
                  onDark ? 'text-inverse-primary' : 'text-secondary'
                }`}
              >
                Methodology: {number}
              </div>
              <h2 className={`mb-6 font-headline-lg text-headline-lg ${onDark ? 'text-surface' : 'text-primary'}`}>
                {title}
              </h2>
              <h3
                className={`mb-8 font-body-lg text-body-lg italic ${
                  onDark ? 'text-secondary-fixed' : 'text-on-surface-variant'
                }`}
              >
                Scientific Name: {scientificName}
              </h3>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={80}>
                <div>
                  <h4
                    className={`mb-3 border-b pb-2 font-label-caps text-label-caps uppercase tracking-widest ${
                      onDark
                        ? 'border-secondary text-inverse-primary'
                        : 'border-outline-variant text-primary'
                    }`}
                  >
                    Methodology
                  </h4>
                  <p
                    className={`font-body-md text-body-md ${
                      onDark ? 'text-surface-variant opacity-90' : 'text-on-surface-variant'
                    }`}
                  >
                    {methodology}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div>
                  <h4
                    className={`mb-3 border-b pb-2 font-label-caps text-label-caps uppercase tracking-widest ${
                      onDark
                        ? 'border-secondary text-inverse-primary'
                        : 'border-outline-variant text-primary'
                    }`}
                  >
                    What You Receive
                  </h4>
                  <ul className="space-y-2">
                    {deliverables.map((item) => (
                      <li key={item.text} className="flex items-start">
                        <MaterialIcon
                          name={item.icon}
                          size={20}
                          className={`mr-2 ${onDark ? 'text-inverse-primary' : 'text-secondary'}`}
                        />
                        <span
                          className={`font-body-md text-body-md ${
                            onDark ? 'text-surface-variant opacity-90' : 'text-on-surface-variant'
                          }`}
                        >
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative mt-12 md:mt-0 ${
              onDark ? 'md:col-span-5 md:col-start-8' : 'md:col-span-5 md:col-start-1'
            }`}
          >
            <div
              aria-hidden="true"
              className={`absolute -inset-4 opacity-50 ${
                onDark
                  ? 'border border-secondary bg-primary-container'
                  : 'border border-outline-variant bg-sand-accent'
              }`}
              style={decorationStyle}
            />
            <Reveal delay={100}>
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className={`relative z-10 h-[420px] w-full object-cover md:h-[600px] ${
                  onDark ? 'border border-secondary grayscale contrast-125' : 'border border-outline-variant'
                }`}
                style={imageStyle}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <>
      <PageHeader eyebrow="Independent Laboratory Testing" title="Analytical Services">
        Rigorous, independent laboratory testing utilizing state-of-the-art chromatography and
        mass spectrometry. We provide transparent, defensible data for research applications.
      </PageHeader>

      <ServiceBlock
        id="hplc"
        number="01"
        title="High-Performance Liquid Chromatography"
        scientificName="Reversed-Phase HPLC (RP-HPLC)"
        dark
        methodology="Utilizing an octadecyl carbon chain (C18) bonded silica stationary phase, this method separates peptide sequences based on hydrophobicity. A gradient elution of water and acetonitrile (both containing 0.1% TFA) ensures precise resolution of the target peptide from synthesis-related impurities."
        deliverables={[
          { icon: 'check', text: 'Chromatogram detailing retention times.' },
          { icon: 'check', text: 'Quantitative purity assessment (Area %).' },
          { icon: 'check', text: 'Impurity profiling identifying truncations or modifications.' },
        ]}
        image={IMAGES.hplc}
        imageAlt="Close-up of modern HPLC machinery in a pristine laboratory"
        imageStyle={{ borderRadius: '40% 60% 70% 30% / 50% 60% 40% 50%' }}
        decorationStyle={{ borderRadius: '40% 60% 70% 30% / 50% 60% 40% 50%' }}
      />

      <ServiceBlock
        id="lcms"
        number="02"
        title="LC-MS Confirmation"
        scientificName="Liquid Chromatography-Mass Spectrometry"
        methodology="Coupling liquid chromatography with mass spectrometry allows for unequivocal mass determination. The eluent is ionized via Electrospray Ionization (ESI), and the mass-to-charge ratio (m/z) of resulting ions is measured using a quadrupole or Time-of-Flight (TOF) analyzer to confirm exact molecular weight."
        deliverables={[
          { icon: 'fingerprint', text: 'Definitive identity confirmation.' },
          { icon: 'fingerprint', text: 'Full mass spectrum plotting m/z against relative abundance.' },
          { icon: 'fingerprint', text: 'Isotopic distribution analysis to verify chemical formula.' },
        ]}
        image={IMAGES.lcms}
        imageAlt="Mass spectrometer monitor displaying molecular weight spectra"
        imageStyle={{ borderRadius: '70% 30% 50% 50% / 30% 30% 70% 70%' }}
        decorationStyle={{ borderRadius: '70% 30% 50% 50% / 30% 30% 70% 70%' }}
      />

      <section className="bg-primary text-on-primary">
        <div className="mx-auto flex max-w-container-max flex-col items-center gap-8 px-5 py-20 text-center md:px-margin-edge md:py-28">
          <Reveal>
            <h2 className="font-headline-lg text-headline-lg text-surface">
              Verify a Certificate of Analysis
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body-md text-body-md text-surface-variant">
              Every report we issue carries a verifiable accession number. Look yours up in seconds
              — or start a new analysis today.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <CtaButton
                to="/coa-lookup"
                variant="light"
                style={{ borderRadius: '70% 30% 50% 50% / 30% 60% 40% 70%' }}
              >
                COA Lookup
              </CtaButton>
              <CtaButton
                to="/request-testing"
                variant="outline"
                className="border-surface text-surface hover:bg-primary-fixed hover:text-primary"
                style={{ borderRadius: '30% 70% 70% 30% / 50% 30% 70% 50%' }}
              >
                Request Testing
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
