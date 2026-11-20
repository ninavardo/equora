import { useEffect, useRef } from 'react'

export function useProximity<T extends HTMLElement>(radius = 260, push = 10) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    let raf = 0, mx = -9999, my = -9999, near = 0, tx = 0, ty = 0
    const move = (e: PointerEvent) => { mx = e.clientX; my = e.clientY }
    const tick = () => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      const dx = cx - mx, dy = cy - my, d = Math.hypot(dx, dy) || 1
      const target = Math.max(0, 1 - d / (radius + r.width / 3))
      near += (target - near) * 0.08
      tx += (dx / d * push * near - tx) * 0.08
      ty += (dy / d * push * near - ty) * 0.08
      el.style.setProperty('--near', near.toFixed(3))
      if (push) el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    addEventListener('pointermove', move, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [radius, push])
  return ref
}
