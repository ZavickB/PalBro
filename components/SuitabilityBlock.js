import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useTheme } from './contexts/ThemeContext'; // Import the useTheme hook
import { responsiveScale } from '../utils/responsiveScale';

const SuitabilityBlock = ({ suitabilities }) => {
  const { currentTheme } = useTheme();

  const iconSize = 30;

  // Utility function to format drop names for display and matching
  const formatName = (dropName) => {
    return dropName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingHorizontal: responsiveScale(10, 'width'),
    },
    suitabilityContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: responsiveScale(10, 'height'),
      width: "100%", // Fixed width for the rectangles
    },
    rectangle: {
      borderWidth: 1,
      borderColor: currentTheme.borderColor,
      padding: responsiveScale(10),
      borderRadius: responsiveScale(5),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    suitabilityName: {
      marginLeft: responsiveScale(10, 'width'),
      color: currentTheme.textColor,
      fontWeight: 'bold',
    },
    palLevelText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: currentTheme.textColor,
    },
    icon: {
      width: responsiveScale(30),
      height: responsiveScale(30),
    },
  });


  return (
    <View style={[styles.container]}>
      {suitabilities.map((profile, index) => {
        if (!profile) {
          return null; // Skip if no matching suitability profile found
        }
        const leftText = formatName(profile.type);
        const palLevel = profile.level || 0; // Extract the level from suitability or default to 0

        return (
          <View key={index} style={styles.suitabilityContainer}>
            <View style={styles.rectangle}>
              <Image
                source={profile.image}
                style={styles.icon} // Render the icon here
              />
              <Text style={styles.suitabilityName}>{leftText}</Text>
              <Text style={styles.palLevelText}>LV. {palLevel}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};


export default SuitabilityBlock;
