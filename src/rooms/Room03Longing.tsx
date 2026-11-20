import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { labels } from '../content/labels'
import WallLabel from '../components/WallLabel'

const LINE = 'M60 240 C100 190 120 175 160 172 C230 160 320 158 380 168 C400 130 425 95 445 82 C470 70 495 90 492 110 C470 118 455 130 445 148 C430 170 412 195 400 208 C412 245 440 260 458 280 L400 208 C340 218 230 218 182 205 C175 245 190 280 165 308 L182 205 C215 245 255 250 280 288 L400 208 C372 250 350 275 332 302'

export default function Room03Longing() {
  const root = useRef<HTMLElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const guide = useRef<SVGPathElement>(null)
  const drawn = useRef<SVGPathElement>(null)
  const dot = useRef<SVGCircleElement>(null)
  const horse = useRef<SVGGElement>(null)
  const p = useRef(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const g = guide.current!, d = drawn.current!, s = svg.current!, sec = root.current!
    const L = g.getTotalLength()
    d.style.strokeDasharray = `${L}`; d.style.strokeDashoffset = `${L}`
    const place = () => { const q = g.getPointAtLength(p.current); dot.current?.setAttribute('cx', `${q.x}`); dot.current?.setAttribute('cy', `${q.y}`) }
    place()
    const move = (e: PointerEvent) => {
      if (p.current >= L - 1) return
      const m = s.getScreenCTM()!.inverse(), pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m)
      let guard = 0
      while (p.current < L && guard++ < 40) {
        const n = g.getPointAtLength(Math.min(L, p.current + 5))
        if (Math.hypot(n.x - pt.x, n.y - pt.y) < 38) p.current = Math.min(L, p.current + 5); else break
      }
      d.style.strokeDashoffset = `${L - p.current}`; place()
      if (p.current >= L - 1) {
        setDone(true)
        gsap.timeline({ delay: 0.8 }).to(horse.current, { x: '130vw', duration: 3.2, ease: 'power2.in' })
      }
    }
    sec.addEventListener('pointermove', move)
    return () => { sec.removeEventListener('pointermove', move); gsap.killTweensOf(horse.current) }
  }, [])

  const again = () => {
    p.current = 0; setDone(false)
    gsap.set(horse.current, { x: 0 })
    const d = drawn.current!; d.style.strokeDashoffset = `${d.getTotalLength()}`
    const q = guide.current!.getPointAtLength(0); dot.current?.setAttribute('cx', `${q.x}`); dot.current?.setAttribute('cy', `${q.y}`)
  }
  return (
    <section ref={root} data-room="room-03" className="relative flex h-screen items-center overflow-hidden bg-[#F1E8D2] font-longing text-sumi">
      <svg ref={svg} viewBox="0 0 600 360" className="mx-auto w-[88vw] max-w-4xl touch-none" aria-label="A horse drawn with a single line">
        <g ref={horse}>
          <path ref={guide} d={LINE} fill="none" stroke="#16130F" strokeWidth=".6" strokeDasharray="1 7" opacity=".28" />
          <path ref={drawn} d={LINE} fill="none" stroke="#16130F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {!done && <circle ref={dot} r="5" fill="none" stroke="#C2321F" strokeWidth="1.2" />}
      </svg>
      <h2 className="vertical absolute left-[5vw] top-[12vh] text-2xl">Room 03 - Longing</h2>
      <p className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 text-sm opacity-60">{done ? 'It was waiting to be seen.' : 'Follow the red circle.'}</p>
      {done && <button onClick={again} className="focus-ring absolute bottom-[5vh] left-1/2 -translate-x-1/2 font-label text-xs underline decoration-seal underline-offset-4">Draw it again</button>}
      <WallLabel label={labels.room03} className="right-[8vw] top-[14vh]" />
    </section>
  )
}
