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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewsletterPlatform />
  </StrictMode>,
)