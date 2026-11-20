import { useEffect } from 'react'
import { useGallery } from '../store/useGallery'

export function useRoomObserver() {
  const setRoom = useGallery((s) => s.setRoom)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setRoom((e.target as HTMLElement).dataset.room!)),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    document.querySelectorAll('[data-room]').forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [setRoom])
}
