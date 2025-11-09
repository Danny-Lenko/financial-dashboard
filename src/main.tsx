import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// TODO:
// 1. Add linter and prettier configurations
// 2. Set up absolute imports
// 3. Configure environment variables

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
