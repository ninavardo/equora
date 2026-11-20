import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lazy, Suspense, useEffect } from 'react'
import Entrance from './components/Entrance'
import ExhibitionGuide from './components/ExhibitionGuide'
import FloorPlan from './components/FloorPlan'
import InkCursor from './components/InkCursor'
import Ending from './components/Ending'
import Statement from './components/Statement'
import Threshold from './components/Threshold'
import { useRoomObserver } from './hooks/useRoomObserver'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useGallery } from './store/useGallery'

gsap.registerPlugin(ScrollTrigger)

const Room01 = lazy(() => import('./rooms/Room01Freedom'))
const Room02 = lazy(() => import('./rooms/Room02Power'))
const Room04 = lazy(() => import('./rooms/Room04Nobility'))
const Room05 = lazy(() => import('./rooms/Room05Speed'))
const Room07 = lazy(() => import('./rooms/Room07Sacred'))
const Room08 = lazy(() => import('./rooms/Room08Silent'))
const Hallway = lazy(() => import('./rooms/Hallway'))
const Game = lazy(() => import('./rooms/Game'))
const Room03 = lazy(() => import('./rooms/Room03Longing'))
const Room06 = lazy(() => import('./rooms/Room06Sorrow'))

const palette: Record<string, [string, string]> = {
  entrance: ['#0c0a08', '#E9E1CE'], 'room-02': ['#140805', '#e7d3b8'], 'room-04': ['#1a1710', '#f0e2bd'], 'room-05': ['#E6DFCF', '#111111'], 'room-07': ['#cdbfa6', '#2b1e14'], 'room-08': ['#000000', '#e9e1ce'], ending: ['#0c0a08', '#E9E1CE'], 'room-03': ['#F1E8D2', '#16130F'], 'room-06': ['#0b1018', '#dfe5ee'],
}

export default function App() {
  useSmoothScroll()
  useRoomObserver()
  const current = useGallery((s) => s.currentRoom)

  useEffect(() => {
    Promise.all([import('./rooms/Room01Freedom'), import('./rooms/Room02Power'), import('./rooms/Room03Longing'), import('./rooms/Room04Nobility'), import('./rooms/Hallway'), import('./rooms/Room05Speed'), import('./rooms/Room06Sorrow'), import('./rooms/Room07Sacred'), import('./rooms/Room08Silent'), import('./rooms/Game')])
      .then(() => setTimeout(() => ScrollTrigger.refresh(), 400))
  }, [])

  useEffect(() => {
    const [bg, ink] = palette[current] ?? ['#E9E1CE', '#16130F']
    const r = document.documentElement.style
    r.setProperty('--room-bg', bg)
    r.setProperty('--room-ink', ink)
  }, [current])

  const toStatement = () => document.getElementById('statement')?.scrollIntoView({ behavior: 'smooth' })
  return (
    <>
      <main>
        <Entrance onEnter={toStatement} />
        <Statement />
        <Suspense fallback={<div className="h-screen" />}>
          <Room01 />
          <Threshold variant="ink" from="bg-[#E9E1CE]" to="bg-[#140805]" />
          <Room02 />
          <Threshold variant="shoji" from="bg-[#140805]" to="bg-[#F1E8D2]" />
          <Room03 />
          <Threshold variant="ink" from="bg-[#F1E8D2]" to="bg-[#1a1710]" />
          <Room04 />
          <Threshold variant="shoji" from="bg-[#1a1710]" to="bg-[#E9E1CE]" />
          <Hallway />
          <Threshold variant="ink" from="bg-[#E9E1CE]" to="bg-[#E6DFCF]" />
          <Room05 />
          <Threshold variant="ink" from="bg-[#E6DFCF]" to="bg-[#0b1018]" />
          <Room06 />
          <Threshold variant="shoji" from="bg-[#0b1018]" to="bg-[#e9dccb]" />
          <Room07 />
          <Threshold variant="ink" from="bg-[#a8977a]" to="bg-black" />
          <Room08 />
          <Ending />
          <Game />
        </Suspense>
      </main>
      <FloorPlan />
      <ExhibitionGuide />
      <InkCursor />
      <div className="pointer-events-none fixed inset-0 z-[59] bg-[radial-gradient(ellipse_at_50%_50%,transparent_55%,rgba(0,0,0,.45)_120%)]" aria-hidden />
      <div className="pointer-events-none fixed inset-[-10%] z-[60] animate-grain bg-grain opacity-[0.09] mix-blend-multiply" aria-hidden />
    </>
  )
}
