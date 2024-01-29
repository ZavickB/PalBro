import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// Define your theme variables with additional properties
const themes = {
  light: {
    backgroundColor: '#F5F5F5', // Light gray
    textColor: '#333333', // Dark gray
    primaryColor: '#3498db', // Light blue
    secondaryColor: '#27ae60', // Light green
    // Add other theme variables here
  },
  dark: {
    backgroundColor: '#222222', // Dark gray
    textColor: '#FFFFFF', // White
    primaryColor: '#1E90FF', // Dark blue
    secondaryColor: '#8A2BE2', // Dark purple
    // Add other theme variables here
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
