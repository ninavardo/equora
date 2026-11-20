import { useEffect, useRef } from 'react'
import { labels } from '../content/labels'
import WallLabel from '../components/WallLabel'
import { useOnScreen } from '../hooks/useOnScreen'
import { pluck } from '../lib/pluck'
import { useGallery } from '../store/useGallery'

const HORSE = 'M150 170 C190 150 300 150 380 165 C400 130 425 95 445 82 C470 70 495 90 492 110 C470 118 455 130 445 148 C432 175 418 195 410 208 C425 240 450 255 462 280 L448 288 C430 268 405 255 388 232 C372 255 350 275 340 305 L322 300 C332 270 352 245 362 215 C300 222 260 222 220 218 C240 245 270 262 285 290 L268 296 C245 270 215 252 198 222 C190 255 180 280 175 308 L155 306 C163 270 170 240 165 205 C140 195 135 180 150 170 Z'
const ROWS = Array.from({ length: 26 }, (_, i) => 78 + i * 9.6)

export default function Room06Sorrow() {
  const root = useRef<HTMLElement>(null), cv = useRef<HTMLCanvasElement>(null)
  const on = useOnScreen(root)
  const soundOn = useGallery((s) => s.soundOn), toggleSound = useGallery((s) => s.toggleSound)
  const sound = useRef(soundOn); sound.current = soundOn

  useEffect(() => {
    const c = cv.current!, ctx = c.getContext('2d')!
    if (!on) return
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const path = new Path2D(HORSE)
    const amp = new Float32Array(ROWS.length), ph = ROWS.map((_, i) => i * 0.7)
    let s = 1, ox = 0, oy = 0, raf = 0, px = 0, py = 0
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2); c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr
      s = Math.min(c.width / 640, c.height / 380) * 0.92; ox = (c.width - 640 * s) / 2 + 20 * s; oy = (c.height - 380 * s) / 2 + 20 * s
    }
    resize()
    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect(), dpr = c.width / r.width
      const x = ((e.clientX - r.left) * dpr - ox) / s, y = ((e.clientY - r.top) * dpr - oy) / s
      ROWS.forEach((row, i) => {
        if ((py - row) * (y - row) < 0 && x > 40 && x < 520) { amp[i] = Math.min(10, 3 + Math.abs(y - py) * 0.5); if (sound.current) pluck(i) }
      })
      px = x; py = y
    }
    const frame = (t: number) => {
      ctx.clearRect(0, 0, c.width, c.height)
      const g = ctx.createRadialGradient(c.width * 0.82, c.height * 0.2, 0, c.width * 0.82, c.height * 0.2, c.width * 0.07)
      g.addColorStop(0, 'rgba(225,232,245,.95)'); g.addColorStop(1, 'rgba(225,232,245,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c.width * 0.82, c.height * 0.2, c.width * 0.07, 0, 6.283); ctx.fill()
      ctx.save(); ctx.translate(ox, oy); ctx.scale(s, s); ctx.clip(path)
      ctx.lineWidth = 1.3; ctx.strokeStyle = '#E6EAF2'
      ROWS.forEach((row, i) => {
        amp[i] *= 0.985
        ctx.globalAlpha = 0.45 + Math.min(0.5, amp[i] / 10)
        ctx.beginPath()
        for (let x = 40; x <= 520; x += 6) {
          const y = row + (calm ? 0 : amp[i] * Math.sin((Math.PI * (x - 40)) / 480) * Math.cos(t / 90 + ph[i]))
          x === 40 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      ctx.restore(); ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }
    addEventListener('pointermove', move, { passive: true }); addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); removeEventListener('pointermove', move); removeEventListener('resize', resize) }
  }, [on])

  return (
    <section ref={root} data-room="room-06" className="relative h-screen overflow-hidden bg-[#0b1018] text-[#dfe5ee]">
      <canvas ref={cv} className="absolute inset-0 h-full w-full" role="img" aria-label="A white horse made of vibrating strings" />
      <h2 className="vertical absolute left-[5vw] top-[12vh] font-brush text-3xl">Room 06 - Sorrow</h2>
      <p aria-hidden className="vertical absolute right-[4vw] top-[30vh] font-kanji text-7xl text-white/10">哀</p>
      <button onClick={toggleSound} aria-pressed={soundOn} className="focus-ring absolute bottom-6 left-1/2 -translate-x-1/2 font-label text-xs underline decoration-seal underline-offset-4">
        Sound {soundOn ? 'on' : 'off'}
      </button>
      <WallLabel label={labels.room06} className="bottom-[14vh] left-[8vw]" />
    </section>
  )
}
