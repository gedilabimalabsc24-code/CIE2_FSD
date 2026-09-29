import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FindRoommates from './pages/FindRoommates'
import RoommateDetails from './pages/RoommateDetails'
import CreateProfile from './pages/CreateProfile'
import SavedRoommates from './pages/SavedRoommates'
import AboutRoomieSync from './pages/AboutRoomieSync'

function App() {
  // Saved roommates state lifted to App so it is shared across pages
  const [savedRoommates, setSavedRoommates] = useState([])

  // Toggle save / unsave a roommate
  const handleSave = (roommate) => {
    setSavedRoommates(prev => {
      const alreadySaved = prev.find(r => r.id === roommate.id)
      if (alreadySaved) {
        return prev.filter(r => r.id !== roommate.id)  // Remove
      }
      return [...prev, roommate]  // Add
    })
  }

  const isSaved = (id) => savedRoommates.some(r => r.id === id)

  return (
    <div className="app">
      <Navbar savedCount={savedRoommates.length} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/find-roommates"
            element={
              <FindRoommates
                onSave={handleSave}
                isSaved={isSaved}
              />
            }
          />
          <Route
            path="/roommate/:id"
            element={
              <RoommateDetails
                onSave={handleSave}
                isSaved={isSaved}
              />
            }
          />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route
            path="/saved"
            element={
              <SavedRoommates
                savedRoommates={savedRoommates}
                onSave={handleSave}
                isSaved={isSaved}
              />
            }
          />
          <Route path="/about" element={<AboutRoomieSync />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
