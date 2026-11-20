import { useEffect, useRef } from 'react'
import WallLabel from '../components/WallLabel'
import { labels } from '../content/labels'
import { useOnScreen } from '../hooks/useOnScreen'
import { HORSE } from '../lib/horse'

export default function Room04Nobility() {
  const root = useRef<HTMLElement>(null), tilt = useRef<HTMLDivElement>(null), cv = useRef<HTMLCanvasElement>(null)
  const on = useOnScreen(root)
  useEffect(() => {
    const el = root.current!, t = tilt.current!
    if (matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      t.style.transform = `rotateX(${(((e.clientY - r.top) / r.height - 0.5) * -12).toFixed(1)}deg) rotateY(${(((e.clientX - r.left) / r.width - 0.5) * 30).toFixed(1)}deg)`
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [])
  useEffect(() => {
    if (!on) return
    const c = cv.current!, ctx = c.getContext('2d')!
    const W = (c.width = c.clientWidth), H = (c.height = c.clientHeight)
    const d = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4, p: Math.random() * 6.28 }))
    let raf = 0
    const frame = (n: number) => {
      ctx.clearRect(0, 0, W, H)
      d.forEach((q) => {
        const x = (q.x * 0.3 + 0.35) * W + Math.sin(n / 3000 + q.p) * 20, y = ((q.y + n / 90000) % 1) * H
        ctx.fillStyle = `rgba(255,226,160,${0.25 + 0.35 * Math.sin(n / 900 + q.p) ** 2})`
        ctx.beginPath(); ctx.arc(x, y, q.r, 0, 6.283); ctx.fill()
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [on])
  return (
    <section ref={root} data-room="room-04" className="relative h-screen overflow-hidden bg-[#1a1710] text-[#f0e2bd] perspective-[900px]">
      <div aria-hidden className="absolute left-[32%] top-0 h-full w-[40%] mix-blend-screen bg-[linear-gradient(rgba(255,226,160,.3),rgba(255,226,160,0))] [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)]" />
      <canvas ref={cv} aria-hidden className="absolute inset-0 h-full w-full" />
      <div ref={tilt} className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-ink [transform-style:preserve-3d]">
        <svg viewBox="0 0 640 400" className="w-[78vw] max-w-4xl" role="img" aria-label="A glazed Tang-style ceramic horse on a plinth">
          <defs><linearGradient id="glaze" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d9a441" /><stop offset=".55" stopColor="#6f9c84" /><stop offset="1" stopColor="#a8651f" /></linearGradient></defs>
          <rect x="120" y="318" width="400" height="26" fill="#3a2d18" /><rect x="110" y="344" width="420" height="10" fill="#2a2010" />
          <path d={HORSE} fill="url(#glaze)" stroke="#3b2a10" strokeWidth="3" strokeLinejoin="round" />
          <path d={HORSE} fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="2" transform="translate(-4 -4)" />
        </svg>
      </div>
      <h2 className="vertical absolute left-[5vw] top-[12vh] font-brush text-3xl">Room 04 - Nobility</h2>
      <p aria-hidden className="vertical absolute right-[4vw] top-[12vh] font-kanji text-7xl text-[#d9a441]/20">駿</p>
      <WallLabel label={labels.room04} className="bottom-[10vh] right-[8vw]" />
    </section>
  )
}
