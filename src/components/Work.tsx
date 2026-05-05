import { FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { SiPypi } from 'react-icons/si'
import './styles/Work.css'

const PROJECTS = [
  {
    num: '01',
    name: 'KrayBot',
    category: 'Product · SaaS · Full-Stack',
    desc: 'IndiaMART lead capture SaaS with ~250ms response time — faster than any human. The bot polls the live feed every 2–4s, matches leads against your keywords, and auto-accepts before competitors react. Full-stack: Next.js dashboard, Python automation engine, Razorpay payments, Clerk auth, Turso DB. 500+ active sellers, 12,000+ leads captured daily.',
    stack: 'Next.js · TypeScript · Python · Prisma · Turso · Clerk · Razorpay · Railway · Vercel',
    github: '',
    live: 'https://kraybot.com',
    liveLabel: 'Live Product',
    liveIcon: 'external',
    badge: 'Live Product · ₹2,999–₹4,999/mo',
  },
  {
    num: '02',
    name: 'fenestr',
    category: 'Open Source · Python · PyPI',
    desc: 'Created a lightweight Python library that renders YouTube videos and websites directly inside Jupyter Notebook cells via iframes. Auto-detects content type, ships with class-based API, URL validation, custom exceptions, and a full CI/CD pipeline.',
    stack: 'Python · Jupyter · PyPI · GitHub Actions · tox',
    github: 'https://github.com/Harshal875/fenestr',
    live: 'https://pypi.org/project/fenestr/',
    liveLabel: 'PyPI',
    liveIcon: 'pypi',
    badge: 'Published on PyPI',
  },
]

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="section-container">
        <h2 className="work-heading">
          My <span className="work-accent">Work</span>
        </h2>
        <div className="work-grid">
          {PROJECTS.map((p) => (
            <div className={`work-box${p.placeholder ? ' work-placeholder' : ''}`} key={p.num}>
              <div className="work-num">{p.num}</div>
              <div className="work-info">
                <div className="work-title-row">
                  <h3 className="work-name">{p.name}</h3>
                  <div className="work-links">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-link-icon"
                        data-cursor="disable"
                        aria-label="GitHub"
                      >
                        <FiGithub />
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-link-icon"
                        data-cursor="disable"
                        aria-label={p.liveLabel}
                      >
                        {p.liveIcon === 'pypi' ? <SiPypi /> : <FiArrowUpRight />}
                      </a>
                    )}
                  </div>
                </div>
                <span className="work-category">{p.category}</span>
                {p.badge && <span className="work-badge">{p.badge}</span>}
                <p className="work-desc">{p.desc}</p>
                {p.stack && <p className="work-stack">{p.stack}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work
