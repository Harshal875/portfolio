import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize lenis smooth scroll + GSAP ScrollTrigger integration
import './utils/lenis'

createRoot(document.getElementById('root')!).render(
  <App />
)
