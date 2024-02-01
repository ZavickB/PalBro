import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({ children }) => {
  const { currentTheme } = useTheme();

  return (
    <LinearGradient
        colors={currentTheme.backgroundGradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
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
