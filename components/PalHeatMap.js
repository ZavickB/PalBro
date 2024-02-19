import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

export const PalHeatMap = ({ palData }) => {
  const { currentTheme } = useTheme();
  // Determine the initial state of nightMode based on the availability of palData.maps.day
  const [nightMode, setNightMode] = useState(!palData.maps.day);

  const toggleNightMode = () => {
    if (palData.maps.day) {
      setNightMode(prevMode => !prevMode);
      // Reload pal data to update with appropriate mode (night or day)
    }
  };

  // Determine if the switch should be disabled based on the availability of palData.maps.day
  const switchDisabled = !palData.maps.day;
  const mapImageSource = nightMode ? palData.maps.night : palData.maps.day;

  const styles = StyleSheet.create({
    mapContainer: {
      position: 'relative',
      width: '100%',
      height: 400,
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
      top: 10,
      right: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.mapContainer}>
      {mapImageSource ? (
        <Image source={mapImageSource} style={styles.mapImage} resizeMode="cover" />
      ) : (
        <ActivityIndicator style={styles.activityIndicator} />
      )}
      <View style={styles.toggleContainer}>
        <Icon name="sunny" size={24} color="white" />
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={nightMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNightMode}
          value={nightMode}
          disabled={switchDisabled}
        />
        <Icon name="moon" size={24} color="white" />
      </View>
    </View>
  );
};

export default PalHeatMap;
