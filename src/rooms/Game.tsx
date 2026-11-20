import { useEffect, useRef, useState } from 'react'
import { hiddenLegend, UNLOCK_SCORE } from '../content/legends'
import { useGameLoop } from '../hooks/useGameLoop'
import { useOnScreen } from '../hooks/useOnScreen'
import { HORSE } from '../lib/horse'

const GW = 800, GH = 300, GROUND = 250, K = 0.2, HX = 90
const DIGITS = '〇一二三四五六七八九'
const kanji = (n: number) => String(n).split('').map((d) => DIGITS[+d]).join('')
type Kind = 'rock' | 'stump' | 'torii' | 'branch'
interface Ob { x: number; k: Kind; w: number; h: number }
const SIZE: Record<Kind, [number, number]> = { rock: [34, 24], stump: [16, 38], torii: [56, 66], branch: [64, 12] }
const get = (k: string) => { try { return localStorage.getItem(k) } catch { return null } }
const put = (k: string, v: string) => { try { localStorage.setItem(k, v) } catch {} }
const mix = (a: number[], b: number[], t: number) => `rgb(${a.map((x, i) => Math.round(x + (b[i] - x) * t)).join(',')})`
const PAPER = [233, 225, 206], INK = [22, 19, 15]

export default function Game() {
  const root = useRef<HTMLElement>(null), cv = useRef<HTMLCanvasElement>(null)
  const on = useOnScreen(root, '-25% 0px')
  const [state, setState] = useState<'idle' | 'run' | 'over'>('idle')
  const [best, setBest] = useState(() => Number(get('equora-best') || 0))
  const [unlocked, setUnlocked] = useState(() => get('equora-legend') === '1')
  const g = useRef({ y: 0, vy: 0, obs: [] as Ob[], speed: 5, score: 0, t: 0, gap: 300, state: 'idle' as 'idle' | 'run' | 'over' })
  const path = useRef(new Path2D(HORSE))

  const jump = () => {
    const s = g.current
    if (s.state !== 'run') { Object.assign(s, { y: 0, vy: 0, obs: [], speed: 5, score: 0, t: 0, gap: 300, state: 'run' }); setState('run'); return }
    if (s.y === 0) s.vy = 11
  }
  useEffect(() => {
    if (!on) return
    const k = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.code !== 'ArrowUp') return
      if ((e.target as HTMLElement).tagName === 'INPUT') return
      e.preventDefault(); jump()
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [on])

  const rects = (o: Ob) => o.k === 'torii'
    ? [{ x: o.x, w: 8, h: o.h }, { x: o.x + o.w - 8, w: 8, h: o.h }]
    : [{ x: o.x, w: o.w, h: o.h }]

  const step = () => {
    const s = g.current
    if (s.state !== 'run') return
    s.t++; s.speed = Math.min(13, 5 + s.score / 120); s.score += s.speed * 0.03
    if (s.y > 0 || s.vy > 0) { s.y += s.vy; s.vy -= 0.6; if (s.y <= 0) { s.y = 0; s.vy = 0 } }
    s.obs.forEach((o) => (o.x -= s.speed))
    s.obs = s.obs.filter((o) => o.x > -90)
    const lastX = s.obs.length ? s.obs[s.obs.length - 1].x : -999
    if (lastX < GW - s.gap) {
      const kinds: Kind[] = ['rock', 'stump', 'torii', 'branch'], k = kinds[Math.floor(Math.random() * 4)]
      s.obs.push({ x: GW + 20, k, w: SIZE[k][0], h: SIZE[k][1] }); s.gap = 260 + Math.random() * 260 + s.speed * 14
    }
    const top = GROUND - s.y - 40
    for (const o of s.obs) for (const r of rects(o))
      if (HX + 8 < r.x + r.w && HX + 42 > r.x && GROUND - s.y > GROUND - r.h + 4 && top < GROUND) {
        s.state = 'over'; setState('over')
        const sc = Math.floor(s.score)
        setBest((b) => { const n = Math.max(b, sc); put('equora-best', String(n)); return n })
        if (sc >= UNLOCK_SCORE) { put('equora-legend', '1'); setUnlocked(true) }
        return
      }
  }
  const draw = () => {
    const c = cv.current!, ctx = c.getContext('2d')!, s = g.current
    c.width = GW * 2; c.height = GH * 2; ctx.scale(2, 2)
    const n = (1 - Math.cos(Math.min(s.score / 700, 1) * Math.PI)) / 2
    const bg = mix(PAPER, [16, 16, 15], n), fg = mix(INK, PAPER, n)
    ctx.fillStyle = bg; ctx.fillRect(0, 0, GW, GH)
    ctx.fillStyle = '#C2321F'; ctx.globalAlpha = 1 - n * 0.3; ctx.beginPath(); ctx.arc(600, 70 + n * 170, 26, 0, 6.283); ctx.fill(); ctx.globalAlpha = 1
    ctx.strokeStyle = fg; ctx.fillStyle = fg; ctx.lineWidth = 2
    ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.moveTo(0, 200); ctx.bezierCurveTo(150, 120, 260, 220, 400, 160); ctx.bezierCurveTo(520, 110, 650, 210, GW, 170); ctx.stroke(); ctx.globalAlpha = 1
    ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(GW, GROUND); ctx.stroke()
    for (let x = -((s.t * s.speed) % 60); x < GW; x += 60) { ctx.beginPath(); ctx.moveTo(x, GROUND + 10); ctx.lineTo(x + 18, GROUND + 10); ctx.stroke() }
    s.obs.forEach((o) => {
      const y = GROUND
      if (o.k === 'rock') { ctx.beginPath(); ctx.ellipse(o.x + o.w / 2, y - o.h / 2, o.w / 2, o.h / 2, 0, 0, 6.283); ctx.fill() }
      else if (o.k === 'stump') ctx.fillRect(o.x, y - o.h, o.w, o.h)
      else if (o.k === 'branch') { ctx.save(); ctx.translate(o.x, y); ctx.rotate(-0.06); ctx.fillRect(0, -o.h, o.w, o.h); ctx.restore() }
      else { ctx.fillRect(o.x, y - o.h, 8, o.h); ctx.fillRect(o.x + o.w - 8, y - o.h, 8, o.h); ctx.fillRect(o.x - 6, y - o.h, o.w + 12, 7); ctx.fillRect(o.x, y - o.h + 18, o.w, 5) }
    })
    ctx.save(); ctx.translate(HX - 50 * K, GROUND - s.y - 310 * K + (s.y === 0 && s.state === 'run' ? Math.sin(s.t * 0.4) * 1.5 : 0)); ctx.scale(K, K)
    ctx.fillStyle = fg; ctx.fill(path.current); ctx.restore()
    ctx.fillStyle = fg; ctx.font = '28px "Ma Shan Zheng", serif'; ctx.textAlign = 'right'; ctx.fillText(kanji(Math.floor(s.score)), GW - 24, 40)
  }
  useGameLoop(on, step, draw)

  return (
    <section ref={root} id="game" data-room="game" className="relative flex min-h-screen flex-col items-center justify-center bg-paper px-[5vw] py-[10vh] text-sumi">
      <h2 className="font-brush text-3xl">The Last Gallop</h2>
      <p className="mb-6 font-label text-xs text-ash">Space, click or tap to jump.</p>
      <div className="relative w-full max-w-4xl">
        <canvas ref={cv} onPointerDown={jump} className="aspect-[800/300] w-full touch-none border border-sumi/30" role="img" aria-label="Endless runner: a brush-ink horse jumping obstacles" />
        {state !== 'run' && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-paper/55 text-center">
            <p className="font-brush text-3xl">{state === 'over' ? 'The horse rests.' : 'Ready when you are.'}</p>
            <p className="mt-2 font-label text-xs">{state === 'over' ? 'Press space or tap to run again.' : 'Press space or tap to run.'}</p>
          </div>
        )}
      </div>
      <p className="mt-4 font-label text-xs text-ash">Best {kanji(best)}</p>
      {unlocked && <aside className="mt-10 max-w-md"><h3 className="font-brush text-xl">{hiddenLegend.title}</h3><p className="mt-2 leading-loose">{hiddenLegend.text}</p></aside>}
      <p className="mt-16 font-brush text-xl text-sumi/70 sm:text-2xl">At the end, don't forget it's all for fun</p>
    </section>
  )
}
