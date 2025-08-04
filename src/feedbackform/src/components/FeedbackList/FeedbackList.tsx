import React from 'react';
import type { Feedback } from '../../types'; // Import Feedback interface
import styles from './FeedbackList.module.css'; // Import CSS module

// Define props interface for type safety
interface FeedbackListProps {
  feedbacks: Feedback[]; // Accepts array of feedbacks
  onDelete?: (id: number) => void; // Optional callback for deleting feedback
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks, onDelete }) => {
  return (
    // Main container for feedback list
    <div className={styles.feedbackList}>
      <h2>Recent Feedback</h2> {/* Section title */}
      <br/>
      {/* Map through feedback array */}
      {feedbacks.map((feedback) => (
        // Individual feedback card
        <div key={feedback.id} className={styles.feedbackCard}>
          
          {/* Header with name and category */}
          <div className={styles.feedbackHeader}>
            <h3>{feedback.name}</h3> {/* Customer name */}
            {/* Category badge with dynamic class */}
            <span className={`${styles.category} ${styles[feedback.category]}`}>
              {feedback.category} {/* Display category */}
            </span>
          </div>
          
          {/* Star rating display */}
          <div className={styles.rating}>
            {/* Full stars (★) for rating, empty stars (☆) for remaining */}
            {'★'.repeat(feedback.rating).padEnd(5, '☆')}
          </div>
          
          {/* Feedback comment */}
          <p className={styles.comment}>{feedback.comment}</p>
          
          {/* Metadata (timestamp) */}
          <div className={styles.meta}>
            <div>
              <span>{feedback.email}</span> {/* Display email */}
              <span> • {new Date(feedback.timestamp).toLocaleString()}</span>
            </div>
            {onDelete && (
              <button 
                className={styles.deleteButton}
                onClick={() => onDelete(feedback.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;