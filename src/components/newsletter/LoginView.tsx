// Import React library and useState hook for managing component state
import React, { useState } from "react";
import { Logo } from '../Logo';
import { ArrowLeft } from 'lucide-react';

// Define the structure of login data with email and password fields
interface LoginData {
  email: string; // Email address of the user
  password: string; // Password of the user
}

// Define the props that the LoginView component will receive
interface LoginViewProps {
  loginData: LoginData; // Current login data state
  setLoginData: (data: LoginData) => void; // Function to update login data
  handleLogin: (e: React.FormEvent) => void; // Function to handle form submission
  setCurrentView: (view: string) => void; // Function to change views
}

// Define the LoginView component with destructured props
export function LoginView({
  loginData, // Current login data from parent component
  setLoginData, // Function to update login data in parent component
  handleLogin, // Function to handle login submission from parent component
  setCurrentView, // Function to change views
}: LoginViewProps) {
  // Local state to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // Return the JSX for the login page
  return (
    // Main container for the login page with a dark theme
    <div className="login-page dark-theme">
      {/* Back button */}
      <button 
        onClick={() => setCurrentView('landing')} 
        className="login-back-button"
      >
        <ArrowLeft size={20} />
        Back
      </button>
      
      {/* Animated background elements */}
      <div className="animated-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      
      {/* Card container for the login form with glass effect */}
      <div className="login-card">
        {/* Header section of the login card */}
        <div className="login-header">
          {/* Brand logo displayed at the top with glow effect */}
          <div className="brand-name glow">
            <Logo width={100} height={29} />
          </div>
          {/* Main heading for the login page */}
          <h1 className="login-title">Welcome Back</h1>
          {/* Subtitle with additional context */}
          <p className="login-subtitle">Sign in to access your newsletter</p>
        </div>
             
        {/* Login form that calls handleLogin on submission */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Form group for email input */}
          <div className="form-group">
            {/* Label for the email input field */}
            <label htmlFor="email" className="form-label">Email Address</label>
            {/* Container for the input field */}
            <div className="input-container">
              {/* Email input field */}
              <input
                id="email" // ID that matches the label's htmlFor attribute
                type="email" // Input type for email validation
                value={loginData.email} // Value from the loginData state
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value }) // Update email in loginData
                }
                className="form-input" // CSS class for styling
                placeholder="your.email@good.com" // Placeholder text
                required // Makes the field required
              />
            </div>
          </div>

          {/* Form group for password input */}
          <div className="form-group">
            {/* Label for the password input field */}
            <label htmlFor="password" className="form-label">Password</label>
            {/* Container for the input field and toggle button */}
            <div className="input-container">
              {/* Password input field */}
              <input
                id="password" // ID that matches the label's htmlFor attribute
                type={showPassword ? "text" : "password"} // Dynamically change input type based on showPassword state
                value={loginData.password} // Value from the loginData state
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value }) // Update password in loginData
                }
                className="form-input" // CSS class for styling
                placeholder="Enter your password" // Placeholder text
                required // Makes the field required
              />
              {/* Button to toggle password visibility */}
              <button 
                type="button" // Prevents form submission when clicked
                className="password-toggle" // CSS class for styling
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
              >
                {showPassword ? "Hide" : "Show"} {/* Dynamic text based on password visibility */}
              </button>
            </div>
          </div>

          {/* Row for remember me checkbox and forgot password link */}
          <div className="remember-forgot-row">
            {/* Container for the remember me checkbox */}
            <label className="checkbox-container">
              {/* Checkbox input */}
              <input type="checkbox" />
              {/* Text label for the checkbox */}
              <span className="checkbox-text">Remember me</span>
            </label>
            {/* Forgot password link */}
            <a href="#" className="forgot-password-link">
              Forgot password?
            </a>
          </div>

          {/* Submit button for the form with gradient effect */}
          <button type="submit" className="btn btn-primary login-button gradient-btn">
            Sign In
          </button>

          {/* Sign up option for users without an account */}
          <div className="signup-option">
            {/* Text prompt */}
            <span>Don't have an account?</span>
            {/* Sign up button */}
            <button 
              type="button"
              onClick={() => setCurrentView('signup')}
              className="link glow-text"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Export the LoginView component as the default export
export default LoginView;