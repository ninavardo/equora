import { FormEvent, useState } from 'react'
import WallLabel from '../components/WallLabel'
import { labels } from '../content/labels'

const KEY = 'equora-ema'
const load = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } }
const EMA_TILT = ['-rotate-4', '-rotate-2', 'rotate-0', 'rotate-2', 'rotate-4'] as const

export default function Room07Sacred() {
  const [wishes, setWishes] = useState<string[]>(load)
  const [text, setText] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    const w = text.trim().slice(0, 40); if (!w) return
    const next = [w, ...wishes].slice(0, 14); setWishes(next); setText('')
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
  }
  return (
    <section data-room="room-07" className="relative min-h-screen overflow-hidden bg-[linear-gradient(#e9dccb,#cdbfa6_70%,#a8977a)] font-sacred text-[#2b1e14]">
      <svg aria-hidden viewBox="0 0 480 340" className="absolute right-[4vw] top-[6vh] w-[52vw] max-w-2xl opacity-95" role="img">
        <title>A vermilion torii in dawn mist</title>
        <defs>
          <radialGradient id="r7mist" cx="50%" cy="78%" r="48%">
            <stop offset="0%" stopColor="rgba(255,255,255,.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <ellipse cx="250" cy="290" rx="200" ry="42" fill="url(#r7mist)" />
        <g fill="#C2321F">
          <rect x="70" y="48" width="340" height="18" />
          <rect x="88" y="72" width="304" height="11" />
          <rect x="108" y="83" width="22" height="210" />
          <rect x="350" y="83" width="22" height="210" />
          <rect x="100" y="168" width="280" height="10" />
        </g>
        <path d="M90 296 Q240 282 390 298" fill="none" stroke="#2b1e14" strokeOpacity=".18" strokeWidth="2" />
      </svg>
      <h2 className="vertical absolute left-[5vw] top-[12vh] text-3xl">Room 07 - Sacred</h2>
      <div className="relative z-10 ml-[12vw] max-w-md pt-[56vh]">
        <form onSubmit={submit} className="flex items-end gap-4">
          <label className="grow"><span className="font-label text-xs opacity-70">Write a wish on an ema</span>
            <input value={text} onChange={(e) => setText(e.target.value)} maxLength={40} className="focus-ring mt-1 w-full border-b border-[#2b1e14]/50 bg-transparent py-1 text-lg outline-none" />
          </label>
          <button className="focus-ring font-label text-xs underline decoration-seal underline-offset-4">Hang it</button>
        </form>
      </div>
      <ul className="relative z-10 mx-[8vw] mt-12 flex flex-wrap gap-4 pb-28" aria-label="Wishes hung by visitors">
        {wishes.map((w, i) => (
          <li key={i} className={`relative flex h-28 w-20 flex-col items-center justify-end bg-[#b98c5a] p-2 pb-3 text-center text-xs shadow-[2px_3px_0_rgba(0,0,0,.25)] [clip-path:polygon(50%_0,100%_18%,100%_100%,0_100%,0_18%)] ${EMA_TILT[i % 5]}`}>
            <svg aria-hidden viewBox="0 0 40 28" className="mb-1 h-6 w-8 opacity-70">
              <path d="M4 16 C8 8 16 6 24 8 C30 10 34 14 33 18 C28 20 20 22 12 20 C8 22 5 24 3 22 Z M28 12 C30 8 34 6 36 8 C35 12 32 14 30 15 Z" fill="#2b1e14" />
            </svg>
            <span>{w}</span>
          </li>
        ))}
      </ul>
      <WallLabel label={labels.room07} className="right-[8vw] bottom-[8vh]" />
    </section>
  )
}
