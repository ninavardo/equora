export interface Room {
  id: string
  number: number | null
  title: string
  medium: string
  emotion: string
  line: string
  built: boolean
}

export const YEAR = '2026'
export const CURATOR = 'Nina'

export const rooms: Room[] = [
  { id: 'entrance', number: null, title: 'Entrance', medium: 'Ticket', emotion: 'Threshold', line: 'Admission, and the wall text that explains why.', built: true },
  { id: 'room-01', number: 1, title: 'Freedom', medium: 'Ink', emotion: 'Calm, breath, beginnings', line: 'A horse painted by the scroll of your hand.', built: true },
  { id: 'room-02', number: 2, title: 'Power', medium: 'Bronze and blood-red', emotion: 'Awe', line: 'The Heavenly Horses of Ferghana, in slow motion.', built: true },
  { id: 'room-03', number: 3, title: 'Longing', medium: 'One line', emotion: 'Being seen', line: 'Draw the horse with a single stroke of the cursor.', built: true },
  { id: 'room-04', number: 4, title: 'Nobility', medium: 'Glazed ceramic', emotion: 'Dignity', line: 'A Tang horse turning slowly in a beam of light.', built: true },
  { id: 'room-05', number: 5, title: 'Speed', medium: 'Brush and splatter', emotion: 'Momentum', line: 'Galloping horses, as fast as you scroll.', built: true },
  { id: 'room-06', number: 6, title: 'Sorrow', medium: 'Strings and moonlight', emotion: 'Tenderness', line: 'Pluck the white horse out of the dark.', built: true },
  { id: 'room-07', number: 7, title: 'Sacred', medium: 'Cedar and vermilion', emotion: 'Reverence', line: 'Hang a wish on the wall of ema.', built: true },
  { id: 'room-08', number: 8, title: 'The Silent Room', medium: 'Light', emotion: 'Wonder', line: 'No words. Only the horse.', built: true },
]

export const statement = {
  title: 'Why the Running Horse?',
  paragraphs: [
    'There is something extraordinary about a horse in motion. The way it carries its strength, the freedom in its movement, the untamed energy that seems impossible to contain.',
    'I chose the running horse because, to me, it represents more than freedom. It represents the human desire to move beyond boundaries, to discover, to evolve and to never lose the spirit of becoming.',
    'Throughout history, horses have appeared in paintings, sculptures and stories as symbols of power, beauty, nobility and independence. Yet, a running horse holds a meaning of its own. It is a moment of pure movement - untouched by hesitation, unrestricted by direction, alive in its own rhythm.',
    'I see it as a reflection of life itself. We are constantly moving, changing, searching for something we cannot always define. Sometimes we run towards something; sometimes we simply run because staying still no longer feels right.',
    'This website is an exploration of that feeling - through art, symbolism, history and visual expression.',
    'Because perhaps the most beautiful thing about freedom is not knowing exactly where the road leads, but having the courage to follow it.',
  ],
}

export const guide = {
  howToVisit: [
    'Scroll slowly. The horse follows your pace.',
    'Move the cursor close to an artwork and its label appears.',
    'One door in the gallery is not on the map.',
  ],
}
