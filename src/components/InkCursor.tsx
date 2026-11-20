import { useEffect, useRef } from 'react'

export default function InkCursor() {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = canvas.current
    if (!c || matchMedia('(pointer: coarse)').matches) return
    const ctx = c.getContext('2d')!
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(devicePixelRatio, 2)
    const resize = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }
    resize()
    const pts: { x: number; y: number; t: number }[] = []
    let mx = -50, my = -50, x = -50, y = -50, raf = 0, down = false
    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY }
    const frame = (now: number) => {
      x += (mx - x) * 0.28; y += (my - y) * 0.28
      if (!calm) pts.push({ x, y, t: now })
      while (pts.length && now - pts[0].t > 900) pts.shift()
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      ctx.fillStyle = '#C2321F'
      pts.forEach((p, i) => {
        const age = (now - p.t) / 900
        ctx.globalAlpha = (1 - age) * 0.6
        ctx.beginPath(); ctx.arc(p.x, p.y, (down ? 5 : 3.2) * (1 - age) * (i % 2 ? 1 : 0.8), 0, 6.283); ctx.fill()
      })
      ctx.globalAlpha = 1
      ctx.beginPath(); ctx.arc(x, y, down ? 7 : 4.5, 0, 6.283); ctx.fill()
      raf = requestAnimationFrame(frame)
    }
    const dn = () => (down = true), up = () => (down = false)
    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerdown', dn); addEventListener('pointerup', up); addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('pointermove', move); removeEventListener('pointerdown', dn)
      removeEventListener('pointerup', up); removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={canvas} aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden h-full w-full [@media(pointer:fine)]:block" />
}
