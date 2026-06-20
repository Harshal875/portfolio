import './styles/About.css'

const About = () => {
  return (
    <div className="about-section section-container" id="about">
      <div className="about-inner">
        <h3 className="title about-label">About Me</h3>
        <p className="para about-text">
          B.Tech CSE (AI) at PEC Chandigarh. Data Engineer Intern at CVENT. I build across the full stack — backend APIs, real-time data pipelines, LLM systems, and the infra that ties them together. Equally comfortable shipping a FastAPI service, designing a Kafka topology, or fine-tuning a model. I care about the whole system, not just one layer.
        </p>
        <div className="about-stats">
          <div className="about-stat">
            <span className="stat-num">2027</span>
            <span className="stat-label">Grad Year</span>
          </div>
          <div className="about-stat">
            <span className="stat-num">4+</span>
            <span className="stat-label">Projects Shipped</span>
          </div>
          <div className="about-stat">
            <span className="stat-num">1yr</span>
            <span className="stat-label">Industry Exp</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About



