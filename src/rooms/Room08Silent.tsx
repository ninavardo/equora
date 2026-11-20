import { useEffect, useRef } from 'react'
import { useOnScreen } from '../hooks/useOnScreen'
import { HORSE } from '../lib/horse'

const sm = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }

export default function Room08Silent() {
  const root = useRef<HTMLElement>(null), cv = useRef<HTMLCanvasElement>(null)
  const on = useOnScreen(root)
  useEffect(() => {
    if (!on) return
    const c = cv.current!, ctx = c.getContext('2d')!, path = new Path2D(HORSE), dpr = Math.min(devicePixelRatio, 2)
    const pts: { x: number; y: number; a: number; r: number }[] = []
    while (pts.length < 520) { const x = 40 + Math.random() * 470, y = 70 + Math.random() * 245; if (ctx.isPointInPath(path, x, y)) pts.push({ x, y, a: Math.random() * 6.28, r: Math.random() }) }
    let W = 0, H = 0, s = 1, raf = 0
    const resize = () => { W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); s = Math.min(W / 640, H / 380) * 0.9 }
    resize()
    const frame = (t: number) => {
      const rect = root.current!.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - innerHeight)))
      const st = sm(0.25, 0.45, p), sm2 = sm(0.6, 0.85, p)
      const ox = (W - 640 * s) / 2, oy = (H - 380 * s) / 2 + Math.sin(t / 260) * 4 * (1 - st)
      ctx.clearRect(0, 0, W, H)
      if (st < 1) { ctx.save(); ctx.translate(ox, oy); ctx.scale(s, s); ctx.globalAlpha = 1 - st; ctx.fillStyle = '#e9e1ce'; ctx.fill(path); ctx.restore() }
      if (st > 0) pts.forEach((q) => {
        const x = ox + (q.x + Math.cos(q.a) * 60 * st * q.r + Math.sin(t / 2000 + q.a) * 30 * sm2) * s
        const y = oy + (q.y + Math.sin(q.a) * 60 * st * q.r - sm2 * (80 + q.r * 180)) * s
        const red = sm2
        ctx.globalAlpha = st * (0.45 + 0.55 * Math.sin(t / 500 + q.a) ** 2) * (1 - sm2 * 0.3)
        ctx.fillStyle = `rgb(${233 - 39 * red},${225 - 175 * red},${206 - 175 * red})`
        ctx.beginPath(); ctx.arc(x, y, (1 + q.r * 1.4) * (1 + sm2 * 3), 0, 6.283); ctx.fill()
      })
      ctx.globalAlpha = 1; raf = requestAnimationFrame(frame)
    }
    addEventListener('resize', resize); raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [on])
  return (
    <section ref={root} data-room="room-08" className="relative h-[380vh] bg-black" aria-label="The Silent Room">
      <div className="sticky top-0 h-screen"><canvas ref={cv} className="h-full w-full" role="img" aria-label="A horse running in darkness, becoming stars, smoke and red light" /></div>
    </section>
  )
}
