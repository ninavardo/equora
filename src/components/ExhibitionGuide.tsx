import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { guide, rooms, YEAR } from '../content/rooms'
import { useGallery } from '../store/useGallery'

export default function ExhibitionGuide() {
  const guideOpen = useGallery((s) => s.guideOpen)
  const toggleGuide = useGallery((s) => s.toggleGuide)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && toggleGuide(false)
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [toggleGuide])
  return (
    <>
      <button onClick={() => toggleGuide()} aria-label="Open exhibition guide" aria-expanded={guideOpen}
        className="focus-ring fixed bottom-6 right-6 z-50 h-14 w-11 -rotate-3 bg-paper shadow-[3px_4px_0_rgba(0,0,0,.35)] transition-transform duration-500 ease-ink hover:rotate-0">
        <span className="absolute inset-y-0 left-1.5 w-px bg-sumi/40" />
        <span className="absolute bottom-2 left-3 font-label text-[8px] leading-tight text-sumi">guide</span>
        <span className="absolute left-3 top-2 h-2 w-2 rounded-full bg-seal" />
      </button>
      <AnimatePresence>
        {guideOpen && (
          <motion.aside role="dialog" aria-label="Exhibition guide" onClick={() => toggleGuide(false)}
            className="fixed inset-0 z-[65] flex items-end justify-end bg-sumi/70 p-4 sm:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <motion.div onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full max-w-md origin-left overflow-y-auto bg-paper p-8 text-sumi shadow-[8px_10px_0_rgba(0,0,0,.4)] [perspective:1200px]"
              initial={{ rotateY: -80, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: -80, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 0.84, 0.24, 1] }}>
              <p className="font-label text-xs text-ash">equora - {YEAR}</p>
              <h2 className="mt-2 font-brush text-3xl">Exhibition guide</h2>
              <ul className="mt-6 space-y-4">
                {rooms.map((r) => (
                  <li key={r.id} className={r.built ? '' : 'opacity-55'}>
                    <p className="font-display text-lg">{r.number ? `Room 0${r.number} - ${r.title}` : r.title}</p>
                    <p className="font-label text-xs text-ash">{r.medium}</p>
                    <p className="mt-1 text-sm leading-relaxed">{r.line}</p>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 font-brush text-xl">How to visit</h3>
              <ul className="mt-2 space-y-1 text-sm leading-relaxed">{guide.howToVisit.map((t) => <li key={t}>{t}</li>)}</ul>
              <button onClick={() => toggleGuide(false)} className="focus-ring mt-8 font-label text-xs underline decoration-seal underline-offset-4">Close the guide</button>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
