import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

export default function Threshold({ from, to, variant }: { from: string; to: string; variant: 'ink' | 'shoji' }) {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1 } })
      if (variant === 'ink') tl.fromTo('[data-flood]', { clipPath: 'circle(0% at 50% 55%)' }, { clipPath: 'circle(78% at 50% 55%)', ease: 'power1.in' })
      else tl.fromTo('[data-l]', { xPercent: 0 }, { xPercent: -101, ease: 'power2.inOut' }, 0).fromTo('[data-r]', { xPercent: 0 }, { xPercent: 101, ease: 'power2.inOut' }, 0)
    }, root)
    return () => ctx.revert()
  }, [variant])
  const lattice = 'bg-[#E7DFC9] bg-[length:64px_64px] bg-[image:repeating-linear-gradient(90deg,transparent_0_62px,rgba(22,19,15,.55)_62px_64px),repeating-linear-gradient(0deg,transparent_0_62px,rgba(22,19,15,.55)_62px_64px)]'
  return (
    <section ref={root} aria-hidden className="relative h-[150vh]">
      <div className={`sticky top-0 h-screen overflow-hidden ${variant === 'ink' ? from : to}`}>
        {variant === 'ink' && <div data-flood className={`absolute inset-0 ${to}`} />}
        {variant === 'shoji' && <>
          <div data-l className={`absolute inset-y-0 left-0 w-1/2 ${lattice}`} />
          <div data-r className={`absolute inset-y-0 right-0 w-1/2 ${lattice}`} />
        </>}
      </div>
    </section>
  )
}
