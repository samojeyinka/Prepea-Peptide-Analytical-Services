export type NavLink = {
  label: string
  to: string
}

export const NAV_LINKS: ReadonlyArray<NavLink> = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'FAQ', to: '/faq' },
  { label: 'COA Lookup', to: '/coa-lookup' },
]

export const REQUEST_TESTING_PATH = '/request-testing'

export const FOOTER_LINKS: ReadonlyArray<{
  heading: string
  links: ReadonlyArray<NavLink>
}> = [
  {
    heading: 'Resources',
    links: [
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Methodology', to: '/methodology' },
    ],
  },
  {
    heading: 'Science',
    links: [
      { label: 'Compliance', to: '/compliance' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Request Testing', to: REQUEST_TESTING_PATH },
      { label: 'COA Lookup', to: '/coa-lookup' },
    ],
  },
]
