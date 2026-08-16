import { Outlet } from 'react-router-dom'
import { CursorGlow } from '../animations/CursorGlow'
import { OrnamentBackground } from '../ui/OrnamentBackground'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'

/**
 * Global chrome: fixed navbar, faint background texture, cursor aura and
 * footer. Page content flows through the routed <Outlet />.
 */
export function Layout() {
  return (
    <>
      <ScrollToTop />
      <CursorGlow />
      <OrnamentBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
