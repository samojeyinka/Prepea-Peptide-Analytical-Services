import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react'
import { jsPDF } from 'jspdf'
import { Reveal } from '../components/animations/Reveal'
import { MaterialIcon } from '../components/ui/MaterialIcon'

const SAMPLE_CODE = 'ACC-2026-8991X'

type VerifyStatus = 'idle' | 'verified' | 'not-found' | 'invalid'

interface CoaRecord {
  accession: string
  material: string
  batch: string
  entity: string
  issueDate: string
  purity: string
  mass: string
  netContent: string
  overallStatus: string
  rtPeak: number
}

const COA_RECORDS: CoaRecord[] = [
  { accession: 'ACC-2026-8991X', material: 'Tirzepatide Reference Standard', batch: 'TZP-882-LQ', entity: 'Redacted per NDA', issueDate: '12 OCT 2026', purity: '99.8%', mass: 'Pass', netContent: '31.2mg', overallStatus: 'CONFORMS', rtPeak: 12.45 },
  { accession: 'ACC-2026-7432K', material: 'Semaglutide Analyte', batch: 'SGL-441-PR', entity: 'Redacted per NDA', issueDate: '09 OCT 2026', purity: '99.6%', mass: 'Pass', netContent: '15.8mg', overallStatus: 'CONFORMS', rtPeak: 11.32 },
  { accession: 'ACC-2026-6105M', material: 'BPC-157 Synthetic Peptide', batch: 'BPC-309-WA', entity: 'Redacted per NDA', issueDate: '07 OCT 2026', purity: '98.9%', mass: 'Pass', netContent: '22.4mg', overallStatus: 'CONFORMS', rtPeak: 9.87 },
  { accession: 'ACC-2026-5871N', material: 'CJC-1295DAC Research Grade', batch: 'CJC-557-BN', entity: 'Redacted per NDA', issueDate: '04 OCT 2026', purity: '99.3%', mass: 'Pass', netContent: '18.6mg', overallStatus: 'CONFORMS', rtPeak: 10.14 },
  { accession: 'ACC-2026-4208P', material: 'GHK-Cu Tripeptide Complex', batch: 'GHK-212-MT', entity: 'Redacted per NDA', issueDate: '01 OCT 2026', purity: '99.1%', mass: 'Pass', netContent: '25.0mg', overallStatus: 'CONFORMS', rtPeak: 8.56 },
  { accession: 'ACC-2026-3745R', material: 'PT-141 Research Peptide', batch: 'PT14-680-HQ', entity: 'Redacted per NDA', issueDate: '28 SEP 2026', purity: '98.7%', mass: 'Pass', netContent: '10.5mg', overallStatus: 'CONFORMS', rtPeak: 13.21 },
  { accession: 'ACC-2026-2190S', material: 'Ipamorelin Synthetic', batch: 'IPA-118-KR', entity: 'Redacted per NDA', issueDate: '25 SEP 2026', purity: '99.5%', mass: 'Pass', netContent: '20.3mg', overallStatus: 'CONFORMS', rtPeak: 10.78 },
  { accession: 'ACC-2026-1563T', material: 'Retatrutide Reference Standard', batch: 'RTT-903-DL', entity: 'Redacted per NDA', issueDate: '22 SEP 2026', purity: '99.4%', mass: 'Pass', netContent: '28.7mg', overallStatus: 'CONFORMS', rtPeak: 14.05 },
]

function SearchSection() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<VerifyStatus>('idle')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = code.trim().toUpperCase()

    if (!value) {
      setStatus('invalid')
      return
    }
    if (value === SAMPLE_CODE) {
      setStatus('verified')
      return
    }
    setStatus('not-found')
  }

  const statusMessage: Record<Exclude<VerifyStatus, 'idle'>, string> = {
    verified: 'Verified \u2014 this certificate matches our database records.',
    'not-found': 'No certificate matches that accession number. Double-check and try again.',
    invalid: 'Please enter an accession number (e.g. ACC-2026-8991X).',
  }

  return (
    <section className="mx-auto mb-20 max-w-3xl text-center md:mb-24">
      <Reveal>
        <span className="mb-4 block font-label-caps text-label-caps uppercase tracking-widest text-secondary">
          Secure Database
        </span>
        <h1 className="mb-6 font-display-lg text-headline-lg text-charcoal-ink md:text-display-lg">
          Certificate of Analysis
        </h1>
        <p className="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Verify the authenticity and analytical results of your tested materials using our secure
          database.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <form onSubmit={handleSubmit} className="relative mx-auto w-full max-w-2xl">
          <label htmlFor="coa-search" className="sr-only">
            Enter Accession Number or Verification Code
          </label>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-outline">
            <MaterialIcon name="search" size={20} />
          </span>
          <input
            id="coa-search"
            type="text"
            value={code}
            onChange={(event) => {
              setCode(event.target.value)
              setStatus('idle')
            }}
            placeholder="ENTER ACCESSION NUMBER OR VERIFICATION CODE"
            className="block w-full border-b border-primary bg-sand-accent py-5 pl-12 pr-28 font-label-caps text-label-caps text-charcoal-ink transition-colors placeholder:text-outline focus:border-primary-container focus:outline-none"
          />
          <button
            type="submit"
            className="absolute inset-y-2 right-2 bg-charcoal-ink px-6 py-2 font-cta text-cta text-surface transition-colors hover:bg-secondary"
          >
            VERIFY
          </button>
        </form>

        {status !== 'idle' && (
          <p
            role="status"
            className={`mx-auto mt-4 flex max-w-2xl items-center justify-center gap-2 font-label-caps text-label-caps ${
              status === 'verified' ? 'text-primary' : 'text-error'
            }`}
          >
            <MaterialIcon
              name={status === 'verified' ? 'check_circle' : 'error'}
              size={16}
              filled
            />
            {statusMessage[status]}
          </p>
        )}
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-4 flex items-center justify-center space-x-2 font-label-caps text-[10px] tracking-widest text-outline">
          <MaterialIcon name="lock" size={14} />
          <span>SECURE LABORATORY DATABASE</span>
        </div>
      </Reveal>
    </section>
  )
}

function generatePeakPath(rt: number, heightVariation: number = 0): string {
  const baseline = 90
  const peakX = 50 + (rt / 25) * 900
  const peakTop = 8 + heightVariation
  const cp1x1 = peakX - 45
  const cp2x1 = peakX - 25
  const cp1x2 = peakX + 25
  const cp2x2 = peakX + 45

  return `M 0 ${baseline} L ${cp1x1} ${baseline} C ${cp2x1} ${baseline}, ${cp1x1} ${peakTop}, ${peakX} ${peakTop} C ${cp1x2} ${peakTop}, ${cp2x2} ${baseline}, ${cp1x2} ${baseline} L 1000 ${baseline}`
}

function generatePeakFill(rt: number, heightVariation: number = 0): string {
  const baseline = 90
  const peakX = 50 + (rt / 25) * 900
  const peakTop = 8 + heightVariation
  const cp1x1 = peakX - 45
  const cp2x1 = peakX - 25
  const cp1x2 = peakX + 25
  const cp2x2 = peakX + 45

  return `M ${cp1x1} ${baseline} C ${cp2x1} ${baseline}, ${cp1x1} ${peakTop}, ${peakX} ${peakTop} C ${cp1x2} ${peakTop}, ${cp2x2} ${baseline}, ${cp1x2} ${baseline} Z`
}

function Chromotogram({ rtPeak }: { rtPeak: number }) {
  const [scanX, setScanX] = useState(0)
  const [noiseOffset, setNoiseOffset] = useState(0)
  const animRef = useRef<number>(0)
  const lastTimeRef = useRef(0)

  const peakPath = generatePeakPath(rtPeak, noiseOffset * 0.3)
  const peakFill = generatePeakFill(rtPeak, noiseOffset * 0.3)

  useEffect(() => {
    const animate = (time: number) => {
      if (time - lastTimeRef.current > 30) {
        lastTimeRef.current = time
        setScanX((prev) => (prev + 0.6) % 1000)
        setNoiseOffset(Math.sin(time * 0.002) * 0.8)
      }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const rtLabelX = 50 + (rtPeak / 25) * 900

  return (
    <div className="relative h-64 w-full overflow-hidden border border-outline-variant bg-grid-pattern">
      <svg className="absolute bottom-0 h-full w-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <line stroke="#c1c8c4" strokeDasharray="4,4" strokeWidth="1" x1="0" x2="1000" y1="90" y2="90" />

        {[200, 400, 600, 800].map((x) => (
          <line key={x} stroke="#c1c8c4" strokeDasharray="2,6" strokeWidth="0.5" x1={x} x2={x} y1="0" y2="100" />
        ))}

        {[20, 40, 60, 80].map((y) => (
          <line key={y} stroke="#c1c8c4" strokeDasharray="2,6" strokeWidth="0.5" x1="0" x2="1000" y1={y} y2={y} />
        ))}

        <path d={peakFill} fill="rgba(214, 231, 213, 0.35)" />
        <path d={peakPath} fill="none" stroke="#001812" strokeWidth="1.5" />

        <line
          x1={scanX}
          y1="0"
          x2={scanX}
          y2="100"
          stroke="rgba(0, 24, 18, 0.12)"
          strokeWidth="2"
        />
        <line
          x1={scanX}
          y1="0"
          x2={scanX}
          y2="100"
          stroke="rgba(0, 100, 76, 0.5)"
          strokeWidth="0.8"
        />
        <circle cx={scanX} cy={10} r="2.5" fill="rgba(0, 100, 76, 0.6)">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div
        className="absolute bottom-[80%] flex -translate-x-1/2 flex-col items-center transition-all duration-300"
        style={{ left: `${(rtLabelX / 1000) * 100}%` }}
      >
        <div className="border border-primary bg-surface px-2 font-label-caps text-[10px] text-primary">
          RT: {rtPeak.toFixed(2)}
        </div>
        <div className="mt-1 h-4 w-px bg-primary" />
      </div>

      <div className="absolute bottom-2 right-4 font-label-caps text-[10px] text-outline">
        TIME (MIN)
      </div>
      <div className="absolute left-4 top-4 origin-bottom-left -rotate-90 font-label-caps text-[10px] text-outline">
        ABSORBANCE (mAU)
      </div>

      <div className="absolute right-4 top-3 flex items-center gap-1.5 font-label-caps text-[9px] text-outline">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
        <span>LIVE</span>
      </div>
    </div>
  )
}

function SampleCertificate({ record }: { record: CoaRecord }) {
  return (
    <>
      <Reveal>
        <div className="relative overflow-hidden border border-outline bg-surface-bright p-8">
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 h-16 w-16 -mr-8 -mt-8 rotate-45 border-b border-l border-outline bg-sand-accent"
          />
          <h2 className="mb-2 font-label-caps text-label-caps text-outline">
            RECENT VERIFICATION
          </h2>
          <div className="mb-6 font-label-caps text-lg font-bold text-charcoal-ink">
            {record.accession}
          </div>

          <div className="mb-8 flex items-center space-x-3 border-b border-outline-variant pb-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-container text-primary">
              <MaterialIcon name="check_circle" size={22} filled />
            </span>
            <div>
              <div className="font-cta text-cta text-primary">VERIFIED AUTHENTIC</div>
              <div className="font-label-caps text-[10px] text-outline">ISSUED: {record.issueDate}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="font-label-caps text-[10px] text-outline">MATERIAL</div>
              <div className="font-body-md text-body-md font-semibold text-charcoal-ink">
                {record.material}
              </div>
            </div>
            <div>
              <div className="font-label-caps text-[10px] text-outline">BATCH NUMBER</div>
              <div className="font-label-caps text-sm text-charcoal-ink">{record.batch}</div>
            </div>
            <div>
              <div className="font-label-caps text-[10px] text-outline">REQUESTING ENTITY</div>
              <div className="font-body-md text-body-md text-charcoal-ink">{record.entity}</div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <PdfDownloadButton record={record} />
      </Reveal>
    </>
  )
}

function PdfDownloadButton({ record }: { record: CoaRecord }) {
  const [generating, setGenerating] = useState(false)

  const generatePdf = useCallback(() => {
    setGenerating(true)

    setTimeout(() => {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageW = doc.internal.pageSize.getWidth()
      const margin = 20
      const contentW = pageW - margin * 2
      let y = margin

      doc.setFillColor(0, 24, 18)
      doc.rect(0, 0, pageW, 32, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('PREPEA PEPTIDE ANALYTICAL SERVICES', margin, 14)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.text('Certificate of Analysis', margin, 22)
      doc.text(`Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}`, pageW - margin, 22, { align: 'right' })

      y = 42

      doc.setFillColor(240, 242, 240)
      doc.rect(margin, y, contentW, 8, 'F')
      doc.setTextColor(0, 24, 18)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('CERTIFICATE DETAILS', margin + 3, y + 5.5)
      y += 14

      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(60, 60, 60)

      const details: [string, string][] = [
        ['Accession Number:', record.accession],
        ['Material:', record.material],
        ['Batch Number:', record.batch],
        ['Requesting Entity:', record.entity],
        ['Issue Date:', record.issueDate],
        ['Certificate Status:', 'VERIFIED AUTHENTIC'],
      ]

      details.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold')
        doc.text(label, margin, y)
        doc.setFont('helvetica', 'normal')
        doc.text(value, margin + 42, y)
        y += 6
      })

      y += 6

      doc.setFillColor(240, 242, 240)
      doc.rect(margin, y, contentW, 8, 'F')
      doc.setTextColor(0, 24, 18)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('ANALYTICAL RESULTS', margin + 3, y + 5.5)
      y += 14

      doc.setFontSize(9)
      doc.setTextColor(60, 60, 60)

      const metrics: [string, string, string][] = [
        ['PURITY (HPLC)', record.purity, '210 nm, RP-C18, Acetonitrile/Water gradient'],
        ['MASS (LC-MS)', record.mass, 'ESI positive mode, m/z range 200-2000'],
        ['NET CONTENT', record.netContent, 'Gravimetric analysis'],
        ['OVERALL STATUS', record.overallStatus, 'All specifications met'],
      ]

      doc.setFillColor(0, 24, 18)
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.text('PARAMETER', margin + 3, y + 3.5)
      doc.text('RESULT', margin + 52, y + 3.5)
      doc.text('METHOD', margin + 82, y + 3.5)
      doc.rect(margin, y, contentW, 7, 'F')
      y += 7

      doc.setTextColor(60, 60, 60)
      doc.setFont('helvetica', 'normal')
      metrics.forEach(([param, result, method], i) => {
        if (i % 2 === 0) {
          doc.setFillColor(248, 250, 248)
          doc.rect(margin, y, contentW, 7, 'F')
        }
        doc.setFont('helvetica', 'bold')
        doc.text(param, margin + 3, y + 5)
        doc.setFont('helvetica', 'normal')
        doc.text(result, margin + 52, y + 5)
        doc.text(method, margin + 82, y + 5)
        y += 7
      })

      y += 10

      doc.setFillColor(240, 242, 240)
      doc.rect(margin, y, contentW, 8, 'F')
      doc.setTextColor(0, 24, 18)
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.text('HPLC CHROMATOGRAM SUMMARY', margin + 3, y + 5.5)
      y += 14

      doc.setDrawColor(200, 200, 200)
      doc.setLineWidth(0.3)
      doc.line(margin, y + 40, margin + contentW, y + 40)

      const peakX = margin + 10 + ((record.rtPeak / 25) * (contentW - 20))
      const peakBaseY = y + 40
      const peakTopY = y + 8

      doc.setDrawColor(0, 24, 18)
      doc.setLineWidth(0.5)
      doc.line(margin + 10, peakBaseY, peakX - 12, peakBaseY)

      doc.setFillColor(214, 231, 213)
      doc.setDrawColor(0, 24, 18)
      doc.setLineWidth(0.4)
      doc.triangle(peakX - 12, peakBaseY, peakX, peakTopY, peakX + 12, peakBaseY, 'FD')

      doc.line(peakX + 12, peakBaseY, margin + contentW - 10, peakBaseY)

      doc.setFontSize(7)
      doc.setTextColor(0, 24, 18)
      doc.setFont('helvetica', 'bold')
      doc.text(`RT: ${record.rtPeak.toFixed(2)} min`, peakX - 5, peakTopY - 3)

      doc.setFontSize(6)
      doc.setTextColor(120, 120, 120)
      doc.setFont('helvetica', 'normal')
      doc.text('0', margin + 8, peakBaseY + 4)
      doc.text('5', margin + 10 + (contentW - 20) * 0.2, peakBaseY + 4)
      doc.text('10', margin + 10 + (contentW - 20) * 0.4, peakBaseY + 4)
      doc.text('15', margin + 10 + (contentW - 20) * 0.6, peakBaseY + 4)
      doc.text('20', margin + 10 + (contentW - 20) * 0.8, peakBaseY + 4)
      doc.text('25', margin + contentW - 10, peakBaseY + 4)
      doc.text('TIME (MIN)', margin + contentW / 2 - 8, peakBaseY + 8)

      y = peakBaseY + 18

      doc.setDrawColor(180, 180, 180)
      doc.setLineWidth(0.2)
      doc.line(margin, y, margin + contentW, y)
      y += 6

      doc.setFontSize(7)
      doc.setTextColor(100, 100, 100)
      doc.setFont('helvetica', 'italic')
      doc.text('This certificate is issued under ISO 17025 accredited laboratory protocols.', margin, y)
      y += 4
      doc.text('Results pertain to the sample as received and tested by Prepea Peptide Analytical Services.', margin, y)
      y += 4
      doc.text(`Certificate ref: ${record.accession} | Confidential \u2014 For authorized recipients only.`, margin, y)

      const footerY = doc.internal.pageSize.getHeight() - 12
      doc.setFillColor(0, 24, 18)
      doc.rect(0, footerY - 2, pageW, 14, 'F')
      doc.setTextColor(200, 200, 200)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.text('Prepea Peptide Analytical Services  |  prepea.com  |  This document is electronically generated and valid without signature.', pageW / 2, footerY + 5, { align: 'center' })

      doc.save(`COA-${record.accession}.pdf`)
      setGenerating(false)
    }, 400)
  }, [record])

  return (
    <button
      type="button"
      onClick={generatePdf}
      disabled={generating}
      className="flex w-full items-center justify-center space-x-2 border border-primary py-4 font-cta text-cta text-charcoal-ink transition-colors hover:bg-sand-accent disabled:opacity-50"
    >
      {generating ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-charcoal-ink border-t-transparent" />
          <span>GENERATING PDF...</span>
        </>
      ) : (
        <>
          <MaterialIcon name="download" size={20} />
          <span>DOWNLOAD FULL PDF</span>
        </>
      )}
    </button>
  )
}

function Metrics({ record }: { record: CoaRecord }) {
  const metrics: ReadonlyArray<{ label: string; value: string }> = [
    { label: 'PURITY (HPLC)', value: record.purity },
    { label: 'MASS (MS)', value: record.mass },
    { label: 'NET CONTENT', value: record.netContent },
  ]

  return (
    <Reveal>
      <div className="grid grid-cols-2 border border-outline bg-surface-bright md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="border-b border-r border-outline p-6 md:border-b-0">
            <div className="mb-1 font-label-caps text-[10px] text-outline">{metric.label}</div>
            <div className="font-headline-md text-headline-md text-charcoal-ink">{metric.value}</div>
          </div>
        ))}
        <div className="bg-sand-accent p-6">
          <div className="mb-1 font-label-caps text-[10px] text-outline">OVERALL STATUS</div>
          <div className="font-headline-md text-headline-md text-primary">{record.overallStatus}</div>
        </div>
      </div>
    </Reveal>
  )
}

function ChromatogramCard({ record }: { record: CoaRecord }) {
  return (
    <Reveal delay={80}>
      <div className="border border-outline bg-surface-bright p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-label-caps text-label-caps text-charcoal-ink">
            HPLC CHROMATOGRAM
          </h3>
          <div className="flex space-x-4 font-label-caps text-[10px] text-outline">
            <span className="flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary" /> SAMPLE
            </span>
            <span className="flex items-center">
              <span className="mr-2 h-2 w-2 rounded-full border border-outline" /> BASELINE
            </span>
          </div>
        </div>
        <Chromotogram rtPeak={record.rtPeak} />
      </div>
    </Reveal>
  )
}

export function CoaLookup() {
  const [recordIndex, setRecordIndex] = useState(0)
  const [fadeClass, setFadeClass] = useState('opacity-100')

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('opacity-0')
      setTimeout(() => {
        setRecordIndex((prev) => (prev + 1) % COA_RECORDS.length)
        setFadeClass('opacity-100')
      }, 400)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const record = COA_RECORDS[recordIndex]

  return (
    <div className="mx-auto w-full max-w-container-max px-5 py-12 md:px-margin-edge md:py-20">
      <SearchSection />

      <section className="grid grid-cols-1 items-start gap-gutter md:grid-cols-12">
        <div className="flex flex-col space-y-gutter md:col-span-4">
          <div className={`transition-opacity duration-400 ease-in-out ${fadeClass}`}>
            <SampleCertificate record={record} />
          </div>
        </div>
        <div className="flex flex-col space-y-gutter md:col-span-8">
          <div className={`transition-opacity duration-400 ease-in-out ${fadeClass}`}>
            <Metrics record={record} />
          </div>
          <ChromatogramCard record={record} />
        </div>
      </section>
    </div>
  )
}
