import { Component } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../css/settings.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className="theme-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <span className="slider round"></span>
      </label>
      <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  );
};

export class Settings extends Component {
  render() {
    return (
      <div className="settings-container">
        <h1>Settings</h1>
        <div className="settings-section">
          <h2>Theme Preferences</h2>
          <ThemeToggle />
        </div>
      </div>
    );
  }
}

export default Settings;