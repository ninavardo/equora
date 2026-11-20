import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { labels } from '../content/labels'
import WallLabel from '../components/WallLabel'

const strokes = [
  'M150 170 C190 150 300 150 380 165 C410 172 420 190 400 205 C340 215 220 215 160 200 C135 192 135 178 150 170',
  'M380 165 C400 130 420 100 440 85 C455 75 475 80 490 95 C500 108 495 118 480 118 C465 120 455 125 445 140 C430 160 415 185 400 205',
  'M385 150 C375 120 395 95 420 80', 'M395 150 C392 125 405 105 425 90',
  'M370 205 C372 250 345 275 330 300', 'M390 205 C410 240 440 255 455 275',
  'M180 200 C170 240 185 275 160 305', 'M205 205 C225 240 255 250 275 285',
  'M150 172 C100 170 70 200 50 250 C80 220 110 205 140 190',
]

export default function Room01Freedom() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ps = gsap.utils.toArray<SVGPathElement>('[data-stroke]')
      ps.forEach((p) => { const l = p.getTotalLength(); gsap.set(p, { strokeDasharray: l, strokeDashoffset: l }) })
      const enso = root.current!.querySelector<SVGPathElement>('[data-enso]')!
      const el = enso.getTotalLength(); gsap.set(enso, { strokeDasharray: el, strokeDashoffset: el })
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 1.2 } })
        .to(ps, { strokeDashoffset: 0, stagger: 0.7, duration: 1, ease: 'none' }, 0)
        .to('[data-horse]', { x: '14vw', ease: 'none', duration: ps.length }, 0)
        .to('[data-mist]', { x: '-12vw', ease: 'none', duration: ps.length }, 0)
        .to(enso, { strokeDashoffset: 0, duration: 3, ease: 'none' }, ps.length * 0.7)
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} data-room="room-01" className="relative h-[420vh] bg-paper text-sumi">
      <div className="sticky top-0 h-screen overflow-hidden">
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-label="A horse painted in ink brush strokes">
          <defs>
            <filter id="ink"><feTurbulence baseFrequency=".035" numOctaves="3" seed="4" /><feDisplacementMap in="SourceGraphic" scale="6" /></filter>
            <radialGradient id="mist"><stop offset="0" stopColor="#16130F" stopOpacity=".16" /><stop offset="1" stopColor="#16130F" stopOpacity="0" /></radialGradient>
          </defs>
          <g data-mist><ellipse cx="300" cy="430" rx="420" ry="60" fill="url(#mist)" /><ellipse cx="760" cy="470" rx="380" ry="50" fill="url(#mist)" /></g>
          <path d="M80 430 C200 330 260 250 330 190 C380 240 430 330 520 380 C620 420 700 440 920 430" fill="none" stroke="#16130F" strokeWidth="3" opacity=".35" filter="url(#ink)" />
          <path data-enso d="M820 90 C770 84 735 128 745 172 C756 222 818 246 862 218 C900 194 898 130 866 104 C850 92 836 88 816 89" fill="none" stroke="#C2321F" strokeWidth="9" strokeLinecap="round" opacity=".8" filter="url(#ink)" />
          <g data-horse transform="translate(150 140) scale(1.25)" filter="url(#ink)" fill="none" stroke="#16130F" strokeLinecap="round" strokeLinejoin="round">
            {strokes.map((d, i) => <path key={i} data-stroke d={d} strokeWidth={i < 2 ? 11 : 6} />)}
          </g>
          <path d="M60 520 C300 505 600 535 940 515" stroke="#16130F" strokeWidth="2" fill="none" opacity=".25" filter="url(#ink)" />
        </svg>
        <p aria-hidden className="vertical absolute right-[4vw] top-[10vh] font-kanji text-7xl text-sumi/10">自由</p>
        <h2 className="vertical absolute left-[5vw] top-[12vh] font-brush text-3xl">Room 01 - Freedom</h2>
        <WallLabel label={labels.room01} className="bottom-[12vh] right-[8vw]" />
      </div>
    </section>
  )
}
