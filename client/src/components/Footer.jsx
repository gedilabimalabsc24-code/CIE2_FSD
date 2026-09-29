import { Link } from 'react-router-dom'

// ──────────────────────────────────────────────────────────────
// Footer – Functional Component
// ──────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="brand-name">Roomie<span>Sync</span></div>
            <p>
              Helping students find their perfect roommate based on budget,
              location and lifestyle preferences. Safe, simple, student-friendly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/find-roommates">Find Roommates</Link></li>
              <li><Link to="/create-profile">Create Profile</Link></li>
              <li><Link to="/saved">Saved Roommates</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="footer-links">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About RoomieSync</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} RoomieSync – Smart Roommate Finder</span>
          <span>Made with ❤️ for CS3301 Full Stack Development</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer
