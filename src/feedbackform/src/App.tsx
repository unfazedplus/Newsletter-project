import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import type { Feedback, Stats } from './types';
import './App.css'
import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import FeedbackList from './components/FeedbackList/FeedbackList';
import StatsCard from './components/StatsCard/StatsCard';
import LoginForm from './components/LoginForm/LoginForm';

// Dashboard component that contains the feedback functionality
const Dashboard = () => {
  // State for storing feedbacks with localStorage persistence
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
    // Try to get saved feedbacks from localStorage on initial load
    const savedFeedbacks = localStorage.getItem('feedbacks');
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
  });

  // Save feedbacks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Handle new feedback submission
  const handleSubmit = (feedback: Omit<Feedback, 'id' | 'timestamp'>) => {
    const newFeedback: Feedback = {
      ...feedback,              // Spread submitted data
      id: Date.now(), // Generate unique ID
      timestamp: new Date().toISOString() // Add current timestamp
    };
    setFeedbacks([newFeedback, ...feedbacks]); // Add to beginning of array
  };

  // Calculate statistics
  const stats: Stats = {
    total: feedbacks.length, // Total count
    averageRating: feedbacks.reduce((sum, f) => sum + f.rating, 0) / (feedbacks.length || 1), // Prevent divide by zero
    bugCount: feedbacks.filter(f => f.category === 'bug').length, // Count bugs
    featureCount: feedbacks.filter(f => f.category === 'feature').length // Count features
  };

  return (
    <div className="app">
      {/* Header with logo */}
      <header>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>Customer Feedback Dashboard</h1>
      </header>
      
      <main>
        {/* Feedback submission form */}
        <FeedbackForm onSubmit={handleSubmit} />
        
        {/* Statistics cards */}
        <StatsCard stats={stats} />
        
        {/* Feedback list display */}
        <FeedbackList 
          feedbacks={feedbacks} 
          onDelete={(id) => {
            setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
          }} 
        />
      </main>
    </div>
  );
};

// Login page wrapper
const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="login-container">
      <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
    </div>
  );
};

// Main App component with routing
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
        } />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : (
            <div className="login-container">
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
          )
        } />
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <div>
              <button 
                onClick={handleLogout}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  padding: '8px 16px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
              <Dashboard />
            </div>
          ) : <Navigate to="/login" />
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;