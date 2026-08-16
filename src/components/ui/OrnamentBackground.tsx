import { IMAGES } from '../../data/site'

/**
 * Fixed, faint lab-photography collage behind the page content. Pure
 * decoration — never intercepts pointer events.
 */
export function OrnamentBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <img
        src={IMAGES.decor.a}
        alt=""
        className="absolute -left-24 top-[10%] w-[520px] max-w-none -rotate-12 opacity-[0.06] grayscale"
      />
      <img
        src={IMAGES.decor.b}
        alt=""
        className="absolute -right-32 top-[42%] w-[620px] max-w-none rotate-45 opacity-[0.05] grayscale"
      />
      <img
        src={IMAGES.decor.c}
        alt=""
        className="absolute bottom-[6%] left-[12%] w-[460px] max-w-none rotate-180 opacity-[0.05] grayscale"
      />
    </div>
  )
}
