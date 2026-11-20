import { useEffect, useRef } from 'react'
import WallLabel from '../components/WallLabel'
import { labels } from '../content/labels'
import { useOnScreen } from '../hooks/useOnScreen'
import { HORSE } from '../lib/horse'

interface P { x: number; y: number; vx: number; vy: number; l: number; k: 0 | 1 | 2 }

export default function Room02Power() {
  const root = useRef<HTMLElement>(null), cv = useRef<HTMLCanvasElement>(null)
  const on = useOnScreen(root)
  useEffect(() => {
    if (!on) return
    const c = cv.current!, ctx = c.getContext('2d')!, path = new Path2D(HORSE), dpr = Math.min(devicePixelRatio, 2)
    let W = 0, H = 0, s = 1
    const resize = () => { W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); s = Math.min(W / 640, H / 380) * 1.1 }
    resize()
    const ps: P[] = []
    let mx = W * 0.7, my = H * 0.3, raf = 0, shake = 0, last = 0
    const move = (e: PointerEvent) => { const r = c.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top }
    const dot = (x: number, y: number, r: number) => { ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill() }
    const frame = (t: number) => {
      const ph = t / 1900, bob = Math.sin(ph * 2) * 8
      if (Math.sin(ph * 2) < -0.985 && t - last > 800) { shake = 1; last = t }
      shake *= 0.93
      const ox = (W - 640 * s) / 2, oy = (H - 380 * s) / 2 + bob * s * 0.4, floor = oy + 312 * s
      ctx.clearRect(0, 0, W, H); ctx.save()
      ctx.translate((Math.random() - 0.5) * shake * 7, (Math.random() - 0.5) * shake * 7)
      const g = ctx.createLinearGradient(0, floor - 40, 0, H); g.addColorStop(0, 'rgba(122,40,20,0)'); g.addColorStop(1, 'rgba(122,40,20,.35)')
      ctx.fillStyle = g; ctx.fillRect(0, floor - 40, W, H)
      ctx.save(); ctx.translate(ox, oy); ctx.scale(s, s); ctx.rotate(Math.sin(ph) * 0.012)
      ctx.fillStyle = '#0a0504'; ctx.fill(path); ctx.lineWidth = 2; ctx.strokeStyle = '#8a4a22'; ctx.stroke(path); ctx.restore()
      if (ps.length < 400) {
        if (Math.random() < 0.18) ps.push({ x: ox + (190 + Math.random() * 190) * s, y: oy + (175 + Math.random() * 25) * s, vx: 0, vy: 0.2, l: 1, k: 0 })
        if (Math.random() < 0.25) ps.push({ x: ox + 488 * s, y: oy + 112 * s, vx: 0.5 + Math.random() * 0.4, vy: -0.15, l: 1, k: 1 })
      }
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        if (p.k === 0) {
          p.vy += 0.12; p.y += p.vy
          if (p.y > floor) { for (let j = 0; j < 4; j++) ps.push({ x: p.x, y: floor, vx: (Math.random() - 0.5) * 2.4, vy: -Math.random() * 2.2, l: 0.8, k: 2 }); ps.splice(i, 1); continue }
          ctx.fillStyle = '#b01c10'; dot(p.x, p.y, 2.4)
        } else if (p.k === 1) {
          p.vx += (mx - p.x) * 0.00018; p.vy += (my - p.y) * 0.00008; p.x += p.vx; p.y += p.vy; p.l -= 0.006
          ctx.fillStyle = `rgba(210,190,170,${Math.max(0, p.l) * 0.2})`; dot(p.x, p.y, 8 * (2 - p.l))
          if (p.l <= 0) ps.splice(i, 1)
        } else {
          p.vy += 0.12; p.x += p.vx; p.y += p.vy; p.l -= 0.03
          ctx.fillStyle = `rgba(176,28,16,${Math.max(0, p.l)})`; dot(p.x, p.y, 1.6)
          if (p.l <= 0) ps.splice(i, 1)
        }
      }
      ctx.restore(); raf = requestAnimationFrame(frame)
    }
    addEventListener('pointermove', move, { passive: true }); addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); removeEventListener('resize', resize) }
  }, [on])
  return (
    <section ref={root} data-room="room-02" className="relative h-screen overflow-hidden bg-[#140805] text-[#e7d3b8]">
      <canvas ref={cv} className="absolute inset-0 h-full w-full" role="img" aria-label="A monumental dark horse in slow motion, red sweat falling" />
      <p aria-hidden className="vertical absolute right-[4vw] top-[10vh] font-kanji text-7xl text-[#b01c10]/25">汗血</p>
      <h2 className="vertical absolute left-[5vw] top-[12vh] font-brush text-3xl">Room 02 - Power</h2>
      <WallLabel label={labels.room02} className="bottom-[10vh] left-[8vw]" />
    </section>
  )
}
