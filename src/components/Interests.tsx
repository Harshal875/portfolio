import { FiMapPin, FiMusic, FiActivity } from 'react-icons/fi'
import { MdOutlineSportsTennis, MdMicNone } from 'react-icons/md'
import './styles/Interests.css'

const INTERESTS = [
  {
    icon: <FiMapPin />,
    title: 'Travel',
    desc: 'Exploring new places, one route at a time. Mountains to metros.',
    accent: '#ff6b6b',
    span: true,
  },
  {
    icon: <FiMusic />,
    title: 'Music',
    desc: 'Always got something playing.',
    accent: '#7f40ff',
  },
  {
    icon: <MdMicNone />,
    title: 'Singing',
    desc: 'More than just listening.',
    accent: '#c2a4ff',
  },
  {
    icon: <MdOutlineSportsTennis />,
    title: 'Table Tennis',
    desc: 'Fast reflexes, off the screen too.',
    accent: '#40c8ff',
  },
  {
    icon: <FiActivity />,
    title: 'Building',
    desc: "Can't turn it off.",
    accent: '#40ff8f',
  },
]

const Interests = () => {
  return (
    <div className="interests-section section-container" id="interests">
      <div className="interests-header">
        <h2 className="interests-heading">
          Beyond the<br />
          <span className="interests-accent">Terminal</span>
        </h2>
        <p className="interests-sub">Things I do when I&apos;m not building.</p>
      </div>
      <div className="interests-grid">
        {INTERESTS.map((item, i) => (
          <div
            key={i}
            className={`interest-card${item.span ? ' interest-span' : ''}`}
            style={{ '--card-accent': item.accent } as React.CSSProperties}
          >
            <div className="interest-icon">{item.icon}</div>
            <h3 className="interest-title">{item.title}</h3>
            <p className="interest-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Interests
