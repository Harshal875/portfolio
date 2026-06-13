import './styles/Achievements.css'

// ─── Placeholder — content coming soon ───────────────────────────────────────
const ACHIEVEMENTS: {
  num: string
  title: string
  org: string
  date: string
  desc: string
}[] = []

const Achievements = () => {
  return (
    <div className="achievements-section" id="achievements">
      <div className="section-container">
        <h2 className="achievements-heading">
          Achieve<span className="achievements-accent">ments</span>
        </h2>

        {ACHIEVEMENTS.length === 0 ? (
          <div className="achievements-placeholder">
            <span className="placeholder-dot" />
            <span className="placeholder-dot" />
            <span className="placeholder-dot" />
            <p>Content coming soon.</p>
          </div>
        ) : (
          <div className="achievements-list">
            {ACHIEVEMENTS.map((a) => (
              <div className="achievement-row" key={a.num}>
                <span className="achievement-num">{a.num}</span>
                <div className="achievement-body">
                  <div className="achievement-top">
                    <h3 className="achievement-title">{a.title}</h3>
                    <span className="achievement-date">{a.date}</span>
                  </div>
                  <span className="achievement-org">{a.org}</span>
                  {a.desc && <p className="achievement-desc">{a.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Achievements

