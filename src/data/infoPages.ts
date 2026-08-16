export type InfoSection = {
  heading: string
  paragraphs: ReadonlyArray<string>
  list?: ReadonlyArray<string>
}

export type InfoPageContent = {
  slug: string
  eyebrow: string
  title: string
  intro: string
  sections: ReadonlyArray<InfoSection>
}

export const INFO_PAGES: ReadonlyArray<InfoPageContent> = [
  {
    slug: 'terms',
    eyebrow: 'Legal',
    title: 'Terms of Service',
    intro:
      'The following terms govern your use of the Peptide Analytical Services website, testing services, and reporting tools.',
    sections: [
      {
        heading: 'Scope of Services',
        paragraphs: [
          'Peptide Analytical Services provides independent analytical testing for research use only. Certificates of Analysis and all associated data are generated from the submitted sample and reflect the analytical methods disclosed on the certificate.',
          'Nothing on this website or in any report constitutes medical, clinical, or regulatory advice, and no content may be used to support human consumption, dosing, or therapeutic decisions.',
        ],
      },
      {
        heading: 'Acceptance of Terms',
        paragraphs: [
          'By accessing the website, submitting a sample, or using the COA Lookup tool, you agree to be bound by these terms. If you do not agree, please discontinue use of the services.',
        ],
      },
      {
        heading: 'Research Use Only',
        paragraphs: [
          'All materials submitted for testing must be for legitimate research applications. You confirm that you have the legal right to possess and ship the material, and that the material is not intended for human or animal consumption.',
        ],
        list: [
          'Results are provided "as is" without any warranty of merchantability or fitness for a particular purpose.',
          'Our liability is limited to the fees paid for the specific analysis in question.',
          'You are responsible for complying with all applicable laws governing shipment of your material.',
        ],
      },
      {
        heading: 'Intellectual Property',
        paragraphs: [
          'All content on this site, including text, graphics, logos, and methodology descriptions, is the property of Peptide Analytical Services and may not be reproduced without prior written consent.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions about these terms may be directed to our lab coordinators through the contact page.',
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    intro:
      'We collect only the information required to perform analyses and verify certificates. This policy explains what we collect, why, and how it is protected.',
    sections: [
      {
        heading: 'Information We Collect',
        paragraphs: [
          'We collect contact details (name, email), material descriptions, batch numbers, and optional notes provided through the request and contact forms. The COA Lookup tool collects the accession numbers you enter to look up results.',
        ],
      },
      {
        heading: 'How We Use Information',
        paragraphs: [
          'Submitted information is used to process analysis requests, issue certificates, index records for verification, and respond to inquiries. We do not sell or rent personal information to third parties.',
        ],
      },
      {
        heading: 'Certificate Records',
        paragraphs: [
          'Certificates are stored in a secure, indexed database. Requesting entities may be redacted per NDA at your request, but analytical data remains part of the public verification record associated with the accession number.',
        ],
      },
      {
        heading: 'Data Security',
        paragraphs: [
          'We apply industry-standard administrative, technical, and physical safeguards, including access controls and encrypted transport, to protect your information from unauthorized access.',
        ],
      },
      {
        heading: 'Your Rights',
        paragraphs: [
          'You may request access to, correction of, or deletion of your personal information by contacting us. We will honor verified requests within a reasonable time, subject to record-retention obligations.',
        ],
      },
    ],
  },
  {
    slug: 'methodology',
    eyebrow: 'Science',
    title: 'Analytical Methodology',
    intro:
      'A transparent look at the instrument platforms and methods behind every Certificate of Analysis we issue.',
    sections: [
      {
        heading: 'Reversed-Phase HPLC (RP-HPLC)',
        paragraphs: [
          'Separation is performed on an octadecyl carbon chain (C18) bonded silica stationary phase. A gradient elution of water and acetonitrile, both modified with 0.1% TFA, resolves the target peptide from synthesis-related impurities.',
          'Purity is reported as area percent, with peak identification and integration parameters documented on the certificate.',
        ],
      },
      {
        heading: 'LC-MS Confirmation',
        paragraphs: [
          'Liquid chromatography is coupled to electrospray ionization (ESI) mass spectrometry. The mass-to-charge ratio (m/z) of the intact peptide is measured on quadrupole or time-of-flight (TOF) analyzers to confirm exact molecular weight.',
          'Isotopic distribution analysis provides a secondary check on the elemental composition of the target species.',
        ],
      },
      {
        heading: 'Calibration & Standards',
        paragraphs: [
          'Quantitative results are anchored to NIST-traceable reference standards, and the system is calibrated daily with bracketing standards to maintain accuracy and precision across runs.',
        ],
      },
      {
        heading: 'Reporting',
        paragraphs: [
          'Every certificate includes the raw chromatogram and spectrum, method parameters, integration summaries, and an overall conformity statement. Raw data visualizations are provided so results can be independently reviewed.',
        ],
      },
    ],
  },
  {
    slug: 'compliance',
    eyebrow: 'Science',
    title: 'Compliance & Standards',
    intro:
      'We hold our laboratory to rigorous quality standards while remaining structurally independent from material manufacturers and distributors.',
    sections: [
      {
        heading: 'Independence',
        paragraphs: [
          'Peptide Analytical Services is not affiliated with any manufacturer, distributor, or research sponsor. This independence guarantees that reported results reflect the sample and method alone, free of commercial influence.',
        ],
      },
      {
        heading: 'Quality Management',
        paragraphs: [
          'Our methods are developed and validated under a documented quality system, including periodic re-validation, analyst proficiency checks, and instrument performance verification.',
        ],
      },
      {
        heading: 'Traceability',
        paragraphs: [
          'Each sample carries a unique accession number and chain-of-custody record, ensuring that every result can be traced from intake through analysis to the final certificate.',
        ],
      },
      {
        heading: 'Research-Use Limitations',
        paragraphs: [
          'All testing is performed strictly for research applications. Results are not intended, and may not be used, for clinical, diagnostic, or regulatory purposes.',
        ],
      },
    ],
  },
]
