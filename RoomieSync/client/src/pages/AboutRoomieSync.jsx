import React from 'react'
import { Link } from 'react-router-dom'

// ══════════════════════════════════════════════════════════════
// AboutRoomieSync – CLASS COMPONENT (Required for CIE-2)
// This is the ONLY class component in the project.
// All other components are functional components.
// ══════════════════════════════════════════════════════════════
class AboutRoomieSync extends React.Component {

  // Class component MUST have a constructor to initialize state
  constructor(props) {
    super(props)
    // Class component state initialized with this.state
    this.state = {
      activeStep: null,   // Tracks which "How It Works" step is expanded
      showScore:  false   // Toggle compatibility score explanation
    }
  }

  // Class component lifecycle method (equivalent to useEffect on mount)
  componentDidMount() {
    // Simulate setting page title on mount
    document.title = 'About – RoomieSync'
  }

  componentWillUnmount() {
    // Reset page title when component unmounts
    document.title = 'RoomieSync – Smart Roommate Finder'
  }

  // Event handler bound to class instance
  handleStepClick = (stepIndex) => {
    this.setState(prev => ({
      activeStep: prev.activeStep === stepIndex ? null : stepIndex
    }))
  }

  toggleScore = () => {
    this.setState(prev => ({ showScore: !prev.showScore }))
  }

  // render() is REQUIRED in class components
  render() {
    const { activeStep, showScore } = this.state

    const steps = [
      {
        icon: '📝',
        title: 'Create Your Profile',
        desc: 'Sign up and fill in your name, age, location, budget, and lifestyle preferences such as sleep schedule, food preference, smoking habits, and pet policy.'
      },
      {
        icon: '🔍',
        title: 'Browse & Filter',
        desc: 'Browse hundreds of student profiles. Use our powerful search and filter tool to narrow down by location, budget, smoking preference, and pet policy.'
      },
      {
        icon: '💯',
        title: 'Check Compatibility',
        desc: 'Our compatibility algorithm compares your preferences with each roommate profile and gives a percentage match score so you can quickly identify the best fits.'
      },
      {
        icon: '🤝',
        title: 'Connect & Move In',
        desc: 'Found a great match? Hit Connect to send them a message, coordinate your move-in details, and start your shared living journey together.'
      }
    ]

    const compatFactors = [
      { factor: 'Budget Match',         points: 20 },
      { factor: 'Location Match',       points: 20 },
      { factor: 'Sleep Schedule',       points: 15 },
      { factor: 'Food Preference',      points: 15 },
      { factor: 'Smoking Preference',   points: 15 },
      { factor: 'Pet Preference',       points: 15 },
    ]

    return (
      <div>
        {/* Page Header */}
        <div className="page-header">
          <h1>About RoomieSync</h1>
          <p>Learn more about our platform and how we help students find roommates</p>
        </div>

        <div className="about-container">

          {/* About Hero */}
          <div className="about-hero">
            <div className="about-logo">🏠</div>
            <h1>RoomieSync</h1>
            <p>
              <em>"Find a roommate who matches your lifestyle."</em>
            </p>
          </div>

          {/* Mission Cards */}
          <div className="about-cards">
            <div className="about-card">
              <div className="card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                RoomieSync was built to solve one of the biggest challenges students face –
                finding a compatible roommate. We make the process simple, transparent, and free.
              </p>
            </div>
            <div className="about-card">
              <div className="card-icon">🏫</div>
              <h3>Student First</h3>
              <p>
                Designed exclusively for college students. Everything about RoomieSync –
                from the budget ranges to the lifestyle filters – is built with student life in mind.
              </p>
            </div>
            <div className="about-card">
              <div className="card-icon">🔒</div>
              <h3>Safe &amp; Simple</h3>
              <p>
                No complicated registration. No hidden charges. Just fill in your preferences,
                browse profiles, and connect with people who match your lifestyle.
              </p>
            </div>
          </div>

          {/* How It Works – Interactive (class state) */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', color: '#1e1b4b' }}>
              📖 How It Works
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {steps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    background: activeStep === index ? '#ede9fe' : '#fff',
                    border: `1.5px solid ${activeStep === index ? '#6c63ff' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    padding: '18px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => this.handleStepClick(index)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.4rem' }}>{step.icon}</span>
                    <strong style={{ color: '#1e1b4b', fontSize: '0.98rem' }}>
                      Step {index + 1}: {step.title}
                    </strong>
                    <span style={{ marginLeft: 'auto', color: '#6c63ff', fontSize: '1.1rem' }}>
                      {activeStep === index ? '▲' : '▼'}
                    </span>
                  </div>
                  {activeStep === index && (
                    <p style={{ marginTop: '12px', color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility Score Explanation (class state toggle) */}
          <div className="compat-explainer">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <h3>💯 Compatibility Score – How It's Calculated</h3>
              <button
                className="btn btn-outline btn-sm"
                onClick={this.toggleScore}
              >
                {showScore ? 'Hide Details ▲' : 'Show Details ▼'}
              </button>
            </div>

            {showScore && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', marginBottom: '14px' }}>
                  Our algorithm compares your preferences against each roommate and awards points:
                </p>
                {compatFactors.map((item, i) => (
                  <div key={i} className="compat-row">
                    <span>{item.factor}</span>
                    <span className="compat-pts">+{item.points} pts</span>
                  </div>
                ))}
                <div className="compat-row" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  <span>Total Possible</span>
                  <span className="compat-pts">100 pts = 100%</span>
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px', color: '#1e1b4b' }}>
              Ready to Get Started?
            </h2>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/create-profile" className="btn btn-primary">
                📝 Create Your Profile
              </Link>
              <Link to="/find-roommates" className="btn btn-outline">
                🔍 Find Roommates
              </Link>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default AboutRoomieSync
