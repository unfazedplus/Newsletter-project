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
  console.error('Failed to find root element. Please ensure your HTML file contains a div with id="root".');
  document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">Application failed to load. Please refresh the page or contact support.</div>';
  throw new Error('Root element with id="root" not found in the DOM. Check your HTML file.');
}

createRoot(rootElement).render(
  <StrictMode>
    <NewsletterPlatform />
  </StrictMode>,
)