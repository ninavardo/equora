import { useRef } from 'react'
import { rooms } from '../content/rooms'
import { useGallery } from '../store/useGallery'

const cells = [
  [6, 70, 26, 22], [34, 70, 24, 22], [34, 44, 24, 24], [60, 52, 22, 16],
  [60, 28, 22, 22], [34, 18, 24, 24], [8, 30, 24, 38], [8, 8, 22, 20], [60, 6, 22, 20],
]

export default function FloorPlan() {
  const current = useGallery((s) => s.currentRoom)
  const found = rooms.findIndex((r) => r.id === current)
  const last = useRef(0)
  if (found >= 0) last.current = found
  const idx = last.current
  const [x, y, w, h] = cells[idx]
  const r = rooms[idx]
  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-50 mix-blend-difference" aria-label={`Floor plan. You are in ${r.title}`}>
      <svg width="92" height="100" viewBox="0 0 90 98" fill="none" stroke="#E9E1CE" strokeWidth=".8" strokeLinejoin="round">
        {cells.map(([cx, cy, cw, ch], i) => (
          <rect key={i} x={cx} y={cy} width={cw} height={ch} opacity={rooms[i].built ? 0.9 : 0.3} transform={`rotate(${(i % 3) - 1} ${cx} ${cy})`} />
        ))}
        <circle cx={x + w / 2} cy={y + h / 2} r="3" fill="#C2321F" stroke="none" />
      </svg>
      <p className="mt-1 font-label text-[10px] text-paper/80">equora</p>
      <p className="font-label text-[10px] text-paper/60">{r.number ? `Room 0${r.number} - ${r.title}` : r.title}</p>
    </div>
  )
}
