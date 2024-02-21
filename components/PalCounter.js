import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext'; // Ensure correct import path
import { useTheme } from '../components/contexts/ThemeContext'; // Ensure correct import path
import { responsiveScale } from '../utils/responsiveScale';

const PalCounter = ({ palKey }) => {
  const { capturedPals, setCaptureCount } = useCapturedPals();
  const { currentTheme } = useTheme();
  const count = capturedPals[palKey] || 0;

  const handleIconClick = (newCount) => {
    setCaptureCount(palKey, newCount);
  };

  const renderIcons = () => {
    let icons = [];
    for (let i = 1; i <= 10; i++) {
      const isColored = i <= count;
      icons.push(
        <TouchableOpacity key={i} onPress={() => handleIconClick(i)} style={styles.iconWrapper}>
          <Image
            source={require('../assets/capture_icon.png')}
            style={[styles.icon, isColored ? styles.iconColored : styles.iconGray]}
          />
        </TouchableOpacity>
      );
    }
    return icons;
  };

  const styles = StyleSheet.create({
    container: {
      padding: responsiveScale(20),
      paddingTop: responsiveScale(10, 'height'),
      alignItems: 'center',
      backgroundColor: currentTheme.progressBarBackgroundColor,
      borderRadius: responsiveScale(10),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: responsiveScale(2, 'height'),
      },
      shadowOpacity: 0.25, 
      shadowRadius: responsiveScale(3.84),
      elevation: 5,
      width: '100%',
    },
    header: {
      fontSize: responsiveScale(18),
      fontWeight: 'bold',
      color: currentTheme.textColor,
      alignSelf: 'flex-start', // Align to the start of the flex container
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', // Center icons in the middle of the bar
      flex: 1, // Take up all available space
    },
    iconWrapper: {
      flex: 1, // Each icon wrapper will take equal space
      alignItems: 'center', // Center each icon horizontally
      justifyContent: 'center', // Center each icon vertically
      marginHorizontal: responsiveScale(2, 'width'), // Optional: add some space between icons
    },
    icon: {
      // Adjust the size as required, you can remove width and height to let flex handle the sizing
      resizeMode: 'contain', // Ensure the entire icon is visible
    },
    countDisplay: {
      fontSize: responsiveScale(18),
      fontWeight: 'bold',
      color: currentTheme.textColor, // Assuming white text color as per the design
      marginHorizontal: responsiveScale(10, 'width'),
    },
    iconColored: {
      tintColor: currentTheme.primaryColor, // Color for selected icons
    },
    iconGray: {
      tintColor: '#F0D4AE', // Gray color for unselected icons
    },
    progressBar: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%', // Full width of the container
      marginVertical: responsiveScale(10, 'height'), // Space above and below the progress bar
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Capture Progress</Text>
      <View style={styles.progressBar}>
        <View style={styles.iconsContainer}>
          {renderIcons()}
        </View>
        <Text style={styles.countDisplay}>{`${count}/10`}</Text>
      </View>
    </View>
  );
};

export default PalCounter;
