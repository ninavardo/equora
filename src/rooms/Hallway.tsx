import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

export default function Hallway() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-frag]').forEach((el) =>
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } }))
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} data-room="hallway" className="relative min-h-[140vh] bg-paper text-sumi">
      <p data-frag className="vertical absolute left-[12vw] top-[12vh] font-kanji text-[18vw] leading-none">馬到成功</p>
      <p data-frag className="absolute left-[44vw] top-[34vh] max-w-xs text-lg leading-loose">Success arrives with the horse.</p>
      <p data-frag className="absolute right-[10vw] top-[62vh] max-w-xs text-lg leading-loose">Seventh of the twelve animals of the zodiac.</p>
      <p data-frag className="absolute left-[30vw] top-[100vh] max-w-xs font-label text-xs text-ash">In the Year of the Horse, the calendar itself leans forward - a season for beginnings that refuse to stand still.</p>
      <p aria-hidden className="vertical absolute right-[4vw] top-[10vh] font-brush text-lg text-sumi/60">Hallway - Symbolism</p>
    </section>
  )
}
