import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/newsletter.css'
import './styles/theme.css'
import './styles/header-theme-toggle.css'
import './styles/dark-mode-text.css'
import './styles/feedback.css'
import './styles/task-manager.css'
import './styles/login-dark.css'
import './styles/brand-font.css'

import NewsletterPlatform from './components/NewsletterPlatform'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <NewsletterPlatform />
  </StrictMode>,
)