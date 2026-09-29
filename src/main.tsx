import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app.tsx'

const div = document.getElementById('root')

if (!div) {
  throw new Error('root div not found')
}

createRoot(div).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
