import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CompatibilityBadge from '../components/CompatibilityBadge'

// ──────────────────────────────────────────────────────────────
// RoommateDetails – Functional Component
// Demonstrates: useParams, useEffect (fetch single roommate),
//               useState (connect button), event handling
// ──────────────────────────────────────────────────────────────
function RoommateDetails({ onSave, isSaved }) {
  const { id } = useParams()          // Get :id from URL
  const navigate = useNavigate()

  const [roommate, setRoommate] = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [connected, setConnected] = useState(false)  // Connect button state

  // useEffect: Fetch single roommate when id changes
  useEffect(() => {
    setLoading(true)
    setConnected(false)

    fetch(`/api/roommates/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Roommate not found')
        return res.json()
      })
      .then(data => {
        setRoommate(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])  // Re-run whenever the ID changes

  // Handle "Connect" button click
  const handleConnect = () => {
    setConnected(true)
  }

  // Generate avatar initials
  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  if (loading) {
    return (
      <div className="loading-spinner" style={{ padding: '100px 20px' }}>
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  if (error || !roommate) {
    return (
      <div className="error-msg" style={{ padding: '80px 20px' }}>
        <p>❌ {error || 'Roommate not found'}</p>
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/find-roommates')}>
          ← Back to Find Roommates
        </button>
      </div>
    )
  }

  const saved = isSaved(roommate.id)

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>👤 Roommate Profile</h1>
        <p>Full details about this roommate</p>
      </div>

      <div className="details-container">

        {/* Back Link */}
        <Link
          to="/find-roommates"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#6c63ff', fontWeight: 600, marginBottom: '20px', fontSize: '0.92rem' }}
        >
          ← Back to Results
        </Link>

        <div className="details-card">

          {/* Profile Header */}
          <div className="details-header">
            <div className="avatar large">{getInitials(roommate.name)}</div>
            <div className="details-info">
              <h1>{roommate.name}</h1>
              <div className="occupation">{roommate.occupation}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  📍 {roommate.location} &nbsp;•&nbsp; {roommate.age} years old
                </span>
              </div>
              <div style={{ marginTop: '12px' }}>
                {/* Modification 1 – Compatibility Score displayed prominently */}
                <CompatibilityBadge score={roommate.compatibility} showBar={true} />
              </div>
            </div>
          </div>

          {/* Profile Body */}
          <div className="details-body">
            <div className="details-grid">

              {/* Personal Details */}
              <div className="details-section">
                <h2>📋 Personal Details</h2>
                <div className="detail-row">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">{roommate.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Age</span>
                  <span className="detail-value">{roommate.age} years</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">📍 {roommate.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Monthly Budget</span>
                  <span className="detail-value" style={{ color: '#6c63ff', fontWeight: 700 }}>
                    ₹{roommate.budget.toLocaleString()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Occupation</span>
                  <span className="detail-value">{roommate.occupation}</span>
                </div>
              </div>

              {/* Lifestyle Preferences */}
              <div className="details-section">
                <h2>🌟 Lifestyle Preferences</h2>
                <div className="detail-row">
                  <span className="detail-label">Sleep Schedule</span>
                  <span className="detail-value">🌙 {roommate.sleepSchedule}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Food Preference</span>
                  <span className="detail-value">🍽️ {roommate.foodPreference}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Smoking</span>
                  <span className="detail-value">
                    {roommate.smoking === 'No' ? '🚭 Non-Smoker' : '🚬 Smoker'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pets</span>
                  <span className="detail-value">
                    {roommate.pets === 'Yes' ? '🐾 Has/Allows Pets' : '🚫 No Pets'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Compatibility</span>
                  <span className="detail-value" style={{ color: '#6c63ff' }}>
                    {roommate.compatibility}%
                  </span>
                </div>
              </div>

            </div>

            {/* Bio Section */}
            <div className="bio-section">
              <h2>📝 About Me</h2>
              <p className="bio-text">{roommate.bio}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="details-actions">
            {connected ? (
              <div className="connect-success">
                ✅ Connection request sent to {roommate.name.split(' ')[0]}!
              </div>
            ) : (
              <button className="btn btn-primary" onClick={handleConnect}>
                🤝 Connect with {roommate.name.split(' ')[0]}
              </button>
            )}

            <button
              className={`btn ${saved ? 'btn-secondary' : 'btn-outline'}`}
              onClick={() => onSave(roommate)}
            >
              {saved ? '❤️ Saved' : '🤍 Save Profile'}
            </button>

            <Link to="/find-roommates" className="btn btn-outline">
              ← Find More
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RoommateDetails
