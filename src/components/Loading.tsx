import './styles/Loading.css'

const Loading = () => {
  const terminalLines = [
    '> INITIALIZING SYSTEMS...',
    '> LOADING DATA PIPELINES...',
    '> SPINNING UP MODELS...',
    '> READY.',
  ]

  return (
    <div className="loader-wrapper">
      <div className="loader-inner">
        <div className="loader-name">
          <span className="loader-h">H</span>
          <span className="loader-b">B</span>
        </div>
        <div className="loader-terminal">
          {terminalLines.map((line, i) => (
            <div
              key={i}
              className={`loader-line${i === terminalLines.length - 1 ? ' loader-line-ready' : ''}`}
              style={{ animationDelay: `${i * 0.25}s` }}
            >
              {line}
            </div>
          ))}
        </div>
        <div className="loader-progress-track">
          <div className="loader-progress-fill" />
        </div>
      </div>
    </div>
  )
}

export default Loading
