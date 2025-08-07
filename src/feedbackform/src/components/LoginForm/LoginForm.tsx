import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    let hasError = false;
    
    // Validate username
    if (!formData.username) {
      newErrors.username = "Please fill out this field";
      hasError = true;
    }
    
    // Validate email for signup
    if (!isLogin && !formData.email) {
      newErrors.email = "Please enter an email";
      hasError = true;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = "Please fill out this field";
      hasError = true;
    }
    
    // Validate confirm password for signup
    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      hasError = true;
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }
    
    setErrors(newErrors);
    
    if (!hasError) {
      // Submit form logic would go here
      console.log("Form submitted:", formData);
      
      // Call the onLoginSuccess callback if provided
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // Secure authentication would be implemented here
      // For demo purposes only - use proper authentication in production
      if (formData.username && formData.password) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit}>
        <h1>{isLogin ? 'Login' : 'Create Account'}</h1>
        
        <div className={styles.inputGroup}>
          <input 
            type="text"
            name="username"
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className={styles.errorText}>{errors.username}</p>}
        </div>
        
        {!isLogin && (
          <div className={styles.inputGroup}>
            <input 
              type="email"
              name="email"
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>
        )}
        
        <div className={styles.inputGroup}>
          <input 
            type="password"
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}
        </div>
        
        {!isLogin && (
          <div className={styles.inputGroup}>
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}
          </div>
        )}
        
        {isLogin && (
          <div className={styles.options}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>
          </div>
        )}
        
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        
        <div className={styles.switchForm}>
          <p>
            {isLogin 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
              setErrors({username: "", email: "", password: "", confirmPassword: ""});
            }}>
              {isLogin ? 'Sign up' : 'Log in'}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
