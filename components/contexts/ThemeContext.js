import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const lastTheme = AsyncStorage.getItem('theme');
const themes = {
  light: {
    backgroundColor: "#F0D4AE", // Peach as the base background color for dark theme
    textColor: "#1F3B34", // Dark Green for text to ensure good contrast on dark background
    primaryColor: "#8C994F", // Lighter Than Lighter Green for primary actions and buttons
    secondaryColor: "#3A5534", // Lighter Green for secondary elements and accents
    modalBackground: "rgba(240, 212, 174, 0.5)", // Semi-transparent Peach for modals
    modalContentBackground: "#F4AB5D", // Lighter Than Lighter Orange for modal content background
    backgroundGradient: ["#F0D4AE", "#EC8639"], // Gradient from Peach to Lighter Than Lighter Orange
    borderColor: "#8C994F", // Lighter Than Lighter Green for borders and outlines to add subtlety
    palTileBackgroundColor: "#EC8639", // Lighter Orange for tile or card backgrounds
    palTileBorderColor: "#1F3B34", // Dark Green for tile or card borders
    palTileTextColor: "#1F3B34", // Dark Green for tile or card text for contrast and readability
    palTileShadowColor: "#BDA68D", // Warm grey that complements Peach and Green, adding subtle depth
    searchBarBackgroundColor: "#F4AB5D", // Lighter Than Lighter Orange for search bar background
    searchBarTextColor: "#1F3B34", // Dark Green for search bar text for visibility
    switchThumbColor: "#6B8E23", // Olive Drab
    switchTrackColorOn: "#3A5534", // Dark Green
    switchTrackColorOff: "#DADADA", // Light Gray
    statusbarStyle: "dark",
    palDetailsName: "#F0D4AE",
    progressBarBackgroundColor: "#F4AB5D", // Lighter Than Lighter Orange for the progress bar background
    progressBarButtonBackgroundColor: "#8C994F", // Lighter Than Lighter Green for button backgrounds
    progressBarButtonTextColor: "#1F3B34", // Dark Green for button text
    goldenPalTileTextColor: "#1F3B34", // Dark Green for golden Pal tile text
  },
  dark: {
    backgroundColor: "#1F3B34", // Dark Green as the base background color for light theme
    textColor: "#F0D4AE", // Peach for text to ensure readability on light background
    primaryColor: "#F4AB5D", // Lighter Than Lighter Orange for primary actions and buttons for vibrant contrast
    secondaryColor: "#EC8639", // Lighter Orange for secondary elements and accents
    modalBackground: "rgba(31, 59, 52, 0.8)", // Darker, more opaque Dark Green for modal backgrounds
    modalContentBackground: "#3A5534", // Lighter Green for modal content to ensure readability
    backgroundGradient: ["#1F3B34", "#3A5534"], // Gradient from Dark Green to Lighter Green
    borderColor: "#DE6D36", // Orange for borders and outlines for vibrant contrast
    palTileBackgroundColor: "#3A5534", // Lighter Green for tile or card backgrounds
    palTileBorderColor: "#F4AB5D", // Lighter Than Lighter Orange for tile or card borders
    palTileTextColor: "#F0D4AE", // Peach for tile or card text for consistency
    palTileShadowColor: "#163027", // Very dark green, almost black, for a subtle shadow effect
    searchBarBackgroundColor: "#8C994F", // Lighter Than Lighter Green for search bar background
    searchBarTextColor: "#F0D4AE", // Peach for search bar text for readability
    switchThumbColor: "#F4AB5D", // Lighter Than Lighter Orange
    switchTrackColorOn: "#DE6D36", // Orange
    switchTrackColorOff: "#3A3A3C", // Dark Gray
    statusbarStyle: "light",
    palDetailsName: "#F0D4AE",
    progressBarBackgroundColor: "#8C994F", // Lighter Than Lighter Green for the progress bar background
    progressBarButtonBackgroundColor: "#F4AB5D", // Lighter Than Lighter Orange for primary actions and buttons for vibrant contrast
    progressBarButtonTextColor: "#F0D4AE",
    goldenPalTileTextColor: "#1F3B34", // Dark Green for golden Pal tile text
  },
};


export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.light); // Default to light theme initially
  const [isThemeLoaded, setIsThemeLoaded] = useState(false); // State to track if the theme has been loaded

  useEffect(() => {
    const loadTheme = async () => {
      const storedThemeName = await AsyncStorage.getItem('theme');
      const themeToUse = storedThemeName === 'dark' ? themes.dark : themes.light;
      setCurrentTheme(themeToUse);
      setIsThemeLoaded(true); // Set the flag to true once the theme is loaded
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = currentTheme === themes.light ? themes.dark : themes.light;
    setCurrentTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme === themes.light ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, themes }}>
      {isThemeLoaded ? children : null}
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