import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import './ThemeToggle.css';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Apply theme to document
    document.body.classList.toggle('dark-theme', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className="theme-toggle">
      <h3>Theme Toggle with useEffect</h3>
      <div className="theme-display">
        Current theme: <strong>{isDark ? 'Dark' : 'Light'}</strong>
      </div>
      <button onClick={toggleTheme} className="theme-btn">
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
        <span>Switch to {isDark ? 'Light' : 'Dark'} Mode</span>
      </button>
      <p className="theme-info">
        This component uses <code>useEffect</code> to apply theme changes to the
        body element.
      </p>
    </div>
  );
};
