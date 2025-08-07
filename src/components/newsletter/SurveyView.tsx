import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Star } from 'lucide-react';
import type { AccountSettings, ViewType } from '../../types/newsletter';
import { ThemeToggle } from '../ThemeToggle';
import { Logo } from '../Logo';


interface SurveyViewProps {
  setCurrentView: (view: ViewType) => void;
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
}

interface SurveyData {
  jobSatisfaction: number;
  workLifeBalance: number;
  teamCollaboration: number;
  managementSupport: number;
  careerDevelopment: number;
  workEnvironment: number;
  feedback: string;
  improvements: string;
  recommend: number;
}

export function SurveyView({ setCurrentView, accountSettings, setAccountSettings }: SurveyViewProps) {
  const [surveyData, setSurveyData] = useState<SurveyData>({
    jobSatisfaction: 0,
    workLifeBalance: 0,
    teamCollaboration: 0,
    managementSupport: 0,
    careerDevelopment: 0,
    workEnvironment: 0,
    feedback: '',
    improvements: '',
    recommend: 0
  });

  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (field: keyof SurveyData, rating: number) => {
    setSurveyData({ ...surveyData, [field]: rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const emailContent = `Employee Survey Results:

Ratings (1-5 stars):
• Job Satisfaction: ${surveyData.jobSatisfaction}/5
• Work-Life Balance: ${surveyData.workLifeBalance}/5
• Team Collaboration: ${surveyData.teamCollaboration}/5
• Management Support: ${surveyData.managementSupport}/5
• Career Development: ${surveyData.careerDevelopment}/5
• Work Environment: ${surveyData.workEnvironment}/5
• Recommendation Score: ${surveyData.recommend}/5

Feedback:
${surveyData.feedback || 'No feedback provided'}

Suggested Improvements:
${surveyData.improvements || 'No suggestions provided'}

Submitted on: ${new Date().toLocaleString()}`;

      // Using EmailJS service
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: 'service_newsletter',
          template_id: 'template_survey',
          user_id: 'YOUR_EMAILJS_USER_ID',
          template_params: {
            to_email: 'chimahobiekunnie@gmail.com',
            from_name: 'Newsletter Platform',
            subject: 'Employee Survey Submission',
            message: emailContent
          }
        })
      });
    } catch {
      // Fallback: Use Web3Forms (no signup required)
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            access_key: 'YOUR_WEB3FORMS_KEY',
            subject: 'Employee Survey Submission',
            email: 'chimahobiekunnie@gmail.com',
            message: `Employee Survey Results:

Ratings (1-5 stars):
• Job Satisfaction: ${surveyData.jobSatisfaction}/5
• Work-Life Balance: ${surveyData.workLifeBalance}/5
• Team Collaboration: ${surveyData.teamCollaboration}/5
• Management Support: ${surveyData.managementSupport}/5
• Career Development: ${surveyData.careerDevelopment}/5
• Work Environment: ${surveyData.workEnvironment}/5
• Recommendation Score: ${surveyData.recommend}/5

Feedback: ${surveyData.feedback || 'No feedback provided'}

Suggested Improvements: ${surveyData.improvements || 'No suggestions provided'}

Submitted on: ${new Date().toLocaleString()}`
          })
        });
      } catch {
        console.log('Email sending failed');
      }
    }
    
    setSubmitted(true);
    setTimeout(() => {
      setCurrentView('home');
    }, 2000);
  };

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star ${star <= rating ? 'active' : ''}`}
          onClick={() => onRatingChange(star)}
        >
          <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div className="survey-success">
        <div className="success-content">
          <div className="success-icon">✨</div>
          <h2>Thank You!</h2>
          <p>Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="header">
        <div className="container header-container">
          <div className="header-brand">
            <button onClick={() => setCurrentView('home')} className="header-logo">
              <Logo />
            </button>
            <span className="header-divider">|</span>
            <span className="header-title">Employee Survey</span>
          </div>
          <div className="header-actions">
            <ThemeToggle 
              accountSettings={accountSettings} 
              setAccountSettings={setAccountSettings}
              className="header-theme-toggle"
            />
            <button onClick={() => setCurrentView('home')} className="btn-secondary">
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="survey-container">
        <div className="survey-card">
          <div className="survey-header">
            <h1>Employee Satisfaction Survey</h1>
            <p>Help us improve your workplace experience by sharing your feedback.</p>
          </div>

          <form onSubmit={handleSubmit} className="survey-form">
            <div className="survey-section">
              <h3>Rate Your Experience</h3>
              
              <div className="survey-question">
                <label>Job Satisfaction</label>
                <StarRating 
                  rating={surveyData.jobSatisfaction} 
                  onRatingChange={(rating) => handleRatingChange('jobSatisfaction', rating)} 
                />
              </div>

              <div className="survey-question">
                <label>Work-Life Balance</label>
                <StarRating 
                  rating={surveyData.workLifeBalance} 
                  onRatingChange={(rating) => handleRatingChange('workLifeBalance', rating)} 
                />
              </div>

              <div className="survey-question">
                <label>Team Collaboration</label>
                <StarRating 
                  rating={surveyData.teamCollaboration} 
                  onRatingChange={(rating) => handleRatingChange('teamCollaboration', rating)} 
                />
              </div>

              <div className="survey-question">
                <label>Management Support</label>
                <StarRating 
                  rating={surveyData.managementSupport} 
                  onRatingChange={(rating) => handleRatingChange('managementSupport', rating)} 
                />
              </div>

              <div className="survey-question">
                <label>Career Development Opportunities</label>
                <StarRating 
                  rating={surveyData.careerDevelopment} 
                  onRatingChange={(rating) => handleRatingChange('careerDevelopment', rating)} 
                />
              </div>

              <div className="survey-question">
                <label>Work Environment</label>
                <StarRating 
                  rating={surveyData.workEnvironment} 
                  onRatingChange={(rating) => handleRatingChange('workEnvironment', rating)} 
                />
              </div>
            </div>

            <div className="survey-section">
              <h3>Additional Feedback</h3>
              
              <div className="survey-question">
                <label>What do you enjoy most about working here?</label>
                <textarea
                  value={surveyData.feedback}
                  onChange={(e) => setSurveyData({ ...surveyData, feedback: e.target.value })}
                  className="survey-textarea"
                  placeholder="Share your thoughts..."
                  rows={4}
                />
              </div>

              <div className="survey-question">
                <label>What areas could we improve?</label>
                <textarea
                  value={surveyData.improvements}
                  onChange={(e) => setSurveyData({ ...surveyData, improvements: e.target.value })}
                  className="survey-textarea"
                  placeholder="Your suggestions..."
                  rows={4}
                />
              </div>

              <div className="survey-question">
                <label>How likely are you to recommend this company as a great place to work?</label>
                <StarRating 
                  rating={surveyData.recommend} 
                  onRatingChange={(rating) => handleRatingChange('recommend', rating)} 
                />
              </div>
            </div>


            <div className="survey-actions">
              <button type="submit" className="btn-primary survey-submit">
                <Send size={16} />
                Submit Survey
              </button>
              <p className="survey-note">Survey results will be sent to chimahobiekunnie@gmail.com</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}