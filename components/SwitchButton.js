// SwitchButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { responsiveScale } from '../utils/responsiveScale';

const SwitchButton = ({ onPress, isUsingCapturedPals }) => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: currentTheme.modalContentBackground, // You can change the color as needed
      padding: responsiveScale(10),
      borderRadius: responsiveScale(5),
      alignItems: 'center',
      marginVertical: responsiveScale(10, 'height'),
    },
    buttonText: {
      color: currentTheme.textColor,
      fontWeight: 'bold',
    },
  });
  
  const buttonText = isUsingCapturedPals ? "Switch to All Pals" : "Switch to My Pals";

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>
      {buttonText}
    </Text>
    </TouchableOpacity>
    
  );

};

export default SwitchButton;
