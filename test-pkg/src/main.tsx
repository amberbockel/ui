import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

// Default to light mode on first visit (workaround until useTheme defaultTheme fix is published)
if (!localStorage.getItem('amberbockel-theme')) {
  localStorage.setItem('amberbockel-theme', 'light')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
