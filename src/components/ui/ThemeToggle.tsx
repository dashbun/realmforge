import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Simple toggle button
export const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <button 
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        // Sun icon for light mode
        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};

// Animated toggle switch
export const ThemeToggleSwitch: React.FC = () => {
  const { isDarkMode, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}
      `}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <span
        className={`
          inline-block w-5 h-5 transform transition-transform duration-200 bg-white rounded-full shadow-lg
          ${isDarkMode ? 'translate-x-8' : 'translate-x-1'}
        `}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

// Text-based toggle
export const ThemeToggleText: React.FC = () => {
  const { isDarkMode, toggleTheme, isLoading } = useTheme();

  if (isLoading) {
    return (
      <button 
        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse"
        disabled
      >
        <span className="text-transparent">Loading...</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition-colors duration-200"
    >
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};