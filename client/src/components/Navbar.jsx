import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

// ──────────────────────────────────────────────────────────────
// Navbar – Functional Component
// Demonstrates: useState (mobile menu), props (savedCount),
//               NavLink active class, event handling (onClick)
// ──────────────────────────────────────────────────────────────
function Navbar({ savedCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu  = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon">🏠</div>
          Roomie<span>Sync</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/find-roommates" onClick={closeMenu}>Find Roommates</NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          </li>
          <li>
            <NavLink to="/saved" onClick={closeMenu} className="nav-saved-badge">
              ❤️ Saved
              {savedCount > 0 && (
                <span className="saved-count">{savedCount}</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-profile" className="navbar-cta" onClick={closeMenu}>
              + Create Profile
            </NavLink>
          </li>
        </ul>

        {/* Hamburger for mobile */}
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  )
}

export default Navbar
