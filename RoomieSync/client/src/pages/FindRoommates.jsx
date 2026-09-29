import { useState, useEffect } from 'react'
import RoommateCard from '../components/RoommateCard'
import SearchFilter from '../components/SearchFilter'

// ──────────────────────────────────────────────────────────────
// FindRoommates – Functional Component
// PARENT component that renders child RoommateCard components
// Demonstrates: useState, useEffect, props, parent–child,
//               event handling, Modification 2 (Search & Filter)
// ──────────────────────────────────────────────────────────────
function FindRoommates({ onSave, isSaved }) {
  // State for all roommates fetched from API
  const [roommates, setRoommates] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  // Modification 2 – Filter state
  const [filters, setFilters] = useState({
    search:    '',
    maxBudget: '',
    smoking:   '',
    pets:      ''
  })

  // useEffect: Fetch all roommates from Express API when component mounts
  useEffect(() => {
    setLoading(true)
    fetch('/api/roommates')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch roommates')
        return res.json()
      })
      .then(data => {
        setRoommates(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Handle filter changes from child SearchFilter component
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  // ── Modification 2: Apply filters ────────────────────────────
  const filteredRoommates = roommates.filter(r => {
    // Search by name or location (case-insensitive)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (
        !r.name.toLowerCase().includes(q) &&
        !r.location.toLowerCase().includes(q)
      ) return false
    }

    // Max budget filter
    if (filters.maxBudget && r.budget > Number(filters.maxBudget)) {
      return false
    }

    // Smoking preference filter
    if (filters.smoking && r.smoking !== filters.smoking) {
      return false
    }

    // Pets preference filter
    if (filters.pets && r.pets !== filters.pets) {
      return false
    }

    return true
  })

  if (loading) {
    return (
      <div className="loading-spinner" style={{ padding: '100px 20px' }}>
        <div className="spinner"></div>
        <p>Loading roommates...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-msg">
        <p>❌ {error}</p>
        <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#6b7280' }}>
          Make sure the backend server is running on port 5000.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>🔍 Find Roommates</h1>
        <p>Browse {roommates.length} profiles and filter to find your perfect match</p>
      </div>

      <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>

        {/* SearchFilter – Child Component
            Parent passes: filters (state) + onFilterChange (callback)
            Child reads these via props and calls back on changes */}
        <SearchFilter
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Results count */}
        <p style={{ marginBottom: '20px', color: '#6b7280', fontSize: '0.92rem' }}>
          Showing <strong>{filteredRoommates.length}</strong> of {roommates.length} profiles
        </p>

        {/* RoommateCard Grid – Parent passes data to child via props */}
        {filteredRoommates.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔎</div>
            <p>No roommates match your filters. Try clearing some filters.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {filteredRoommates.map(roommate => (
              // Parent → Child: passes roommate data + callbacks as props
              <RoommateCard
                key={roommate.id}
                roommate={roommate}
                onSave={onSave}
                isSaved={isSaved(roommate.id)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default FindRoommates
