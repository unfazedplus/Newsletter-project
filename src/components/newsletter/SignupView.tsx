import React, { useState } from "react";
import { Logo } from '../Logo';

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
}

interface SignupViewProps {
  signupData: SignupData;
  setSignupData: (data: SignupData) => void;
  handleSignup: (e: React.FormEvent) => void;
  setCurrentView: (view: string) => void;
}

export function SignupView({
  signupData,
  setSignupData,
  handleSignup,
  setCurrentView,
}: SignupViewProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const departments = [
    'Product Team',
    'Engineering',
    'Marketing',
    'Sales',
    'Customer Success',
    'HR',
    'Finance',
    'Operations'
  ];
  
  return (
    <div className="login-page dark-theme">
      <div className="animated-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="brand-name glow">
            <Logo width={100} height={29} />
          </div>
          <h1 className="login-title">Create Account</h1>
          <p className="login-subtitle">Join our newsletter community</p>
        </div>
             
        <form onSubmit={handleSignup} className="login-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-container">
              <input
                id="name"
                type="text"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-container">
              <input
                id="email"
                type="email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                className="form-input"
                placeholder="your.email@good.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">Department</label>
            <div className="input-container">
              <select
                id="department"
                value={signupData.department}
                onChange={(e) =>
                  setSignupData({ ...signupData, department: e.target.value })
                }
                className="form-input"
                required
              >
                <option value="">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                className="form-input"
                placeholder="Create a password"
                required
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-container">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={signupData.confirmPassword}
                onChange={(e) =>
                  setSignupData({ ...signupData, confirmPassword: e.target.value })
                }
                className="form-input"
                placeholder="Confirm your password"
                required
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-button gradient-btn">
            Create Account
          </button>

          <div className="signup-option">
            <span>Already have an account?</span>
            <button 
              type="button"
              onClick={() => setCurrentView('login')}
              className="link glow-text"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupView;