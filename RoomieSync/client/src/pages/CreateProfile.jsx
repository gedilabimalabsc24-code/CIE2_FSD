import { useState } from 'react'
import { Link } from 'react-router-dom'

// Initial empty form state
const emptyForm = {
  name:           '',
  age:            '',
  location:       '',
  budget:         '',
  occupation:     '',
  sleepSchedule:  'Night Owl',
  foodPreference: 'Vegetarian',
  smoking:        'No',
  pets:           'No',
  bio:            ''
}

// ──────────────────────────────────────────────────────────────
// CreateProfile – Functional Component
// Demonstrates: controlled form inputs, useState, onSubmit,
//               onChange, fetch POST to Express API
// ──────────────────────────────────────────────────────────────
function CreateProfile() {
  const [form, setForm]           = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState(null)
  const [newProfile, setNewProfile] = useState(null)

  // Generic onChange handler – updates the relevant field in form state
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault()  // Prevent default browser form submission
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/roommates', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form)
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'Submission failed')
      }

      const created = await response.json()
      setNewProfile(created)
      setSubmitted(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Reset form and go back to create mode
  const handleCreateAnother = () => {
    setForm(emptyForm)
    setSubmitted(false)
    setNewProfile(null)
    setError(null)
  }

  // ── Success State ─────────────────────────────────────────────
  if (submitted && newProfile) {
    return (
      <div>
        <div className="page-header">
          <h1>✅ Profile Created!</h1>
          <p>Your roommate profile has been added successfully.</p>
        </div>
        <div className="form-container">
          <div className="form-card">
            <div className="success-message">
              <div className="success-icon">🎉</div>
              <h2>Welcome to RoomieSync!</h2>
              <p>
                Your profile has been created with a compatibility score of{' '}
                <strong style={{ color: '#6c63ff' }}>{newProfile.compatibility}%</strong>.
              </p>
              <p style={{ marginTop: '8px', marginBottom: '28px' }}>
                Other students can now find and connect with you.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/find-roommates" className="btn btn-primary">
                  🔍 Find Your Roommate
                </Link>
                <button className="btn btn-outline" onClick={handleCreateAnother}>
                  + Create Another Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>📝 Create Your Profile</h1>
        <p>Tell us about yourself and your preferences to find the best roommates</p>
      </div>

      <div className="form-container">
        <div className="form-card">
          <h2>Your Details</h2>
          <p className="form-subtitle">
            Fill in the form below. All fields marked with * are required.
          </p>

          {error && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Ananya Sharma"
                  required
                />
              </div>

              {/* Age */}
              <div className="form-group">
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="e.g. 21"
                  min="16"
                  max="40"
                  required
                />
              </div>

              {/* Location */}
              <div className="form-group">
                <label htmlFor="location">City / Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore"
                  required
                />
              </div>

              {/* Budget */}
              <div className="form-group">
                <label htmlFor="budget">Monthly Budget (₹) *</label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="e.g. 8000"
                  min="1000"
                  required
                />
              </div>

              {/* Occupation */}
              <div className="form-group">
                <label htmlFor="occupation">Occupation / Course</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  placeholder="e.g. CS Student, MBA Student"
                />
              </div>

              {/* Sleep Schedule */}
              <div className="form-group">
                <label htmlFor="sleepSchedule">Sleep Schedule *</label>
                <select
                  id="sleepSchedule"
                  name="sleepSchedule"
                  value={form.sleepSchedule}
                  onChange={handleChange}
                >
                  <option value="Night Owl">Night Owl (Sleep late)</option>
                  <option value="Early Bird">Early Bird (Sleep early)</option>
                </select>
              </div>

              {/* Food Preference */}
              <div className="form-group">
                <label htmlFor="foodPreference">Food Preference *</label>
                <select
                  id="foodPreference"
                  name="foodPreference"
                  value={form.foodPreference}
                  onChange={handleChange}
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>

              {/* Smoking */}
              <div className="form-group">
                <label htmlFor="smoking">Smoking *</label>
                <select
                  id="smoking"
                  name="smoking"
                  value={form.smoking}
                  onChange={handleChange}
                >
                  <option value="No">Non-Smoker</option>
                  <option value="Yes">Smoker</option>
                </select>
              </div>

              {/* Pets */}
              <div className="form-group">
                <label htmlFor="pets">Pets *</label>
                <select
                  id="pets"
                  name="pets"
                  value={form.pets}
                  onChange={handleChange}
                >
                  <option value="No">No Pets</option>
                  <option value="Yes">Has / OK with Pets</option>
                </select>
              </div>

              {/* Bio */}
              <div className="form-group full-width">
                <label htmlFor="bio">Short Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell potential roommates a bit about yourself, your daily routine, and what you're looking for..."
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="form-submit">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ padding: '12px 36px', fontSize: '1rem' }}
              >
                {loading ? '⏳ Creating Profile...' : '🚀 Create My Profile'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProfile
