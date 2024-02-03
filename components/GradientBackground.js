import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import {LinearGradient} from 'expo-linear-gradient';

const GradientBackground = ({ children }) => {
  const { currentTheme } = useTheme();

  return (
    <LinearGradient
        colors={currentTheme.backgroundGradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0.5, 1]} // Use the locations prop to control color transitions
      >
        {children}
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center', // You can adjust alignment as needed
    alignItems: 'center', // You can adjust alignment as needed
  },
});

export default GradientBackground;
