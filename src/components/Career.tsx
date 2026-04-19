import './styles/Career.css'

const CAREER = [
  {
    role: 'Data Engineer Intern',
    company: 'CVENT',
    period: 'Jan 2026 — Jun 2026',
    desc: 'Building and optimizing data pipelines powering analytics for 300K+ events worldwide. Working with Snowflake, dbt and Informatica to transform raw event streams into actionable intelligence.',
    current: true,
  },
  // Add more entries here as your career grows
]

const Career = () => {
  return (
    <div className="career-section" id="career">
      <div className="section-container">
        <h2 className="career-heading">
          Experience<span className="career-amp"> &</span>
          <br />Career
        </h2>
        <div className="career-body">
          <div className="career-timeline">
            <div className="career-timeline-line" />
          </div>
          <div className="career-entries">
            {CAREER.map((item, i) => (
              <div className="career-info-box" key={i}>
                <div className="career-info-top">
                  <div className="career-role-block">
                    <h4 className="career-role">{item.role}</h4>
                    <span className="career-company">{item.company}</span>
                  </div>
                  <div className="career-meta">
                    <span className="career-year">{item.period}</span>
                    {item.current && <span className="career-badge">NOW</span>}
                  </div>
                </div>
                <p className="career-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Career
