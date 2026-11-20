let ctx: AudioContext | null = null
const scale = [196, 220, 261.6, 293.7, 329.6, 392, 440, 523.3]

export function pluck(i: number) {
  ctx ??= new AudioContext()
  const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime
  o.type = 'triangle'; o.frequency.value = scale[i % scale.length]
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.07, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6)
  o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 1.7)
}
