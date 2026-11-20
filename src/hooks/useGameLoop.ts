import { useEffect, useRef } from 'react'

export function useGameLoop(active: boolean, step: () => void, draw: (t: number) => void) {
  const s = useRef(step), d = useRef(draw)
  s.current = step; d.current = draw
  useEffect(() => {
    if (!active) return
    const dt = 1000 / 60
    let raf = 0, last = performance.now(), acc = 0
    const f = (now: number) => {
      acc += Math.min(100, now - last); last = now
      while (acc >= dt) { s.current(); acc -= dt }
      d.current(now); raf = requestAnimationFrame(f)
    }
    raf = requestAnimationFrame(f)
    return () => cancelAnimationFrame(raf)
  }, [active])
}
