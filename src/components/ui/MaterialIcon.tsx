import type { CSSProperties } from 'react'

type MaterialIconProps = {
  name: string
  filled?: boolean
  /** Font size in px (overrides the 24px default). */
  size?: number
  className?: string
  weight?: number
}

/** Renders a Google Material Symbol glyph. */
export function MaterialIcon({
  name,
  filled = false,
  size,
  className = '',
  weight = 400,
}: MaterialIconProps) {
  const style: CSSProperties = {
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
  }
  if (size) style.fontSize = `${size}px`

  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
