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
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="header-brand">
            <button onClick={() => setCurrentView('profile')} className="header-logo">
              <Logo />
            </button>
            <span className="header-divider">|</span>
            <span className="header-title">Account Settings</span>
          </div>
          <div className="header-actions">
            <button onClick={() => setCurrentView('profile')} className="btn-secondary">
              <ArrowLeft size={16} />
              Back to Profile
            </button>
          </div>
        </div>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          {/* Theme Settings */}
          <div className="settings-section">
            <h3 className="settings-section-title">
              <Sun size={20} />
              Appearance
            </h3>
            <div className="settings-item">
              <div className="settings-item-info">
                <span className="settings-item-label">Theme</span>
                <span className="settings-item-description">
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
            <h3 className="settings-section-title">
              <Bell size={20} />
              Notifications
            </h3>
            <div className="settings-item">
              <div className="settings-item-info">
                <Mail size={16} />
                <div>
                  <span className="settings-item-label">Email Notifications</span>
                  <span className="settings-item-description">Receive updates via email</span>
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
                <Smartphone size={16} />
                <div>
                  <span className="settings-item-label">Push Notifications</span>
                  <span className="settings-item-description">Get notified on your device</span>
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
                <Bell size={16} />
                <div>
                  <span className="settings-item-label">Newsletter Updates</span>
                  <span className="settings-item-description">Weekly newsletter digest</span>
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
            <h3 className="settings-section-title">
              <Shield size={20} />
              Privacy
            </h3>
            <div className="settings-item">
              <div className="settings-item-info">
                <Eye size={16} />
                <div>
                  <span className="settings-item-label">Profile Visibility</span>
                  <span className="settings-item-description">Make your profile visible to others</span>
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
                <EyeOff size={16} />
                <div>
                  <span className="settings-item-label">Show Activity</span>
                  <span className="settings-item-description">Display your activity to others</span>
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