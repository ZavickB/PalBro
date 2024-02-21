import React, { useState } from 'react';
import { Dimensions, View, Image, StyleSheet, ActivityIndicator, Switch, Text } from 'react-native'; // Import Text from react-native
import { useTheme } from './contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale } from 'react-native-size-matters';


export const PalHeatMap = ({ palData }) => {
  const { currentTheme } = useTheme();
  const [nightMode, setNightMode] = useState(!palData.maps.day);

  const toggleNightMode = () => {
    if (palData.maps.day) {
      setNightMode(prevMode => !prevMode);
      // Reload pal data to update with appropriate mode (night or day)
    }
  };

  const screenWidth = Dimensions.get('window').width;

  const switchDisabled = !palData.maps.day;
  const mapImageSource = nightMode ? palData.maps.night : palData.maps.day;

  const styles = StyleSheet.create({
    mapContainer: {
      position: 'relative',
      width: 0.9 * screenWidth , // Use scale() for width-related dimensions
      height: 0.9 * screenWidth,
    },
    mapImage: {
      width: '100%',
      height: '100%',
    },
    activityIndicator: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toggleContainer: {
      position: 'absolute',
      top: scale(10),
      right: scale(10),
      flexDirection: 'row',
      alignItems: 'center',
    },
    notAvailableText: { // New style for the not available text
      textAlign: 'center',
      marginTop: scale(20),
    },
  });

  // Check if both maps are not defined and display a message accordingly
  if (!palData.maps.day && !palData.maps.night) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.notAvailableText}>This pal is not widely available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      {mapImageSource ? (
        <Image source={mapImageSource} style={styles.mapImage} resizeMode="cover" />
      ) : (
        <ActivityIndicator style={styles.activityIndicator} />
      )}
      <View style={styles.toggleContainer}>
        <Icon name="sunny" size={scale(24)} color="white" />
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={nightMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNightMode}
          value={nightMode}
          disabled={switchDisabled}
        />
        <Icon name="moon" size={scale(24)} color="white" />
      </View>
    </View>
  );
};

export default PalHeatMap;
