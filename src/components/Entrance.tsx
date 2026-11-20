import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { YEAR } from '../content/rooms'
import { useGallery } from '../store/useGallery'
import Seal from './Seal'

export default function Entrance({ onEnter }: { onEnter: () => void }) {
  const enso = useRef<SVGPathElement>(null)
  const enter = useGallery((s) => s.enter)
  useEffect(() => {
    const p = enso.current
    if (!p) return
    const len = p.getTotalLength()
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
    const t = gsap.to(p, { strokeDashoffset: 0, duration: 5, delay: 1.2, ease: 'power1.inOut' })
    return () => { t.kill() }
  }, [])
  const go = () => { enter(); onEnter() }
  return (
    <section data-room="entrance" className="relative flex min-h-screen items-center bg-[#0c0a08] px-[8vw] text-paper">
      <svg aria-hidden viewBox="0 0 200 200" className="absolute right-[6vw] top-[10vh] h-[62vh] w-auto opacity-80">
        <path ref={enso} d="M101 24 C 52 18, 20 64, 30 108 C 40 160, 100 182, 146 156 C 186 132, 184 70, 150 46 C 134 34, 118 30, 96 31"
          fill="none" stroke="#E9E1CE" strokeWidth="7" strokeLinecap="round" opacity=".85" />
      </svg>
      <p aria-hidden className="vertical absolute right-[3vw] top-[12vh] font-kanji text-6xl text-paper/10">馬</p>
      <div className="relative z-10 max-w-xl">
        <p className="animate-rise font-brush text-3xl leading-snug opacity-0 [animation-delay:1s] sm:text-5xl">
          Somewhere, something<br />is already running.
        </p>
        <button onClick={go} aria-label="Enter the exhibition"
          className="focus-ring relative mt-16 block -rotate-2 animate-rise bg-paper px-7 py-5 text-left text-sumi opacity-0 shadow-[4px_5px_0_rgba(194,50,31,.55)] [animation-delay:3.2s]">
          <span className="font-label text-[11px] text-ash">Admit one</span>
          <span className="block font-display text-2xl">equora</span>
          <span className="font-label text-[11px] text-ash">{YEAR} · scroll or click to enter</span>
          <span className="absolute -right-4 -top-4"><Seal size={44} tilt={9} /></span>
        </button>
      </div>
    </section>
  )
}
