// Shows the user's uploaded photo if they have one, otherwise a unique
// gradient "initials" avatar derived deterministically from their name —
// so every user gets a distinct-looking avatar even without a photo.
const GRADIENT_PAIRS = [
  ['#7B5544', '#D4AF6A'],
  ['#4A1E0C', '#B0805C'],
  ['#12215C', '#E0BF74'],
  ['#4C7A4A', '#C8A96B'],
  ['#B3432B', '#D6AF5C'],
]

function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Avatar({ src, name = '', size = 40, className = '' }) {
  const dimension = `${size}px`

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Profile photo'}
        style={{ width: dimension, height: dimension }}
        className={`rounded-full object-cover shrink-0 ${className}`}
      />
    )
  }

  const [from, to] = GRADIENT_PAIRS[hashString(name) % GRADIENT_PAIRS.length]

  return (
    <div
      style={{
        width: dimension,
        height: dimension,
        background: `linear-gradient(135deg, ${from}, ${to})`,
        fontSize: size * 0.38,
      }}
      className={`rounded-full flex items-center justify-center text-white font-display font-semibold shrink-0 ${className}`}
    >
      {getInitials(name) || '?'}
    </div>
  )
}
