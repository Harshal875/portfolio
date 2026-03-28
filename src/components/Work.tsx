import { FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { SiPypi } from 'react-icons/si'
import './styles/Work.css'

const PROJECTS = [
  {
    num: '01',
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
  {
    num: '02',
    name: 'Next Project',
    category: 'Coming Soon',
    desc: "Something's in the works.",
    stack: '',
    github: '',
    live: '',
    liveLabel: '',
    liveIcon: '',
    badge: '',
    placeholder: true,
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
