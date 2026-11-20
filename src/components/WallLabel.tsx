import { WallLabel as Label } from '../content/labels'
import { useProximity } from '../hooks/useProximity'

export default function WallLabel({ label, className = '' }: { label: Label; className?: string }) {
  const ref = useProximity<HTMLElement>(420, 0)
  return (
    <aside ref={ref} className={`absolute max-w-[17rem] opacity-[calc(var(--near,0)*2.2)] transition-none [@media(pointer:coarse)]:!opacity-100 ${className}`}>
      <p className="font-display text-base">{label.title}</p>
      <p className="font-label text-[11px] opacity-60">{label.medium}</p>
      <p className="mt-2 text-sm leading-relaxed opacity-80">{label.text}</p>
    </aside>
  )
}
