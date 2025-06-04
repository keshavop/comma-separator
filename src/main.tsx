import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initGA } from './utils/analytics'

// Initialize Google Analytics
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
if (gaMeasurementId) {
  initGA(gaMeasurementId)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
