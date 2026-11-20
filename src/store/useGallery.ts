import { create } from 'zustand'

interface GalleryState {
  currentRoom: string
  entered: boolean
  guideOpen: boolean
  soundOn: boolean
  setRoom: (id: string) => void
  enter: () => void
  toggleGuide: (open?: boolean) => void
  toggleSound: () => void
}

export const useGallery = create<GalleryState>((set) => ({
  currentRoom: 'entrance',
  entered: false,
  guideOpen: false,
  soundOn: false,
  setRoom: (id) => set({ currentRoom: id }),
  enter: () => set({ entered: true }),
  toggleGuide: (open) => set((s) => ({ guideOpen: open ?? !s.guideOpen })),
  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
}))
