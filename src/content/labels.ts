export interface WallLabel { title: string; medium: string; text: string }

export const labels = {
  room01: {
    title: 'Breath',
    medium: 'ink on paper / digital, 2026',
    text: 'The horse is not drawn. It is slowly remembered. Each stroke arrives only when you scroll; when you stop, the ink holds its breath with you.',
  },
  room02: {
    title: 'Blood-sweating horse',
    medium: 'bronze and ink / digital, 2026',
    text: 'In the Han dynasty, the Heavenly Horses of Ferghana were said to sweat blood as they ran - prized so fiercely that armies crossed deserts to claim them. Power, here, is not stillness; it is motion that costs something.',
  },
  room03: {
    title: 'Bole',
    medium: 'one line / digital, 2026',
    text: 'Bole could recognise a thousand-li horse at a glance - a mount that covers a thousand li in a day. The legend is less about speed than about being truly seen. Follow the red circle until the horse exists.',
  },
  room04: {
    title: 'Tang horse',
    medium: 'glazed ceramic / digital, 2026',
    text: 'Tang sancai horses - cream, amber, green - once stood in tombs as companions for the journey beyond. Their raised heads and arched necks still read as nobility: not racing, but enduring.',
  },
  room05: {
    title: 'Gallop',
    medium: 'brush and splatter / digital, 2026',
    text: 'Xu Beihong painted horses that seemed to tear the paper open. His gallops were a modern China finding its stride - ink as momentum. Scroll faster, and the room keeps up.',
  },
  room06: {
    title: 'Morin khuur',
    medium: 'strings / digital, 2026',
    text: 'When Suho\'s white horse was killed, its spirit asked to become an instrument. The morin khuur - horsehead fiddle - carries that grief in every string. Move across them gently; they answer.',
  },
  room07: {
    title: 'Ema',
    medium: 'cedar and vermilion / digital, 2026',
    text: 'At Shinto shrines, wooden ema plaques once stood in for living horses offered to the kami. Write a wish, hang it among the others - a small horse carrying what you cannot say aloud.',
  },
} satisfies Record<string, WallLabel>
