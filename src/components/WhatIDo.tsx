import { useEffect, useRef } from 'react'
import './styles/WhatIDo.css'

const CARDS = [
  {
    id: 0,
    heading: 'BUILD',
    sub: 'Products & APIs',
    body: 'End-to-end products — from FastAPI backends to React frontends. I architect systems for real-time communication (WebRTC, WebSocket), design RESTful APIs, and ship things that work reliably at scale.',
    tags: ['Python', 'FastAPI', 'React', 'Node.js', 'WebRTC', 'WebSocket', 'Nginx'],
  },
  {
    id: 1,
    heading: 'ENGINEER',
    sub: 'Data & ML Pipelines',
    body: 'Design and operate data infrastructure — streaming pipelines, warehouse transformations, caching layers. From raw events to clean, queryable data with latency that matters.',
    tags: ['Kafka', 'Snowflake', 'dbt', 'Redis', 'SQL', 'Airflow', 'Docker'],
  },
  {
    id: 2,
    heading: 'MODEL',
    sub: 'AI & LLMOps',
    body: 'Fine-tune, deploy, and monitor language models in production. RAG pipelines, prompt engineering, evaluation frameworks. Bridging the gap between a capable model and a reliable system.',
    tags: ['PyTorch', 'HuggingFace', 'LangChain', 'RAG', 'LLMOps', 'OpenAI', 'vLLM'],
  },
]

function handleCardClick(container: HTMLDivElement) {
  const isActive = container.classList.contains('card-active')
  const parent = container.parentElement
  if (!parent) return
  Array.from(parent.children).forEach((c) => {
    c.classList.remove('card-active', 'card-sibling')
  })
  if (!isActive) {
    container.classList.add('card-active')
    Array.from(parent.children).forEach((c) => {
      if (c !== container) c.classList.add('card-sibling')
    })
  }
}

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Touch: toggle on click
    if ('ontouchstart' in window) {
      containerRef.current.forEach((card) => {
        if (!card) return
        card.classList.remove('card-no-touch')
        const handler = () => handleCardClick(card)
        card.addEventListener('click', handler)
      })
    }
  }, [])

  return (
    <div className="whatido-section" id="whatido">
      <div className="whatido-container section-container">
        {/* Title side */}
        <div className="whatido-title">
          <h2>
            What I<br />
            <span className="whatido-accent">Build</span>
          </h2>
        </div>

        {/* Cards side */}
        <div className="whatido-cards">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              className="whatido-card card-no-touch"
              ref={(el) => { containerRef.current[i] = el }}
            >
              {/* Animated SVG borders */}
              <div className="card-border-h">
                <svg width="100%" height="1">
                  <line x1="0" y1="0" x2="100%" y2="0"
                    stroke="white" strokeWidth="1" strokeDasharray="5,5" />
                </svg>
              </div>
              <div className="card-corner" />

              <div className="card-content">
                <div className="card-head">
                  <h3>{card.heading}</h3>
                  <h4>{card.sub}</h4>
                </div>
                <p>{card.body}</p>
                <div className="card-tags">
                  {card.tags.map((t) => (
                    <span key={t} className="card-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="card-arrow" />
            </div>
          ))}
          {/* Bottom border */}
          <div className="card-border-h card-border-bottom">
            <svg width="100%" height="1">
              <line x1="0" y1="0" x2="100%" y2="0"
                stroke="white" strokeWidth="1" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatIDo
