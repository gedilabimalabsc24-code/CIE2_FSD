// ──────────────────────────────────────────────────────────────
// CompatibilityBadge – Functional Component
// Props: score (number 0–100)
// Demonstrates: props, conditional rendering
// ──────────────────────────────────────────────────────────────
function CompatibilityBadge({ score, showBar = false }) {
  // Determine color class based on score
  const getLevel = (s) => {
    if (s >= 80) return 'high'
    if (s >= 55) return 'medium'
    return 'low'
  }

  const getEmoji = (s) => {
    if (s >= 80) return '🟢'
    if (s >= 55) return '🟡'
    return '🔴'
  }

  const level = getLevel(score)

  return (
    <div>
      <span className={`compat-badge ${level}`}>
        {getEmoji(score)} {score}% Match
      </span>

      {/* Optional progress bar */}
      {showBar && (
        <div className="compat-bar-wrap" style={{ marginTop: '8px' }}>
          <div
            className={`compat-bar ${level}`}
            style={{ width: `${score}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default CompatibilityBadge
