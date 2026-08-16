import { useEffect, useState } from 'react'

/**
 * Tracks whether the page has been scrolled past `offset` pixels — used to
 * give the fixed navbar a "collapsed" state.
 */
export function useScrolled(offset = 16) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}
