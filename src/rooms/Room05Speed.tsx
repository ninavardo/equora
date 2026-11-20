import { useEffect, useRef } from 'react'
import WallLabel from '../components/WallLabel'
import { labels } from '../content/labels'
import { useOnScreen } from '../hooks/useOnScreen'
import { HORSE } from '../lib/horse'

export default function Room05Speed() {
  const root = useRef<HTMLElement>(null), cv = useRef<HTMLCanvasElement>(null)
  const on = useOnScreen(root)
  useEffect(() => {
    if (!on) return
    const c = cv.current!, ctx = c.getContext('2d')!, path = new Path2D(HORSE), dpr = Math.min(devicePixelRatio, 2)
    let W = 0, H = 0, s = 1
    const resize = () => { W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); s = Math.min(W / 640, H / 380) * 0.95 }
    resize()
    const splats: { x: number; y: number; r: number; l: number }[] = []
    let last = scrollY, v = 0, ph = 0, raf = 0
    const frame = () => {
      v += (Math.min(Math.abs(scrollY - last), 90) - v) * 0.12; last = scrollY; ph += 0.05 + v * 0.02
      ctx.clearRect(0, 0, W, H)
      const ox = (W - 640 * s) / 2, oy = (H - 380 * s) / 2
      for (let i = 12; i >= 0; i--) {
        ctx.save()
        ctx.translate(ox - i * v * 2.2, oy + Math.sin(ph - i * 0.15) * (6 + v * 0.5)); ctx.scale(s, s); ctx.transform(1, 0, -Math.sin(ph - i * 0.15) * 0.05, 1, 0, 0)
        ctx.fillStyle = i ? `rgba(17,17,17,${0.1 * (1 - i / 13) + 0.02})` : '#111'; ctx.fill(path); ctx.restore()
      }
      ctx.strokeStyle = 'rgba(17,17,17,.22)'
      for (let k = 0; k < v / 3; k++) { const y = Math.random() * H, x = Math.random() * W; ctx.lineWidth = Math.random() * 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + v * 9, y); ctx.stroke() }
      if (v > 14 && splats.length < 120) splats.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 5 + 1, l: 1 })
      for (let i = splats.length - 1; i >= 0; i--) { const p = splats[i]; p.l -= 0.004; ctx.fillStyle = `rgba(17,17,17,${p.l * 0.6})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); if (p.l <= 0) splats.splice(i, 1) }
      raf = requestAnimationFrame(frame)
    }
    addEventListener('resize', resize); raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [on])
  return (
    <section ref={root} data-room="room-05" className="relative h-[260vh] bg-[#E6DFCF] font-speed text-[#111]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <p aria-hidden className="absolute -right-[2vw] top-[4vh] select-none text-[34vw] leading-none text-[#111]/[.07]">駿</p>
        <canvas ref={cv} className="absolute inset-0 h-full w-full" role="img" aria-label="A galloping horse smeared by its own speed" />
        <h2 className="vertical absolute left-[5vw] top-[12vh] text-4xl">Room 05 - Speed</h2>
        <p className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 font-label text-xs opacity-50">Scroll faster.</p>
        <WallLabel label={labels.room05} className="bottom-[10vh] left-[8vw]" />
      </div>
    </section>
  )
}
