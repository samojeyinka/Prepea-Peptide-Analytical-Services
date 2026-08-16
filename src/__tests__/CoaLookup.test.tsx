import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

jest.mock('../components/animations/Reveal', () => ({
  Reveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('../components/ui/MaterialIcon', () => ({
  MaterialIcon: ({ name, size, filled }: { name: string; size?: number; filled?: boolean }) => (
    <span data-testid={`icon-${name}`} data-size={size} data-filled={filled}>
      {name}
    </span>
  ),
}))

const mockSave = jest.fn()
const mockSetFillColor = jest.fn()
const mockRect = jest.fn()
const mockSetTextColor = jest.fn()
const mockSetFontSize = jest.fn()
const mockSetFont = jest.fn()
const mockText = jest.fn()
const mockSetDrawColor = jest.fn()
const mockSetLineWidth = jest.fn()
const mockLine = jest.fn()
const mockTriangle = jest.fn()

jest.mock('jspdf', () => ({
  jsPDF: jest.fn().mockImplementation(() => ({
    internal: {
      pageSize: { getWidth: () => 210, getHeight: () => 297 },
    },
    setFillColor: mockSetFillColor,
    rect: mockRect,
    setTextColor: mockSetTextColor,
    setFontSize: mockSetFontSize,
    setFont: mockSetFont,
    text: mockText,
    save: mockSave,
    setDrawColor: mockSetDrawColor,
    setLineWidth: mockSetLineWidth,
    line: mockLine,
    triangle: mockTriangle,
  })),
}))

import { CoaLookup } from '../pages/CoaLookup'
import { jsPDF } from 'jspdf'

beforeEach(() => {
  jest.useFakeTimers()
  jest.clearAllMocks()
})

afterEach(() => {
  jest.useRealTimers()
})

function renderCoa() {
  return render(<CoaLookup />)
}

function advanceRecordRotation(ms: number = 5400) {
  act(() => {
    jest.advanceTimersByTime(ms)
  })
}

describe('SearchSection', () => {
  it('renders the page heading and description', () => {
    renderCoa()
    expect(screen.getByText('Certificate of Analysis')).toBeInTheDocument()
    expect(screen.getByText('Secure Database')).toBeInTheDocument()
    expect(screen.getByText(/Verify the authenticity/)).toBeInTheDocument()
  })

  it('renders the search input with correct placeholder', () => {
    renderCoa()
    const input = screen.getByPlaceholderText('ENTER ACCESSION NUMBER OR VERIFICATION CODE')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', 'coa-search')
  })

  it('renders the VERIFY button', () => {
    renderCoa()
    expect(screen.getByRole('button', { name: /VERIFY/ })).toBeInTheDocument()
  })

  it('renders SECURE LABORATORY DATABASE label', () => {
    renderCoa()
    expect(screen.getByText('SECURE LABORATORY DATABASE')).toBeInTheDocument()
  })

  it('shows invalid status on empty submission', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /VERIFY/ }))
    expect(screen.getByRole('status')).toHaveTextContent(/Please enter an accession number/)
  })

  it('shows verified status for correct accession code', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    const input = screen.getByPlaceholderText('ENTER ACCESSION NUMBER OR VERIFICATION CODE')
    await user.type(input, 'ACC-2026-8991X')
    await user.click(screen.getByRole('button', { name: /VERIFY/ }))
    expect(screen.getByRole('status')).toHaveTextContent(/Verified/)
  })

  it('shows not-found status for wrong accession code', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    const input = screen.getByPlaceholderText('ENTER ACCESSION NUMBER OR VERIFICATION CODE')
    await user.type(input, 'WRONG-CODE')
    await user.click(screen.getByRole('button', { name: /VERIFY/ }))
    expect(screen.getByRole('status')).toHaveTextContent(/No certificate matches/)
  })

  it('resets status to idle when user types', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /VERIFY/ }))
    expect(screen.getByRole('status')).toBeInTheDocument()
    const input = screen.getByPlaceholderText('ENTER ACCESSION NUMBER OR VERIFICATION CODE')
    await user.type(input, 'a')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('trims and uppercases input before verifying', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    const input = screen.getByPlaceholderText('ENTER ACCESSION NUMBER OR VERIFICATION CODE')
    await user.type(input, '  acc-2026-8991x  ')
    await user.click(screen.getByRole('button', { name: /VERIFY/ }))
    expect(screen.getByRole('status')).toHaveTextContent(/Verified/)
  })

  it('shows verified icon for verified status', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    const input = screen.getByPlaceholderText('ENTER ACCESSION NUMBER OR VERIFICATION CODE')
    await user.type(input, 'ACC-2026-8991X')
    await user.click(screen.getByRole('button', { name: /VERIFY/ }))
    const icons = screen.getAllByTestId('icon-check_circle')
    expect(icons.length).toBeGreaterThanOrEqual(2)
    expect(icons[0]).toHaveAttribute('data-size', '16')
  })

  it('shows error icon for not-found status', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    const input = screen.getByPlaceholderText('ENTER ACCESSION NUMBER OR VERIFICATION CODE')
    await user.type(input, 'WRONG')
    await user.click(screen.getByRole('button', { name: /VERIFY/ }))
    expect(screen.getByTestId('icon-error')).toBeInTheDocument()
  })

  it('shows error icon for invalid (empty) status', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /VERIFY/ }))
    expect(screen.getByTestId('icon-error')).toBeInTheDocument()
  })
})

describe('SampleCertificate', () => {
  it('shows RECENT VERIFICATION heading', () => {
    renderCoa()
    expect(screen.getByText('RECENT VERIFICATION')).toBeInTheDocument()
  })

  it('displays the first record accession number', () => {
    renderCoa()
    expect(screen.getByText('ACC-2026-8991X')).toBeInTheDocument()
  })

  it('displays VERIFIED AUTHENTIC badge', () => {
    renderCoa()
    expect(screen.getByText('VERIFIED AUTHENTIC')).toBeInTheDocument()
  })

  it('displays ISSUED date for first record', () => {
    renderCoa()
    expect(screen.getByText('ISSUED: 12 OCT 2026')).toBeInTheDocument()
  })

  it('displays MATERIAL name', () => {
    renderCoa()
    expect(screen.getByText('Tirzepatide Reference Standard')).toBeInTheDocument()
  })

  it('displays BATCH NUMBER', () => {
    renderCoa()
    expect(screen.getByText('TZP-882-LQ')).toBeInTheDocument()
  })

  it('displays REQUESTING ENTITY', () => {
    renderCoa()
    expect(screen.getByText('Redacted per NDA')).toBeInTheDocument()
  })

  it('updates record data after rotation', () => {
    renderCoa()
    advanceRecordRotation(5400)
    expect(screen.getByText('ACC-2026-7432K')).toBeInTheDocument()
    expect(screen.getByText('Semaglutide Analyte')).toBeInTheDocument()
    expect(screen.getByText('SGL-441-PR')).toBeInTheDocument()
  })

  it('cycles through all records and wraps around', () => {
    renderCoa()
    for (let i = 0; i < 8; i++) {
      advanceRecordRotation(5400)
    }
    expect(screen.getByText('ACC-2026-8991X')).toBeInTheDocument()
  })
})

describe('Metrics', () => {
  it('displays PURITY (HPLC) for first record', () => {
    renderCoa()
    expect(screen.getByText('PURITY (HPLC)')).toBeInTheDocument()
    expect(screen.getByText('99.8%')).toBeInTheDocument()
  })

  it('displays MASS (MS) for first record', () => {
    renderCoa()
    expect(screen.getByText('MASS (MS)')).toBeInTheDocument()
    expect(screen.getByText('Pass')).toBeInTheDocument()
  })

  it('displays NET CONTENT for first record', () => {
    renderCoa()
    expect(screen.getByText('NET CONTENT')).toBeInTheDocument()
    expect(screen.getByText('31.2mg')).toBeInTheDocument()
  })

  it('displays OVERALL STATUS', () => {
    renderCoa()
    expect(screen.getByText('OVERALL STATUS')).toBeInTheDocument()
    expect(screen.getByText('CONFORMS')).toBeInTheDocument()
  })

  it('updates metrics after record rotation', () => {
    renderCoa()
    advanceRecordRotation(5400)
    expect(screen.getByText('99.6%')).toBeInTheDocument()
    expect(screen.getByText('15.8mg')).toBeInTheDocument()
  })
})

describe('ChromatogramCard', () => {
  it('displays HPLC CHROMATOGRAM heading', () => {
    renderCoa()
    expect(screen.getByText('HPLC CHROMATOGRAM')).toBeInTheDocument()
  })

  it('displays SAMPLE and BASELINE legend', () => {
    renderCoa()
    expect(screen.getByText('SAMPLE')).toBeInTheDocument()
    expect(screen.getByText('BASELINE')).toBeInTheDocument()
  })
})

describe('Chromotogram', () => {
  it('renders an SVG element', () => {
    renderCoa()
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('displays RT label with first record value', () => {
    renderCoa()
    expect(screen.getByText('RT: 12.45')).toBeInTheDocument()
  })

  it('displays TIME (MIN) axis label', () => {
    renderCoa()
    expect(screen.getByText('TIME (MIN)')).toBeInTheDocument()
  })

  it('displays ABSORBANCE (mAU) axis label', () => {
    renderCoa()
    expect(screen.getByText('ABSORBANCE (mAU)')).toBeInTheDocument()
  })

  it('displays LIVE indicator', () => {
    renderCoa()
    expect(screen.getByText('LIVE')).toBeInTheDocument()
  })

  it('renders baseline dashed line', () => {
    renderCoa()
    const svg = document.querySelector('svg')!
    const lines = svg.querySelectorAll('line')
    expect(lines.length).toBeGreaterThan(0)
  })

  it('renders peak path elements', () => {
    renderCoa()
    const svg = document.querySelector('svg')!
    const paths = svg.querySelectorAll('path')
    expect(paths.length).toBeGreaterThanOrEqual(2)
  })

  it('renders grid lines for axes', () => {
    renderCoa()
    const svg = document.querySelector('svg')!
    const lines = svg.querySelectorAll('line')
    expect(lines.length).toBeGreaterThanOrEqual(9)
  })

  it('renders scanning line (two overlapping scan lines)', () => {
    renderCoa()
    const svg = document.querySelector('svg')!
    const circles = svg.querySelectorAll('circle')
    expect(circles.length).toBeGreaterThan(0)
  })

  it('updates RT label after record rotation', () => {
    renderCoa()
    advanceRecordRotation(5400)
    expect(screen.getByText('RT: 11.32')).toBeInTheDocument()
  })

  it('cleans up animation on unmount', () => {
    const { unmount } = renderCoa()
    const cancelSpy = jest.spyOn(globalThis, 'cancelAnimationFrame')
    unmount()
    expect(cancelSpy).toHaveBeenCalled()
    cancelSpy.mockRestore()
  })
})

describe('PdfDownloadButton', () => {
  it('renders the DOWNLOAD FULL PDF button', () => {
    renderCoa()
    expect(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ })).toBeInTheDocument()
  })

  it('shows generating state after click', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    const btn = screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ })
    await user.click(btn)
    expect(screen.getByText('GENERATING PDF...')).toBeInTheDocument()
    expect(btn).toBeDisabled()
  })

  it('calls jsPDF and saves a PDF file', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(jsPDF).toHaveBeenCalled()
    expect(mockSave).toHaveBeenCalledWith('COA-ACC-2026-8991X.pdf')
  })

  it('returns to normal state after PDF generation', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ })).not.toBeDisabled()
  })

  it('calls jsPDF with correct constructor options', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(jsPDF).toHaveBeenCalledWith({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })
  })

  it('draws certificate header in PDF', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockSetFillColor).toHaveBeenCalledWith(0, 24, 18)
    expect(mockText).toHaveBeenCalledWith('PREPEA PEPTIDE ANALYTICAL SERVICES', 20, 14)
  })

  it('draws certificate details section in PDF', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockText).toHaveBeenCalledWith('CERTIFICATE DETAILS', 23, 47.5)
  })

  it('draws analytical results table in PDF', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockText).toHaveBeenCalledWith('ANALYTICAL RESULTS', 23, expect.any(Number))
  })

  it('draws HPLC chromatogram section in PDF', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockText).toHaveBeenCalledWith('HPLC CHROMATOGRAM SUMMARY', 23, expect.any(Number))
  })

  it('draws peak triangle in chromatogram', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockTriangle).toHaveBeenCalled()
  })

  it('draws footer in PDF', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockText).toHaveBeenCalledWith(
      expect.stringContaining('Prepea Peptide Analytical Services'),
      expect.any(Number),
      expect.any(Number),
      expect.objectContaining({ align: 'center' }),
    )
  })

  it('includes record data in PDF details', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockText).toHaveBeenCalledWith('Accession Number:', 20, expect.any(Number))
    expect(mockText).toHaveBeenCalledWith('Tirzepatide Reference Standard', 62, expect.any(Number))
    expect(mockText).toHaveBeenCalledWith('TZP-882-LQ', 62, expect.any(Number))
    expect(mockText).toHaveBeenCalledWith('12 OCT 2026', 62, expect.any(Number))
  })

  it('draws metric results in PDF table', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockText).toHaveBeenCalledWith('PURITY (HPLC)', 23, expect.any(Number))
    expect(mockText).toHaveBeenCalledWith('99.8%', 72, expect.any(Number))
    expect(mockText).toHaveBeenCalledWith('MASS (LC-MS)', 23, expect.any(Number))
    expect(mockText).toHaveBeenCalledWith('NET CONTENT', 23, expect.any(Number))
  })

  it('draws disclaimer text in PDF', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockText).toHaveBeenCalledWith(
      'This certificate is issued under ISO 17025 accredited laboratory protocols.',
      20,
      expect.any(Number),
    )
  })

  it('generates PDF for rotated record', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    renderCoa()
    advanceRecordRotation(5400)
    await user.click(screen.getByRole('button', { name: /DOWNLOAD FULL PDF/ }))
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(mockSave).toHaveBeenCalledWith('COA-ACC-2026-7432K.pdf')
  })
})

describe('CoaLookup record rotation', () => {
  it('starts with the first record', () => {
    renderCoa()
    expect(screen.getByText('ACC-2026-8991X')).toBeInTheDocument()
    expect(screen.getByText('99.8%')).toBeInTheDocument()
  })

  it('applies fade-out class during rotation', () => {
    renderCoa()
    act(() => {
      jest.advanceTimersByTime(5000)
    })
    const certSection = screen.getByText('ACC-2026-8991X').closest('.transition-opacity')
    expect(certSection).toHaveClass('opacity-0')
  })

  it('applies opacity-100 after rotation completes', () => {
    renderCoa()
    advanceRecordRotation(5400)
    const certDiv = screen.getByText('ACC-2026-7432K').closest('.transition-opacity')
    expect(certDiv).toHaveClass('transition-opacity')
    expect(certDiv).toHaveClass('opacity-100')
  })

  it('rotates multiple times correctly', () => {
    renderCoa()
    advanceRecordRotation(5400)
    expect(screen.getByText('ACC-2026-7432K')).toBeInTheDocument()
    advanceRecordRotation(5400)
    expect(screen.getByText('ACC-2026-6105M')).toBeInTheDocument()
    advanceRecordRotation(5400)
    expect(screen.getByText('ACC-2026-5871N')).toBeInTheDocument()
  })

  it('wraps around after last record', () => {
    renderCoa()
    for (let i = 0; i < 7; i++) {
      advanceRecordRotation(5400)
    }
    expect(screen.getByText('ACC-2026-1563T')).toBeInTheDocument()
    advanceRecordRotation(5400)
    expect(screen.getByText('ACC-2026-8991X')).toBeInTheDocument()
  })

  it('cleans up interval on unmount', () => {
    const { unmount } = renderCoa()
    const clearSpy = jest.spyOn(globalThis, 'clearInterval')
    unmount()
    expect(clearSpy).toHaveBeenCalled()
    clearSpy.mockRestore()
  })
})

describe('generatePeakPath', () => {
  it('generates valid SVG path data', () => {
    renderCoa()
    const svg = document.querySelector('svg')!
    const paths = svg.querySelectorAll('path')
    const strokePath = Array.from(paths).find((p) => p.getAttribute('stroke') === '#001812')
    expect(strokePath).toBeInTheDocument()
    const d = strokePath!.getAttribute('d')
    expect(d).toContain('M 0')
    expect(d).toContain('C ')
    expect(d).toContain('L 1000')
  })
})

describe('generatePeakFill', () => {
  it('generates valid closed SVG path for fill', () => {
    renderCoa()
    const svg = document.querySelector('svg')!
    const paths = svg.querySelectorAll('path')
    const fillPath = Array.from(paths).find((p) =>
      p.getAttribute('fill')?.includes('rgba(214, 231, 213'),
    )
    expect(fillPath).toBeInTheDocument()
    const d = fillPath!.getAttribute('d')
    expect(d).toContain('Z')
  })
})
