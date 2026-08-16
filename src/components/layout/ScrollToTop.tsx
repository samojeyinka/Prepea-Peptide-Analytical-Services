import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Resets scroll position to the top on every route change. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
