import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';

const TopBar = ({ title }) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    // Load the custom font asynchronously
    async function loadCustomFonts() {
      await Font.loadAsync({
        'Winter-Drink': require('../assets/fonts/Winter-Drink.ttf'),
        // Add more fonts here if needed
      });
      setIsFontLoaded(true); // Mark the font as loaded
    }

    loadCustomFonts();
  }, []);

  // Render the component when the font is loaded
  if (!isFontLoaded) {
    return null; // You can render a loading indicator here if needed
  }

  return (
    <View style={styles.topBar}>
      {title ? (
        <Text style={styles.title} fontFamily="Winter-Drink">
          {title}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Winter-Drink',
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default TopBar;
