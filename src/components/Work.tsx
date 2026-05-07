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
    name: 'Real-Time Market Intelligence Platform',
    category: 'Infrastructure · Distributed Systems · Quant',
    desc: 'End-to-end event-driven market data pipeline ingesting live Level-1 order book data from Binance WebSocket streams for BTC, ETH, SOL — processing ~3,600 ticks/min per symbol. 11 Docker containers: Kafka broker, TimescaleDB hypertables, Elasticsearch, Redis Pub/Sub, and a gRPC order book service (4 RPCs, sub-ms latency). Includes real-time OHLCV + VWAP computation and a GraphQL API (Strawberry + FastAPI) with WebSocket subscriptions.',
    stack: 'Python · Kafka · gRPC · Protobuf · TimescaleDB · Elasticsearch · Redis · GraphQL · FastAPI · Docker',
    github: 'https://github.com/Harshal875/realtime-crypto-data-infra',
    live: '',
    liveLabel: '',
    liveIcon: '',
    badge: 'Distributed Systems · 11 Containers',
  },
  {
    num: '03',
    name: 'Trubeca Lifesciences',
    category: 'Client Work · Full-Stack · Web',
    desc: 'Complete ground-up rebuild of a pharmaceutical company website replacing an outdated WordPress template. Migrated 118 products across 7 categories into a structured data layer with dynamic routing (/products/[slug]) — generating 100+ individually SEO-indexed URLs. Built category filtering, search, auto-generated sitemap.xml, per-page Open Graph metadata, Framer Motion animations, and a sticky WhatsApp CTA critical for Indian pharma distributors.',
    stack: 'Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · React 19',
    github: 'https://github.com/Harshal875/trubeca-website',
    live: 'https://trubeca.com',
    liveLabel: 'Live Site',
    liveIcon: 'external',
    badge: '118 Products · 8 Pages',
  },
  {
    num: '04',
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
            <div className="work-box" key={p.num}>
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
