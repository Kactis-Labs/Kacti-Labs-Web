import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Lenis from 'lenis'
import './index.css'
import App from './App.jsx'

// ── Lenis smooth scroll ───────────────────────────────────────────────────────
const lenis = new Lenis({
  lerp: 0.1,           // Smoothness (lower = smoother, 0.1 feels premium)
  smoothWheel: true,
  touchMultiplier: 1.5,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Expose to window so anchor links work (framer-motion + lenis compatible)
window.__lenis = lenis

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
