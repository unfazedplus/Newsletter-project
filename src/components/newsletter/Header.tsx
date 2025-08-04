
import { Search, Plus, Bell, User } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { Logo } from '../Logo';
import type { AccountSettings } from '../../types/newsletter';

interface HeaderProps {
  setCurrentView: (view: 'login' | 'home' | 'article' | 'create' | 'profile') => void;
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
  accountSettings?: AccountSettings;
  setAccountSettings?: (settings: AccountSettings) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ setCurrentView, accountSettings, setAccountSettings, searchQuery, setSearchQuery}: HeaderProps) {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="header-brand">
          <Logo className="header-logo" />
          <span className="header-divider">|</span>
          <span className="header-title">Staff Newsletter</span>
        </div>
        
        <div className="header-actions">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search newsletters..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-create" onClick={() => setCurrentView('create')}>
            <Plus />
            <span>Create</span>
          </button>
          <Bell className="icon-button" />
          {accountSettings && setAccountSettings && (
            <ThemeToggle 
              accountSettings={accountSettings} 
              setAccountSettings={setAccountSettings}
              className="header-theme-toggle"
            />
          )}
          <div className="avatar" onClick={() => setCurrentView('profile')}>
            <User />
          </div>
        </div>
      </div>
    </header>
  );
}
