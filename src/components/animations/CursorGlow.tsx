import { useEffect, useRef } from 'react'

/**
 * A soft radial "aura" that trails the cursor with a spring-like easing.
 * Rendered only on devices with a fine pointer and disabled for users who
 * prefer reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    let raf = 0

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX
      targetY = event.clientY
    }

    const tick = () => {
      x += (targetX - x) * 0.09
      y += (targetY - y) * 0.09
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = window.requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[520px] w-[520px] rounded-full opacity-[0.16] mix-blend-multiply md:block"
      style={{
        background:
          'radial-gradient(circle, rgba(42, 82, 66, 0.9) 0%, rgba(229, 224, 216, 0.5) 40%, transparent 70%)',
      }}
    />
  )
}
