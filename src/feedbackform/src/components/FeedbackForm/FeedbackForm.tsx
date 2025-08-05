import { useState } from 'react';
import type { Feedback } from '../../types';
import styles from './FeedbackForm.module.css';

// Define component props
interface FeedbackFormProps {
  onSubmit: (feedback: Omit<Feedback, 'id' | 'timestamp'>) => void;
}

const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',              // Initialize empty name
    email: '',             // Initialize empty email
    rating: 0,             // Initialize with no rating selected
    comment: '',           // Initialize empty comment
    category: 'general' as Feedback['category'] // Default category
  });
  
  // Track if rating has been selected
  const [, setRatingSelected] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();    // Prevent page reload
    
    // Check if rating is selected
    if (formData.rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    // Call parent callback with form data
    onSubmit({
      ...formData         // Spread existing form data
    });
    
    // Reset form fields
    setFormData({
      name: '',
      email: '',
      rating: 0,
      comment: '',
      category: 'general'
    });
    setRatingSelected(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <br/>
      {/* Name input field */}
      <div className={styles.formGroup}>
        <label>Name *</label>
        <input
          type="text"
          placeholder='john_doe'
          value={formData.name} // Bind to state
          onChange={(e) => setFormData({...formData, name: e.target.value})} // Update state
          required            // Mandatory field
        />
      </div>
      
      {/* Email Field */}
      <div className={styles.formGroup}>
        <label>Email *</label>
        <input
          type="email"
          placeholder='example@example.com'
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>

      {/* Rating Field */}
      <div className={styles.formGroup}>
        <label>Rating *</label>
        <div className={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`${styles.ratingStar} ${
                star <= formData.rating ? styles.active : ''
              }`}
              onClick={() => {
                setFormData({...formData, rating: star});
                setRatingSelected(true);
              }}
            >
              ★
            </span>
          ))}
        </div>
        {formData.rating === 0 && <p className={styles.errorText}>Please select a rating</p>}
      </div>

      {/* Category Field */}
      <div className={styles.formGroup}>
        <label>Category *</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value as Feedback['category']})}
          required
        >
          <option value="general">General</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
          <option value="support">Support</option>
        </select>
      </div>

      {/* Comment Field */}
      <div className={styles.formGroup}>
        <label>Comment</label>
        <textarea
          value={formData.comment}
          onChange={(e) => setFormData({...formData, comment: e.target.value})}
          rows={4}
        />
      </div>
      
      {/* Submit button */}
      <button type="submit" className={styles.submitButton}>
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;