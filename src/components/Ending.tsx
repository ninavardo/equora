import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { closing } from '../content/legends'
import { CURATOR, YEAR } from '../content/rooms'
import { HORSE } from '../lib/horse'
import Seal from './Seal'
import VisitorBook from './VisitorBook'

export default function Ending() {
  const root = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: '[data-credits]', start: 'top top', end: 'bottom bottom', scrub: 1 } })
        .to('[data-horse]', { scale: 0.08, x: '38vw', y: '-6vh', opacity: 0, duration: 3, ease: 'power2.in' }, 0)
        .fromTo('[data-col]', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', stagger: 1.2, duration: 1.4, ease: 'none' }, 1)
        .fromTo('[data-credit]', { opacity: 0 }, { opacity: 1, duration: 1 }, 5.5)
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} data-room="ending" className="bg-[#0c0a08] text-paper">
      <div data-credits className="relative h-[340vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <svg data-horse aria-hidden viewBox="0 0 640 380" className="absolute bottom-[6vh] left-[6vw] w-[42vw] origin-[90%_70%]">
            <path d={HORSE} fill="#e9e1ce" />
          </svg>
          <div aria-label={closing.join(' ')} className="vertical absolute right-[10vw] top-[12vh] h-[76vh] font-brush text-3xl leading-[2.2]">
            {closing.map((l) => <p key={l} data-col className="inline-block h-full">{l}</p>)}
          </div>
          <div data-credit className="absolute bottom-[8vh] left-[8vw] flex items-center gap-4 opacity-0">
            <Seal size={48} />
            <p className="font-label text-xs leading-relaxed">equora<br />Curated &amp; created by {CURATOR} - {YEAR}</p>
          </div>
        </div>
      </div>
      <div className="relative flex min-h-screen items-end justify-between px-[8vw] py-[10vh]">
        <VisitorBook />
        <button aria-label="Exit through the game" title="Exit through the game"
          onClick={() => document.getElementById('game')?.scrollIntoView({ behavior: 'smooth' })}
          className="focus-ring h-16 w-8 border border-paper/20 opacity-20 transition-opacity duration-700 hover:opacity-90 focus-visible:opacity-90" />
      </div>
    </section>
  )
}
