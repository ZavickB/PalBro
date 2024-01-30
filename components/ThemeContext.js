import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// Define your theme variables with additional properties
const themes = {
  light: {
    backgroundColor: '#FFFFFF', // White
    textColor: '#333333', // Dark gray
    primaryColor: '#007BFF', // Blue
    secondaryColor: '#28A745', // Green
    modalBackground: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    modalContentBackground: '#FFFFFF', // White
  },
  dark: {
    backgroundColor: '#333333', // Dark gray
    textColor: '#FFFFFF', // White
    primaryColor: '#1E90FF', // Dark blue
    secondaryColor: '#FF6B6B', // Red
    modalBackground: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black
    modalContentBackground: '#333333', // Dark gray
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
