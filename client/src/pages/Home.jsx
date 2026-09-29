import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoommateCard from '../components/RoommateCard'

// ──────────────────────────────────────────────────────────────
// Home – Functional Component (Landing Page)
// Demonstrates: useState, useEffect (load featured roommates),
//               conditional rendering, event handling
// ──────────────────────────────────────────────────────────────
function Home() {
  const [featuredRoommates, setFeaturedRoommates] = useState([])
  const [savedRoommates, setSavedRoommates] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect: Load featured roommates from API when page mounts
  useEffect(() => {
    fetch('/api/roommates')
      .then(res => res.json())
      .then(data => {
        // Show only top 3 by compatibility score
        const sorted = [...data].sort((a, b) => b.compatibility - a.compatibility)
        setFeaturedRoommates(sorted.slice(0, 3))
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load roommates:', err)
        setLoading(false)
      })
  }, [])  // Empty dependency array → runs once on mount

  // Local save handler for homepage (simplified)
  const handleSave = (roommate) => {
    setSavedRoommates(prev => {
      const exists = prev.find(r => r.id === roommate.id)
      return exists ? prev.filter(r => r.id !== roommate.id) : [...prev, roommate]
    })
  }

  const isSaved = (id) => savedRoommates.some(r => r.id === id)

  return (
    <div>

      {/* ── Hero Section ──────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">🏠 Smart Roommate Finder</div>

          <h1>
            Find a Roommate Who Matches<br />
            <span>Your Lifestyle</span>
          </h1>

          <p>
            RoomieSync helps students find compatible roommates based on budget,
            location, sleep schedule and lifestyle preferences.
          </p>

          <div className="hero-buttons">
            <Link to="/find-roommates" className="btn btn-primary" style={{ background: '#fff', color: '#6c63ff', border: '2px solid #fff' }}>
              🔍 Find Roommates
            </Link>
            <Link to="/create-profile" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>
              + Create Your Profile
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Student Profiles</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">12+</span>
              <span className="stat-label">Cities</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">95%</span>
              <span className="stat-label">Happy Matches</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">Free</span>
              <span className="stat-label">Always</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Roommates ────────────────────────── */}
      <section className="section" style={{ background: '#f8f7ff' }}>
        <div className="container">
          <div className="section-header">
            <h2>✨ Top Compatible Roommates</h2>
            <p>Based on our compatibility algorithm, these are your best matches today.</p>
            <div className="section-divider"></div>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading roommates...</p>
            </div>
          ) : (
            <>
              <div className="cards-grid">
                {featuredRoommates.map(roommate => (
                  <RoommateCard
                    key={roommate.id}
                    roommate={roommate}
                    onSave={handleSave}
                    isSaved={isSaved(roommate.id)}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '36px' }}>
                <Link to="/find-roommates" className="btn btn-primary">
                  View All Roommates →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="section how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How RoomieSync Works</h2>
            <p>Find your perfect roommate in three easy steps.</p>
            <div className="section-divider"></div>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">📝</div>
              <h3>Create Your Profile</h3>
              <p>Fill in your details, budget, and lifestyle preferences to get started.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🔍</div>
              <h3>Browse Roommates</h3>
              <p>Search and filter profiles based on location, budget, and preferences.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">💯</div>
              <h3>Check Compatibility</h3>
              <p>Our smart algorithm calculates how compatible you are with each roommate.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🤝</div>
              <h3>Connect &amp; Move In</h3>
              <p>Hit "Connect" on a profile and start planning your shared living arrangement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────── */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #6c63ff, #43c6ac)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
            Ready to Find Your Roommate?
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '28px', fontSize: '1.05rem' }}>
            Join hundreds of students already using RoomieSync.
          </p>
          <Link to="/create-profile" className="btn" style={{ background: '#fff', color: '#6c63ff', fontWeight: 700 }}>
            Create Your Profile – It's Free 🚀
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home
