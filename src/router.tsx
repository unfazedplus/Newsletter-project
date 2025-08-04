import { createBrowserRouter } from 'react-router-dom';
import NewsletterPlatform from './components/NewsletterPlatform';
import FeedbackApp from './feedbackform/src/App';

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <NewsletterPlatform />,
  },
  {
    path: '/feedback',
    element: <FeedbackApp />,
  },
]);

export default router;