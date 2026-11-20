import { FormEvent, useState } from 'react'

const KEY = 'equora-visitors'
const load = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } }

export default function VisitorBook() {
  const [words, setWords] = useState<string[]>(load), [w, setW] = useState('')
  const add = (e: FormEvent) => {
    e.preventDefault()
    const v = w.trim().split(/\s+/)[0]?.slice(0, 24); if (!v) return
    const next = [v, ...words].slice(0, 30); setWords(next); setW('')
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
  }
  return (
    <div className="max-w-sm">
      <form onSubmit={add} className="flex items-end gap-4">
        <label className="grow"><span className="font-label text-xs opacity-60">Visitor book: leave one word</span>
          <input value={w} onChange={(e) => setW(e.target.value)} maxLength={24} className="focus-ring mt-1 w-full border-b border-paper/40 bg-transparent py-1 outline-none" /></label>
        <button className="focus-ring font-label text-xs underline decoration-seal underline-offset-4">Sign</button>
      </form>
      <p className="mt-4 text-sm leading-loose opacity-70">{words.join('  ·  ')}</p>
    </div>
  )
}
