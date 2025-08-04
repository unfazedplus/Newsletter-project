import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import type { AccountSettings } from '../types/newsletter';

interface ThemeToggleProps {
  accountSettings: AccountSettings;
  setAccountSettings: (settings: AccountSettings) => void;
  className?: string;
}

export function ThemeToggle({ accountSettings, setAccountSettings, className = '' }: ThemeToggleProps) {
  const toggleTheme = () => {
    const newTheme = accountSettings.theme === 'light' ? 'dark' : 'light';
    setAccountSettings({
      ...accountSettings,
      theme: newTheme
    });
  };

  // Apply theme to document whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', accountSettings.theme);
    // Also add a class to the body for easier styling
    document.body.className = accountSettings.theme === 'dark' ? 'dark-mode' : 'light-mode';
  }, [accountSettings.theme]);

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${accountSettings.theme} ${className}`}
      aria-label={`Switch to ${accountSettings.theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {accountSettings.theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
      <span>{accountSettings.theme === 'light' ? 'Light' : 'Dark'}</span>
    </button>
  );
}