import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// Define your theme variables with additional properties
const themes = {
  light: {
    "backgroundColor": "#F0E68C", // Khaki
    "textColor": "#556B2F", // Dark Olive Green
    "primaryColor": "#6B8E23", // Olive Drab
    "secondaryColor": "#FFDAB9", // Peach Puff
    "modalBackground": "rgba(240, 230, 140, 0.5)", // Semi-transparent khaki
    "modalContentBackground": "#FFFFFF", // White
    "backgroundGradient": ["#F0E68C", "#FFDAB9"], // Gradient from khaki to peach puff
    "borderColor": "#556B2F" // Dark Olive Green
  },
  dark: {
    "backgroundColor": "#13305B", // Deep navy blue, as the base
    "textColor": "#E0E0E0", // Light gray for high contrast text
    "primaryColor": "#4E9ACF", // Sky blue, for a vibrant contrast
    "secondaryColor": "#76B947", // Olive green, for accentuating elements
    "modalBackground": "rgba(19, 48, 91, 0.8)", // Slightly more opaque navy for modals
    "modalContentBackground": "#1E4168", // A slightly lighter shade of navy for modal content background
    "backgroundGradient": ["#13305B", "#5078A0"], // Gradient from deep navy blue to a serene teal blue
    "borderColor": "#E0E0E0" // Light gray, to ensure elements are well-defined
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
