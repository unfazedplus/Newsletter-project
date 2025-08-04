
import { User, Mail, Calendar, MapPin, Edit2, Settings, LogOut, Bookmark, Eye, MessageCircle, Heart, X } from 'lucide-react';
import type  { UserProfile, Newsletter, AccountSettings } from '../../types/newsletter';
import { ThemeToggle } from '../ThemeToggle';
import { Logo } from '../Logo';
import { useState } from 'react';

interface ProfileViewProps {
  setCurrentView: (view: 'login' | 'home' | 'article' | 'create' | 'profile' | 'edit-profile' | 'settings') => void;
  userProfile: UserProfile;
  bookmarkedPosts: Set<number>;
  newsletters: Newsletter[];
  viewArticle: (articleId: number) => void;
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
}

export function ProfileView({ setCurrentView, userProfile, bookmarkedPosts, newsletters, viewArticle, accountSettings, setAccountSettings }: ProfileViewProps) {
  const bookmarkedNewsletters = newsletters.filter(newsletter => bookmarkedPosts.has(newsletter.id));
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="header-brand">
            <button onClick={() => setCurrentView('home')} className="header-logo">
              <Logo />
            </button>
            <span className="header-divider">|</span>
            <span className="header-title">My Profile</span>
          </div>
          <div className="header-actions">
            <ThemeToggle 
              accountSettings={accountSettings} 
              setAccountSettings={setAccountSettings}
              className="header-theme-toggle"
            />
            <button onClick={() => setCurrentView('home')} className="btn-secondary">
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-picture-container" onClick={() => userProfile.profilePicture && setShowImageModal(true)} style={{ cursor: userProfile.profilePicture ? 'pointer' : 'default' }}>
              {userProfile.profilePicture ? (
                <img src={userProfile.profilePicture} alt="Profile" className="profile-picture" />
              ) : (
                <div className="profile-avatar-large">
                  <User size={48} />
                </div>
              )}
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{userProfile.name || 'Your Name'}</h1>
              <p className="profile-role">Staff Member</p>
              <p className="profile-department">{userProfile.department}</p>
            </div>
            <button className="btn-edit" onClick={() => setCurrentView('edit-profile')}>
              <Edit2 size={16} />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Profile Details */}
          <div className="profile-details">
            <h2 className="profile-section-title">Contact Information</h2>
            <div className="profile-detail-item">
              <Mail className="profile-detail-icon" />
              <div>
                <span className="profile-detail-label">Email</span>
                <span className="profile-detail-value">{userProfile.email || 'you@good.com'}</span>
              </div>
            </div>
            <div className="profile-detail-item">
              <Calendar className="profile-detail-icon" />
              <div>
                <span className="profile-detail-label">Joined</span>
                <span className="profile-detail-value">{userProfile.joinedDate}</span>
              </div>
            </div>
            <div className="profile-detail-item">
              <MapPin className="profile-detail-icon" />
              <div>
                <span className="profile-detail-label">Location</span>
                <span className="profile-detail-value">{userProfile.location || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="profile-stats">
            <h2 className="profile-section-title">Activity</h2>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Posts Created</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24</span>
                <span className="stat-label">Comments</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{bookmarkedPosts.size}</span>
                <span className="stat-label">Bookmarked</span>
              </div>
            </div>
          </div>

          {/* Bookmarked Posts */}
          {bookmarkedNewsletters.length > 0 && (
            <div className="bookmarks-section">
              <h2 className="bookmarks-title">
                <Bookmark size={20} />
                Bookmarked Posts ({bookmarkedNewsletters.length})
              </h2>
              <div className="bookmarks-list">
                {bookmarkedNewsletters.map((newsletter) => (
                  <div key={newsletter.id} className="bookmark-card">
                    <div className="bookmark-header">
                      <span className="bookmark-category">{newsletter.category}</span>
                      <span className="bookmark-date">{newsletter.date}</span>
                    </div>
                    <h3 className="bookmark-title" onClick={() => viewArticle(newsletter.id)}>
                      {newsletter.title}
                    </h3>
                    <p className="bookmark-author">By {newsletter.author}</p>
                    <div className="bookmark-footer">
                      <div className="bookmark-stats">
                        <span className="bookmark-stat"><Heart size={14} /> {newsletter.likes}</span>
                        <span className="bookmark-stat"><MessageCircle size={14} /> {newsletter.comments}</span>
                        <span className="bookmark-stat"><Eye size={14} /> {newsletter.views}</span>
                      </div>
                      <div className="bookmark-actions">
                        <button className="bookmark-action remove">
                          <Bookmark size={16} fill="currentColor" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="profile-actions">
            <h2 className="profile-section-title">Quick Actions</h2>
            <div className="action-buttons">
              <button className="profile-action-btn" onClick={() => setCurrentView('create')}>
                <Edit2 size={16} />
                <span>Create New Post</span>
              </button>
              <button className="profile-action-btn" onClick={() => setCurrentView('settings')}>
                <Settings size={16} />
                <span>Account Settings</span>
              </button>
              <button className="profile-action-btn logout" onClick={() => setCurrentView('login')}>
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && userProfile.profilePicture && (
        <div className="image-modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setShowImageModal(false)}>
              <X size={24} />
            </button>
            <img src={userProfile.profilePicture} alt="Profile" className="image-modal-picture" />
          </div>
        </div>
      )}
    </div>
  );
}
