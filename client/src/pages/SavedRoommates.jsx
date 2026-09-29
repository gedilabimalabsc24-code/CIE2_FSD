import { Link } from 'react-router-dom'
import RoommateCard from '../components/RoommateCard'

// ──────────────────────────────────────────────────────────────
// SavedRoommates – Functional Component
// Props: savedRoommates (array), onSave (callback), isSaved (fn)
// Demonstrates: props, conditional rendering, list rendering
// ──────────────────────────────────────────────────────────────
function SavedRoommates({ savedRoommates, onSave, isSaved }) {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>❤️ Saved Roommates</h1>
        <p>
          {savedRoommates.length > 0
            ? `You have saved ${savedRoommates.length} roommate profile${savedRoommates.length > 1 ? 's' : ''}`
            : 'Your saved roommates will appear here'}
        </p>
      </div>

      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>

        {savedRoommates.length === 0 ? (
          /* Empty State */
          <div className="empty-state">
            <div className="empty-icon">💔</div>
            <h2>No Saved Roommates Yet</h2>
            <p style={{ marginBottom: '24px' }}>
              Browse profiles and click the ❤️ button to save roommates you like.
            </p>
            <Link to="/find-roommates" className="btn btn-primary">
              🔍 Find Roommates
            </Link>
          </div>
        ) : (
          <>
            <div className="cards-grid">
              {savedRoommates.map(roommate => (
                <RoommateCard
                  key={roommate.id}
                  roommate={roommate}
                  onSave={onSave}
                  isSaved={isSaved(roommate.id)}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/find-roommates" className="btn btn-outline">
                + Find More Roommates
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default SavedRoommates
