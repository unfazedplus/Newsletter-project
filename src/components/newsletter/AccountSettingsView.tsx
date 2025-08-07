import { Bell, Eye, EyeOff, Mail, Smartphone, Shield, ArrowLeft, Sun } from 'lucide-react';
import type { AccountSettings } from '../../types/newsletter';
import '../../styles/account-settings.css';
import { ThemeToggle } from '../ThemeToggle';
import { Logo } from '../Logo';

interface AccountSettingsViewProps {
  setCurrentView: (view: 'login' | 'home' | 'article' | 'create' | 'profile' | 'edit-profile' | 'settings') => void;
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
}

export function AccountSettingsView({ setCurrentView, accountSettings, setAccountSettings }: AccountSettingsViewProps) {
  // Theme toggle is now handled by the ThemeToggle component

  const toggleNotification = (type: 'email' | 'push' | 'newsletter') => {
    setAccountSettings({
      ...accountSettings,
      notifications: {
        ...accountSettings.notifications,
        [type]: !accountSettings.notifications[type]
      }
    });
  };

  const togglePrivacy = (type: 'profileVisible' | 'showActivity') => {
    setAccountSettings({
      ...accountSettings,
      privacy: {
        ...accountSettings.privacy,
        [type]: !accountSettings.privacy[type]
      }
    });
  };

  return (
    <div>
      {/* Headers */}
      <header className="header">
        <div className="container header-container">
          <div className="header-brand">
            <button onClick={() => setCurrentView('profile')} className="header-logo">
              <Logo />
            </button>
            <span className="header-divider desktop-only">|</span>
            <span className="header-title responsive-text">Account Settings</span>
          </div>
          <div className="header-actions">
            <button onClick={() => setCurrentView('profile')} className="btn-secondary">
              <ArrowLeft size={16} />
              <span className="desktop-only">Back to Profile</span>
              
            </button>
          </div>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-card card-responsive">
          
            {/* Theme Settings */}
            <div className="settings-section">
            <h3 className="settings-section-title text-responsive-lg">
              <Sun size={20} />
              Appearance
            </h3>
            <div className="settings-item">
              <div className="settings-item-info">
                <span className="settings-item-label text-responsive-base">Theme</span>
                <span className="settings-item-description text-responsive-sm">
                  Choose between light and dark mode
                </span>
              </div>
              <ThemeToggle 
                accountSettings={accountSettings} 
                setAccountSettings={setAccountSettings} 
              />
            </div>
          </div>

          {/* Notification Settings */}
          <div className="settings-section">
            <h3 className="settings-section-title text-responsive-lg">
              <Bell size={20} />
              Notifications
            </h3>
            <div className="settings-item">
              <div className="settings-item-info">
                <div>
                  <span className="settings-item-label text-responsive-base">
                    <Mail size={16} className="mobile-only" />
                    Email Notifications
                  </span>
                  <span className="settings-item-description text-responsive-sm">Receive updates via email</span>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={accountSettings.notifications.email}
                  onChange={() => toggleNotification('email')}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div>
                  <span className="settings-item-label text-responsive-base">
                    <Smartphone size={16} className="mobile-only" />
                    Push Notifications
                  </span>
                  <span className="settings-item-description text-responsive-sm">Get notified on your device</span>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={accountSettings.notifications.push}
                  onChange={() => toggleNotification('push')}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div>
                  <span className="settings-item-label text-responsive-base">
                    <Bell size={16} className="mobile-only" />
                    Newsletter Updates
                  </span>
                  <span className="settings-item-description text-responsive-sm">Weekly newsletter digest</span>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={accountSettings.notifications.newsletter}
                  onChange={() => toggleNotification('newsletter')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="settings-section">
            <h3 className="settings-section-title text-responsive-lg">
              <Shield size={20} />
              Privacy
            </h3>
            <div className="settings-item">
              <div className="settings-item-info">
                <div>
                  <span className="settings-item-label text-responsive-base">
                    <Eye size={16} className="mobile-only" />
                    Profile Visibility
                  </span>
                  <span className="settings-item-description text-responsive-sm">Make your profile visible to others</span>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={accountSettings.privacy.profileVisible}
                  onChange={() => togglePrivacy('profileVisible')}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="settings-item">
              <div className="settings-item-info">
                <div>
                  <span className="settings-item-label text-responsive-base">
                    <EyeOff size={16} className="mobile-only" />
                    Show Activity
                  </span>
                  <span className="settings-item-description text-responsive-sm">Display your activity to others</span>
                </div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={accountSettings.privacy.showActivity}
                  onChange={() => togglePrivacy('showActivity')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
}