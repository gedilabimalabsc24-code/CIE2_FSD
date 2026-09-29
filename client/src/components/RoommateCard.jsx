import { Link } from 'react-router-dom'
import CompatibilityBadge from './CompatibilityBadge'

// ──────────────────────────────────────────────────────────────
// RoommateCard – Functional Component (Reusable)
// Props: roommate (object), onSave (callback), isSaved (boolean)
// Demonstrates: props, event handling (onClick), conditional rendering,
//               parent–child communication
// ──────────────────────────────────────────────────────────────
function RoommateCard({ roommate, onSave, isSaved }) {
  const {
    id,
    name,
    age,
    location,
    budget,
    occupation,
    sleepSchedule,
    foodPreference,
    smoking,
    pets,
    compatibility
  } = roommate

  // Generate avatar initials from name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Save / unsave click handler
  const handleSave = (e) => {
    e.preventDefault()   // Prevent card navigation if wrapped in link
    onSave(roommate)
  }

  return (
    <div className="roommate-card">

      {/* Save Button (heart) */}
      <button
        className="save-btn"
        onClick={handleSave}
        title={isSaved ? 'Remove from saved' : 'Save roommate'}
        aria-label="Save roommate"
      >
        {isSaved ? '❤️' : '🤍'}
      </button>

      {/* Card Top: Avatar + Basic Info */}
      <div className="card-top">
        <div className="avatar">{initials}</div>
        <div className="card-info">
          <h3>{name}</h3>
          <div className="card-meta">{age} yrs • {occupation}</div>
          <div className="card-location">📍 {location}</div>
        </div>
      </div>

      {/* Budget */}
      <div>
        <span className="card-budget">₹{budget.toLocaleString()}/month</span>
      </div>

      {/* Preferences Tags */}
      <div className="pref-list">
        <span className="pref-tag sleep">🌙 {sleepSchedule}</span>
        <span className="pref-tag food">🍽️ {foodPreference}</span>
        <span className={`pref-tag smoke ${smoking === 'No' ? 'ok' : ''}`}>
          {smoking === 'No' ? '🚭 Non-Smoker' : '🚬 Smoker'}
        </span>
        <span className={`pref-tag pet ${pets === 'Yes' ? 'ok' : ''}`}>
          {pets === 'Yes' ? '🐾 Pet Friendly' : '🚫 No Pets'}
        </span>
      </div>

      {/* Compatibility Badge */}
      <CompatibilityBadge score={compatibility} />

      {/* Action Buttons */}
      <div className="card-actions">
        <Link to={`/roommate/${id}`} className="btn btn-primary btn-sm">
          View Profile
        </Link>
        <button
          className={`btn btn-sm ${isSaved ? 'btn-secondary' : 'btn-outline'}`}
          onClick={handleSave}
        >
          {isSaved ? '❤️ Saved' : '🤍 Save'}
        </button>
      </div>

    </div>
  )
}

export default RoommateCard
