import { lazy, Suspense } from 'react'
import lenis from '../utils/lenis'
import './styles/Landing.css'

const NeuralScene = lazy(() => import('./NeuralHero/NeuralScene'))

const Landing = () => {
  const handleViewWork = (e: React.MouseEvent) => {
    e.preventDefault()
    lenis.scrollTo('#work', { duration: 1.4, offset: 0 })
  }

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    lenis.scrollTo('#contact', { duration: 1.4, offset: 0 })
  }

  return (
      <div className="landing-section" id="landingDiv">
      {/* Neural network canvas — full section background */}
      <div className="neural-canvas-wrapper">
        <Suspense fallback={null}>
          <NeuralScene />
        </Suspense>
      </div>

      {/* Left: Text content */}
      <div className="landing-content">
        <span className="landing-label">Hello, I&apos;m</span>
        <h1 className="landing-name">
          HARSHAL<span className="landing-name-dot">.</span>
        </h1>
        <div className="landing-role">
          <span className="landing-role-text">
            Data <span className="role-x">×</span> LLMOps Engineer
          </span>
        </div>
        <p className="landing-bio para">
          I like to build. Products, pipelines, models —<br />
          whatever the problem needs.
        </p>
        <div className="landing-cta">
          <a
            href="#work"
            className="cta-primary"
            data-cursor="disable"
            onClick={handleViewWork}
          >
            View Work
          </a>
          <a
            href="#contact"
            className="cta-secondary"
            data-cursor="disable"
            onClick={handleContact}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Right: Avatar with neural glow ring */}
      <div className="avatar-wrapper">
        <div className="avatar-ring-outer" />
        <div className="avatar-ring-inner" />
        <div className="avatar-img-wrap">
          <img
            src="/images/avatar.jpg"
            alt="Harshal Bansal"
            className="avatar-photo"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.style.background =
                  'radial-gradient(circle, #2a1a4a 0%, #0f0820 100%)'
                const initials = document.createElement('span')
                initials.className = 'avatar-initials'
                initials.textContent = 'HB'
                parent.appendChild(initials)
              }
            }}
          />
        </div>
        {/* Neural connector dots */}
        <div className="avatar-connector c1" />
        <div className="avatar-connector c2" />
        <div className="avatar-connector c3" />
      </div>

      {/* Ambient glow behind avatar */}
      <div className="landing-glow" />

      {/* Scroll indicator */}
      <div className="scroll-indicator" data-cursor="disable">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </div>
  )
}

export default Landing
