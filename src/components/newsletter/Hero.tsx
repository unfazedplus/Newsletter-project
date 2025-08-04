import { ArrowRight, Users, TrendingUp, MessageCircle } from 'lucide-react';
import type { ViewType } from '../../types/newsletter';

interface HeroProps {
  setCurrentView: (view: ViewType) => void;
}

export function Hero({ setCurrentView }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-text">✨ Stay Connected</span>
          </div>
          
          <h1 className="hero-title">
            Your Company's
            <span className="hero-title-gradient"> Newsletter Hub</span>
          </h1>
          
          <p className="hero-description">
            Stay up-to-date with the latest company news, product updates, and team achievements. 
            Connect with colleagues and never miss important announcements.
          </p>
          
          <div className="hero-actions">
            <button 
              onClick={() => setCurrentView('login')} 
              className="hero-btn-primary"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setCurrentView('login')} 
              className="hero-btn-secondary"
            >
              Sign In
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <Users className="hero-stat-icon" />
              <div>
                <span className="hero-stat-number">247</span>
                <span className="hero-stat-label">Active Members</span>
              </div>
            </div>
            <div className="hero-stat">
              <MessageCircle className="hero-stat-icon" />
              <div>
                <span className="hero-stat-number">1.2K</span>
                <span className="hero-stat-label">Posts Shared</span>
              </div>
            </div>
            <div className="hero-stat">
              <TrendingUp className="hero-stat-icon" />
              <div>
                <span className="hero-stat-number">94%</span>
                <span className="hero-stat-label">Engagement</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-card hero-card-1">
            <div className="hero-card-header">
              <div className="hero-card-avatar"></div>
              <div>
                <div className="hero-card-name"></div>
                <div className="hero-card-role"></div>
              </div>
            </div>
            <div className="hero-card-content"></div>
          </div>
          
          <div className="hero-card hero-card-2">
            <div className="hero-card-header">
              <div className="hero-card-avatar"></div>
              <div>
                <div className="hero-card-name"></div>
                <div className="hero-card-role"></div>
              </div>
            </div>
            <div className="hero-card-content"></div>
          </div>
          
          <div className="hero-floating-element hero-element-1">
            <MessageCircle size={24} />
          </div>
          <div className="hero-floating-element hero-element-2">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}