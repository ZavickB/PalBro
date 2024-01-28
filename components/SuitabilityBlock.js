import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import SuitabilitiesProfiles from '../assets/data/SuitabilitiesProfiles'; // Import the icon data

const SuitabilityBlock = ({ suitabilities }) => {
  const iconSize = 30;

  return (
    <View style={styles.container}>
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
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', // Make the rectangle take full width
  },
  suitabilityName: {
    marginLeft: 10, // Add margin to separate the name from the icon
  },
  palLevelText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default SuitabilityBlock;
