// SwitchButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const SwitchButton = ({ onPress, isUsingCapturedPals }) => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: currentTheme.secondaryColor, // You can change the color as needed
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: currentTheme.textColor,
      fontWeight: 'bold',
    },
  });
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>
      {isUsingCapturedPals ? 'Switch to Potential Parents' : 'Switch to My Couples' }
    </Text>
    </TouchableOpacity>
    
  );

};

export default SwitchButton;
