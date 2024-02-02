import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import SuitabilitiesProfiles from '../assets/data/SuitabilitiesProfiles'; // Import the icon data
import { useTheme } from './ThemeContext'; // Import the useTheme hook

const SuitabilityBlock = ({ suitabilities }) => {
  const { currentTheme } = useTheme();

  const iconSize = 30;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingHorizontal: 10,
    },
    suitabilityContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 10,
      width: "100%", // Fixed width for the rectangles
    },
    rectangle: {
      borderWidth: 1,
      borderColor: currentTheme.textColor,
      padding: 10,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    suitabilityName: {
      marginLeft: 10,
      color: currentTheme.textColor,
    },
    palLevelText: {
      textAlign: 'center',
      fontWeight: 'bold',
      color: currentTheme.textColor,
    },
    icon: {
      width: 30,
      height: 30,
    },
  });


  return (
    <View style={[styles.container]}>
      {suitabilities.map((profile, index) => {
        const suitabilityProfile = SuitabilitiesProfiles.find(
          (sp) => sp.workName === profile.type
        );
        if (!suitabilityProfile) {
          return null; // Skip if no matching suitability profile found
        }
        const leftText = suitabilityProfile.workName;
        const palLevel = profile.level || 0; // Extract the level from suitability or default to 0

        return (
          <View key={index} style={styles.suitabilityContainer}>
            <View style={styles.rectangle}>
              <Image
                source={suitabilityProfile.iconFileName}
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
