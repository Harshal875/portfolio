import { useRef, useState, useEffect } from 'react'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'
import { SiPypi } from 'react-icons/si'
import './styles/Work.css'

const PROJECTS = [
  {
    num: '01',
    name: 'KrayBot',
    category: 'SaaS · Full-Stack',
    desc: 'IndiaMART lead capture SaaS — polls live feed every 2–4s, auto-accepts leads before competitors react. Full-stack with Next.js dashboard, Python engine, Razorpay payments & Clerk auth.',
    stack: ['Next.js', 'TypeScript', 'Python', 'Prisma', 'Turso', 'Clerk', 'Razorpay'],
    github: '',
    live: 'https://kraybot.com',
    liveLabel: 'Live Product',
    liveIcon: 'external',
    badge: '500+ Sellers · 12K+ Leads/day',
    visual: 'kraybot' as const,
  },
  {
    num: '02',
    name: 'Market Intelligence',
    category: 'Infrastructure · Distributed Systems',
    desc: 'Event-driven pipeline ingesting live order book data from Binance WebSocket streams. 11 Docker containers, Kafka, TimescaleDB, gRPC service at sub-ms latency, GraphQL subscriptions.',
    stack: ['Python', 'Kafka', 'gRPC', 'TimescaleDB', 'Elasticsearch', 'Redis', 'Docker'],
    github: 'https://github.com/Harshal875/realtime-crypto-data-infra',
    live: '',
    liveLabel: '',
    liveIcon: '',
    badge: '11 Containers · 3.6K ticks/min',
    visual: 'market' as const,
  },
  {
    num: '03',
    name: 'Trubeca Lifesciences',
    category: 'Client Work · Full-Stack · Web',
    desc: 'Ground-up rebuild of a pharma website. 118 products across 7 categories with dynamic routing — generating 100+ SEO-indexed URLs, sitemap.xml, Open Graph metadata & WhatsApp CTA.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React 19'],
    github: 'https://github.com/Harshal875/trubeca-website',
    live: 'https://trubeca.com',
    liveLabel: 'Live Site',
    liveIcon: 'external',
    badge: '118 Products · 100+ SEO URLs',
    visual: 'trubeca' as const,
  },
  {
    num: '04',
    name: 'fenestr',
    category: 'Open Source · Python · PyPI',
    desc: 'Lightweight Python library that renders YouTube videos and websites inside Jupyter Notebook cells via iframes. Auto-detects content type, full CI/CD pipeline via GitHub Actions.',
    stack: ['Python', 'Jupyter', 'PyPI', 'GitHub Actions', 'tox'],
    github: 'https://github.com/Harshal875/fenestr',
    live: 'https://pypi.org/project/fenestr/',
    liveLabel: 'PyPI',
    liveIcon: 'pypi',
    badge: 'Published on PyPI',
    visual: 'fenestr' as const,
  },
]

// ─── Per-project decorative visuals ──────────────────────────────────────────

const LEAD_LINES = [
  { city: 'Mumbai',    ms: '247', kw: 'pharma bulk'     },
  { city: 'Delhi',     ms: '189', kw: 'api integration' },
  { city: 'Pune',      ms: '312', kw: 'saas leads'      },
  { city: 'Bangalore', ms: '203', kw: 'indiamart bot'   },
  { city: 'Hyderabad', ms: '274', kw: 'lead capture'    },
]

const VisualKrayBot = () => (
  <div className="proj-visual v-kraybot">
    <div className="vk-term">
      <div className="vk-term-bar">
        <span className="vk-tb-dot" style={{ background: '#ff5f57' }} />
        <span className="vk-tb-dot" style={{ background: '#febc2e' }} />
        <span className="vk-tb-dot" style={{ background: '#28c840' }} />
        <span className="vk-tb-title">kraybot · live feed</span>
      </div>
      <div className="vk-term-body">
        <div className="vk-line vk-cmd" style={{ '--d': '0s' } as React.CSSProperties}>
          <span className="vk-prompt">$</span> python kraybot.py --seller=demo
        </div>
        <div className="vk-line vk-info" style={{ '--d': '0.2s' } as React.CSSProperties}>
          Connecting to IndiaMART feed...
        </div>
        <div className="vk-line vk-ok" style={{ '--d': '0.4s' } as React.CSSProperties}>
          ● Feed live · polling every 3s
        </div>
        {LEAD_LINES.map((l, i) => (
          <div
            key={i}
            className="vk-line vk-lead"
            style={{ '--d': `${0.6 + i * 0.18}s` } as React.CSSProperties}
          >
            <span className="vk-ms">[{l.ms}ms]</span>
            <span className="vk-lead-city">{l.city}</span>
            <span className="vk-kw">&quot;{l.kw}&quot;</span>
            <span className="vk-accept">✓ ACCEPTED</span>
          </div>
        ))}
        <div className="vk-line vk-stat" style={{ '--d': '1.7s' } as React.CSSProperties}>
          <span className="vk-stat-total">12,847</span> leads captured today
          <span className="vk-cursor" />
        </div>
      </div>
    </div>
  </div>
)

const BAR_HEIGHTS = [38, 62, 44, 78, 52, 88, 66, 74, 58, 92, 48, 70, 84, 55, 96]
const BAR_COLORS = [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1] // 1=green 0=red

const VisualMarket = () => (
  <div className="proj-visual v-market">
    <div className="vm-header">
      <span className="vm-ticker">BTC / USDT</span>
      <span className="vm-price">43,218.40</span>
      <span className="vm-change positive">+2.41%</span>
    </div>
    <div className="vm-chart">
      {BAR_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className={`vm-bar ${BAR_COLORS[i] ? 'vm-green' : 'vm-red'}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
    <div className="vm-footer">
      <span className="vm-tag">Kafka</span>
      <span className="vm-tag">gRPC</span>
      <span className="vm-tag">sub-ms latency</span>
    </div>
  </div>
)

const VisualTrubeca = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.43)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / 1440)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="proj-visual vt-iframe-wrap" ref={wrapRef}>
      <iframe
        src="https://trubeca.com"
        title="Trubeca Lifesciences live preview"
        loading="lazy"
        className="vt-iframe"
        style={{
          transform: `scale(${scale})`,
          height: `${320 / scale}px`,
        }}
      />
      <div className="vt-iframe-fade" />
    </div>
  )
}

const VisualFenestr = () => (
  <div className="proj-visual v-fenestr">
    <div className="vf-install">
      <span className="vf-prompt">$</span>
      <span className="vf-install-cmd">pip install fenestr</span>
      <span className="vf-install-ok">✓ installed</span>
    </div>
    <div className="vf-cell">
      <div className="vf-prompt">In [1]:</div>
      <div className="vf-code">
        <span className="vf-kw">from</span>
        <span className="vf-plain"> fenestr </span>
        <span className="vf-kw">import</span>
        <span className="vf-plain"> YouTube</span>
        <br />
        <span className="vf-plain">YouTube(</span>
        <span className="vf-str">&quot;dQw4w9WgXcQ&quot;</span>
        <span className="vf-plain">).show()</span>
      </div>
    </div>
    <div className="vf-output">
      <div className="vf-iframe-mock">
        <div className="vf-iframe-bar">
          <span />
          <span />
          <span />
          <span className="vf-url">youtube.com/watch?v=dQw…</span>
        </div>
        <div className="vf-iframe-content" />
      </div>
    </div>
    <div className="vf-pypi-badge">
      <SiPypi size={12} /> PyPI
    </div>
  </div>
)

const VISUALS = {
  kraybot: VisualKrayBot,
  market: VisualMarket,
  trubeca: VisualTrubeca,
  fenestr: VisualFenestr,
}

// ─── Card ─────────────────────────────────────────────────────────────────────

const ProjectCard = ({ p }: { p: typeof PROJECTS[number] }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const Visual = VISUALS[p.visual]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-6px)`
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
  }

  return (
    <div
      className="proj-card work-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Visual panel */}
      <div className="proj-visual-wrap">
        <Visual />
      </div>

      {/* Info panel */}
      <div className="proj-body">
        <div className="proj-header-row">
          <div>
            <span className="proj-num">{p.num}</span>
            <h3 className="proj-name">{p.name}</h3>
            <span className="proj-category">{p.category}</span>
          </div>
          <div className="proj-actions">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-icon-btn"
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
                className="proj-icon-btn"
                data-cursor="disable"
                aria-label={p.liveLabel}
              >
                {p.liveIcon === 'pypi' ? <SiPypi /> : <FiArrowUpRight />}
              </a>
            )}
          </div>
        </div>

        {p.badge && <span className="proj-badge">{p.badge}</span>}
        <p className="proj-desc">{p.desc}</p>

        <div className="proj-stack">
          {p.stack.map((s) => (
            <span key={s} className="proj-pill">{s}</span>
          ))}
        </div>
      </div>

      {/* Gradient border glow */}
      <div className="proj-border-glow" />
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="section-container">
        <h2 className="work-heading">
          My <span className="work-accent">Work</span>
        </h2>
        <div className="work-bento">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.num} p={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work
