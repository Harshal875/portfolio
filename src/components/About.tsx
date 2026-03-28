import './styles/About.css'

const About = () => {
  return (
    <div className="about-section section-container" id="about">
      <div className="about-inner">
        <h3 className="title about-label">About Me</h3>
        <p className="para about-text">
          B.Tech CSE (AI) at PEC Chandigarh. Currently a Data Engineer Intern at CVENT. I build across the stack — backend APIs, ML pipelines, LLM systems, and the infra that keeps them running. Whether it&apos;s shipping a FastAPI service, fine-tuning a model, or wiring up a real-time data pipeline, I care about the whole system, not just one layer.
        </p>
        <div className="about-stats">
          <div className="about-stat">
            <span className="stat-num">2027</span>
            <span className="stat-label">Grad Year</span>
          </div>
          <div className="about-stat">
            <span className="stat-num">2+</span>
            <span className="stat-label">Projects Shipped</span>
          </div>
          <div className="about-stat">
            <span className="stat-num">6mo</span>
            <span className="stat-label">Industry Exp</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
