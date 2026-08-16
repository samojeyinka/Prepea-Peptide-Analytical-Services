import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS, REQUEST_TESTING_PATH } from '../../data/nav'
import { IMAGES } from '../../data/site'
import { useScrolled } from '../../hooks/useScrolled'
import { MaterialIcon } from '../ui/MaterialIcon'

function linkClasses({ isActive }: { isActive: boolean }) {
  return [
    'font-label-caps text-label-caps transition-all duration-200',
    isActive
      ? 'border-b-2 border-primary pb-1 text-primary'
      : 'text-on-surface-variant hover:text-primary',
  ].join(' ')
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled(24)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-b bg-surface transition-all duration-300 ${
        scrolled ? 'border-outline-variant shadow-sm' : 'border-outline-variant/70'
      }`}
    >
      <div className="mx-auto flex w-full max-w-container-max items-center justify-between px-5 py-4 md:px-margin-edge">
        <Link to="/" className="flex h-10 items-center" aria-label="Peptide Analytics home">
          <img src={IMAGES.logo} alt="Peptide Analytics Logo" className="h-10 w-auto object-contain" />
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to={REQUEST_TESTING_PATH}
            className="inline-block bg-primary px-6 py-3 font-cta text-cta text-on-primary transition-colors duration-300 hover:bg-secondary"
            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
          >
            Request Testing
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center text-primary md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <MaterialIcon name={menuOpen ? 'close' : 'menu'} size={28} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`grid overflow-hidden border-outline-variant transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          menuOpen ? 'border-t' : ''
        }`}
        style={{ gridTemplateRows: menuOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-2 py-3 font-label-caps text-label-caps uppercase tracking-widest transition-colors ${
                    isActive ? 'bg-sand-accent text-primary' : 'text-on-surface-variant hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to={REQUEST_TESTING_PATH}
              className="mt-3 bg-primary px-6 py-3 text-center font-cta text-cta text-on-primary"
              style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
            >
              Request Testing
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
