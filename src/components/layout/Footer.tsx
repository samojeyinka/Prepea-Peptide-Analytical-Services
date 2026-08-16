import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from '../../data/nav'
import { IMAGES, SITE } from '../../data/site'

export function Footer() {
  return (
    <footer className="relative w-full border-t border-outline-variant bg-primary-container text-on-primary">
      <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter px-5 py-24 md:grid-cols-4 md:px-margin-edge md:py-32">
        <div className="md:col-span-1">
          <div className="mb-6 flex h-10 items-center">
            <img
              src={IMAGES.logo}
              alt="Peptide Analytics Logo"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="mb-6 mt-4 max-w-md font-body-md text-body-md text-on-primary opacity-80">
            {SITE.tagline}
          </p>
          <p className="font-label-caps text-label-caps text-on-primary opacity-60">
            © 2026 Peptide Analytical Services.
          </p>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.heading} className="flex flex-col gap-4">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-inverse-primary">
              {group.heading}
            </span>
            {group.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-body-md text-body-md text-on-primary transition-all duration-300 hover:text-inverse-primary hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t border-primary-fixed/20">
        <p className="mx-auto max-w-container-max px-5 py-8 font-label-caps text-label-caps text-on-primary opacity-60 md:px-margin-edge">
          {SITE.copyright}
        </p>
      </div>
    </footer>
  )
}
