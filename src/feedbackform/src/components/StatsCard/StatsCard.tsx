import React from 'react';
import type  { Stats } from '../../types'; // Import Stats interface
import styles from './StatsCard.module.css'; // Import CSS module

// Define props interface for type safety
interface StatsCardProps {
  stats: Stats; // Accepts stats data as props
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    // Main container for all stat cards
    <div className={styles.statsContainer}>
      
      {/* Individual stat card - Total Feedback */}
      <div className={styles.statCard}>
        <h3>Total Feedback</h3> {/* Card title */}
        <p className={styles.statValue}>{stats.total}</p> {/* Display value */}
      </div>
      
      {/* Individual stat card - Average Rating */}
      <div className={styles.statCard}>
        <h3>Average Rating</h3>
        {/* Display value with 1 decimal place */}
        <p className={styles.statValue}>{stats.averageRating.toFixed(1)}</p>
      </div>
      
      {/* Individual stat card - Bug Reports */}
      <div className={styles.statCard}>
        <h3>Bug Reports</h3>
        <p className={styles.statValue}>{stats.bugCount}</p>
      </div>
      
      {/* Individual stat card - Feature Requests */}
      <div className={styles.statCard}>
        <h3>Feature Requests</h3>
        <p className={styles.statValue}>{stats.featureCount}</p>
      </div>
    </div>
  );
};

export default StatsCard;