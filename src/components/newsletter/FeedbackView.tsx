import { useState } from 'react';
import { Header } from './Header';
import type { AccountSettings } from '../../types/newsletter';


interface FeedbackData {
  name: string;
  email: string;
  rating: number;
  comment: string;
  category: 'general' | 'bug' | 'feature' | 'support';
}

interface FeedbackViewProps {
  setCurrentView: (view: string) => void;
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
}

export function FeedbackView({ 
  setCurrentView,
  accountSettings,
  setAccountSettings
}: FeedbackViewProps) {
  const [formData, setFormData] = useState<FeedbackData>({
    name: '',
    email: '',
    rating: 0,
    comment: '',
    category: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    // Save feedback to localStorage
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    const newFeedback = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('feedbacks', JSON.stringify([newFeedback, ...feedbacks]));
    
    alert('Thank you for your feedback!');
    setCurrentView('home');
  };

  return (
    <div>
      <Header 
        setCurrentView={setCurrentView}
        accountSettings={accountSettings}
        setAccountSettings={setAccountSettings}
        searchQuery=""
        setSearchQuery={() => {}}
      />
      
      <div className="feedback-container">
        <div className="feedback-header">
          <div className="header-navigation">
            <button 
              className="btn btn-secondary back-button"
              onClick={() => setCurrentView('home')}
            >
              ← Back to Home
            </button>
          </div>
          <h1>Share Your Thoughts</h1>
          <p className="feedback-subtitle">We value your feedback to improve our services</p>
        </div>
      
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="feedback-form-intro">
          <p>Your feedback helps us improve our newsletter platform. Please fill out the form below.</p>
        </div>
        
        <div className="form-row">
          <div className="form-group name-field">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group email-field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="form-group rating-group">
          <label>How would you rate our platform? *</label>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`rating-star ${star <= formData.rating ? 'active' : ''}`}
                onClick={() => setFormData({...formData, rating: star})}
              >
                ★
              </span>
            ))}
            {formData.rating > 0 && (
              <span className="rating-text">
                {formData.rating === 1 && "Poor"}
                {formData.rating === 2 && "Fair"}
                {formData.rating === 3 && "Good"}
                {formData.rating === 4 && "Very Good"}
                {formData.rating === 5 && "Excellent"}
              </span>
            )}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="category">What area are you providing feedback on? *</label>
          <select
            id="category"
            className="form-input"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value as FeedbackData['category']})}
            required
          >
            <option value="general">General Feedback</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="support">Support Question</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="comment">Tell us more about your experience</label>
          <textarea
            id="comment"
            className="form-textarea"
            rows={4}
            placeholder="Please share your thoughts, suggestions, or issues..."
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
          />
        </div>
        
        <div className="form-submit-container">
          <button type="submit" className="btn btn-primary submit-button">
            Submit Feedback
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default FeedbackView;