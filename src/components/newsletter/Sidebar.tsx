import { Coffee, Code, Lightbulb, ChevronRight, Award, CheckSquare, BarChart3 } from "lucide-react";
import { Calendar } from "./Calendar";
import { TechTalkGenerator } from "./TechTalkGenerator";
import { useState } from "react";
import "../../styles/calendar.css";
import "../../styles/tech-talk.css";

interface SidebarProps {
  setCurrentView: (view: string) => void;
}

export function Sidebar({ setCurrentView }: SidebarProps) {
  const [showTechTalk, setShowTechTalk] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-card">
        <h3 className="sidebar-title">Quick Actions</h3>
        <div className="action-list">
          <button className="action-item">
            <Coffee className="action-icon" />
            <span>Coffee Chat Signup</span>
            <ChevronRight className="action-arrow" />
          </button>
          <button 
            className="action-item"
            onClick={() => setShowTechTalk(true)}
          >
            <Code className="action-icon" />
            <span>Tech Talk Ideas</span>
            <ChevronRight className="action-arrow" />
          </button>
          <button 
            className="action-item"
            onClick={() => setCurrentView('feedback')}
          >
            <Lightbulb className="action-icon" />
            <span>Submit Feedback</span>
            <ChevronRight className="action-arrow" />
          </button>
          <button 
            className="action-item"
            onClick={() => setCurrentView('task-manager')}
          >
            <CheckSquare className="action-icon" />
            <span>Task Manager</span>
            <ChevronRight className="action-arrow" />
          </button>
          <button 
            className="action-item"
            onClick={() => setCurrentView('survey')}
          >
            <BarChart3 className="action-icon" />
            <span>Employee Survey</span>
            <ChevronRight className="action-arrow" />
          </button>
        </div>
      </div>

      <div className="sidebar-card">
        <h3 className="sidebar-title">Trending This Week</h3>
        <div className="trending-list">
          <div className="trending-item">
            <span className="trending-tag">#AI-Integration</span>
            <span className="trending-badge">Hot</span>
          </div>
          <div className="trending-item">
            <span className="trending-tag">#Performance</span>
            <span className="trending-count">24 posts</span>
          </div>
          <div className="trending-item">
            <span className="trending-tag">#CustomerSuccess</span>
            <span className="trending-count">18 posts</span>
          </div>
        </div>
      </div>

      <Calendar />

      <div className="sidebar-card">
        <h3 className="sidebar-title">Recent Achievements</h3>
        <div className="achievement-list">
          <div className="achievement-item">
            <Award className="achievement-icon" />
            <div>
              <p className="achievement-title">Platform Uptime: 99.9%</p>
              <p className="achievement-subtitle">Engineering Team</p>
            </div>
          </div>
          <div className="achievement-item">
            <Award className="achievement-icon blue" />
            <div>
              <p className="achievement-title">Customer Satisfaction: 4.8/5</p>
              <p className="achievement-subtitle">Support Team</p>
            </div>
          </div>
        </div>
      </div>
      
      <TechTalkGenerator 
        isOpen={showTechTalk} 
        onClose={() => setShowTechTalk(false)} 
      />
    </div>
  );
}
export default Sidebar;
