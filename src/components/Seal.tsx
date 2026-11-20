export default function Seal({ char = '馬', size = 56, tilt = -6 }: { char?: string; size?: number; tilt?: number }) {
  const rotate = tilt === 9 ? 'rotate-[9deg]' : tilt === 0 ? 'rotate-0' : '-rotate-6'
  return (
    <svg role="img" aria-label="Red seal" width={size} height={size} viewBox="0 0 60 60" className={rotate}>
      <path d="M5 7 Q30 2 55 6 Q58 30 54 55 Q30 59 6 54 Q2 30 5 7Z" fill="#C2321F" />
      <path d="M9 11 Q30 8 51 10 Q53 30 50 51 Q30 53 10 50 Q7 30 9 11Z" fill="none" stroke="#E9E1CE" strokeWidth="1.2" opacity=".5" />
      <text x="30" y="43" textAnchor="middle" fontSize="34" fill="#E9E1CE" className="font-kanji">{char}</text>
    </svg>
  )
}
