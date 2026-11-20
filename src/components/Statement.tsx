import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { statement } from '../content/rooms'
import { useProximity } from '../hooks/useProximity'

function Line({ text, i }: { text: string; i: number }) {
  const ref = useProximity<HTMLParagraphElement>(300, 9)
  const side = i % 2 ? 'ml-auto mr-[14vw]' : 'ml-[10vw]'
  return (
    <p ref={ref} data-reveal className={`${side} max-w-[34rem] font-display text-xl leading-[2] text-[color-mix(in_srgb,#C2321F_calc(var(--near,0)*70%),#16130F)] sm:text-2xl`}>
      {text}
    </p>
  )
}

export default function Statement() {
  const root = useRef<HTMLElement>(null)
  const kanji = useProximity<HTMLParagraphElement>(500, 0)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)', opacity: 0.2 }, {
          clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 2.2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} data-room="statement" id="statement" className="relative overflow-hidden bg-paper py-[22vh] text-sumi">
      <p ref={kanji} aria-hidden className="pointer-events-none absolute -left-[4vw] top-[8vh] select-none font-kanji text-[46vw] leading-none text-[color-mix(in_srgb,#C2321F_calc(var(--near,0)*35%),rgba(22,19,15,.06))]">馬</p>
      <p className="vertical absolute right-[3vw] top-[14vh] font-brush text-lg text-sumi/70">Wall text - the curator</p>
      <h2 className="relative mb-[16vh] ml-[10vw] font-brush text-5xl sm:text-7xl">{statement.title}</h2>
      <div className="relative space-y-[18vh]">
        {statement.paragraphs.map((t, i) => <Line key={i} text={t} i={i} />)}
      </div>
      <p className="relative ml-[10vw] mt-[24vh] font-label text-xs text-ash">The first room opens below.</p>
    </section>
  )
}
