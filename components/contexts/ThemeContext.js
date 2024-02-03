import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// Define your theme variables with additional properties
const themes = {
  light: {
    backgroundColor: "#F0D4AE", // Peach as the base background color for light theme
    textColor: "#1F3B34", // Dark Green for text to ensure good contrast on light background
    primaryColor: "#8C994F", // Lighter Than Lighter Green for primary actions and buttons for vibrant contrast
    secondaryColor: "#3A5534", // Lighter Green for secondary elements and accents
    modalBackground: "rgba(240, 212, 174, 0.5)", // Semi-transparent Peach for modal backgrounds
    modalContentBackground: "#F4AB5D", // White for modal content to ensure readability
    backgroundGradient: ["#F0D4AE", "#EC8639"], // Gradient from Peach to Lighter Than Lighter Orange
    borderColor: "#8C994F", // Lighter Than Lighter Green for borders and outlines
    palTileBackgroundColor: "#EC8639", // Lighter Orange for tile or card backgrounds
    palTileBorderColor: "#1F3B34", // Dark Green for tile or card borders
    palTileTextColor: "#1F3B34", // Dark Green for tile or card text for consistency
    searchBarBackgroundColor: "#F4AB5D", // Lighter Than Lighter Orange for search bar background
    searchBarTextColor: "#1F3B34", // Dark Green for search bar text for readability
  },
  dark: {
    backgroundColor: "#1F3B34", // Dark Green as the base background color for dark theme
    textColor: "#F0D4AE", // Peach for text to ensure readability on dark background
    primaryColor: "#F4AB5D", // Lighter Than Lighter Orange for primary actions and buttons
    secondaryColor: "#8C994F", // Lighter Than Lighter Green for secondary elements and accents
    modalBackground: "rgba(31, 59, 52, 0.8)", // Darker, more opaque Dark Green for modals
    modalContentBackground: "#3A5534", // Lighter Green for modal content background
    backgroundGradient: ["#1F3B34", "#3A5534"], // Gradient from Dark Green to Lighter Green
    borderColor: "#DE6D36", // Orange for borders and outlines to add vibrancy
    palTileBackgroundColor: "#3A5534", // Lighter Orange for tile or card backgrounds
    palTileBorderColor: "#F4AB5D", // Lighter Than Lighter Orange for tile or card borders
    palTileTextColor: "#F0D4AE", // Peach for tile or card text for contrast and readability
    searchBarBackgroundColor: "#8C994F", // Lighter Than Lighter Green for search bar background
    searchBarTextColor: "#F0D4AE", // Peach for search bar text for visibility
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
