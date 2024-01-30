// SwitchButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SwitchButton = ({ onPress, isUsingCapturedPals }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>
      {isUsingCapturedPals ? 'Switch to Potential Parents' : 'Switch to My Couples' }
    </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF', // You can change the color as needed
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SwitchButton;
