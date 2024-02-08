import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { PalsLocation } from '../assets/data/PalsLocation';

export const PalHeatMap = ({ palName, loading, isNightOnly }) => {
  const { currentTheme } = useTheme();
  const [imageSource, setImageSource] = useState(null);

  // Set initial nightMode based on isNightOnly prop
  const [nightMode, setNightMode] = useState(isNightOnly === "true");

  useEffect(() => {
    const formattedPalName = palName.replace(/\s/g, '_');
    const source = PalsLocation(formattedPalName, nightMode);
    if (source) {
      setImageSource(source);
    }
  }, [palName, nightMode]);

  // Disable toggle function if isNightOnly is true
  const toggleNightMode = () => {
    if (isNightOnly !== "true") {
      setNightMode(prevMode => !prevMode);
    }
  };

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
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} size="large" color={currentTheme.primaryColor} />
      ) : (
        <>
          {imageSource ? (
            <Image source={imageSource} style={styles.mapImage} resizeMode="cover" />
          ) : (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size="small" color={currentTheme.primaryColor} />
            </View>
          )}
          <View style={styles.toggleContainer}>
            <Icon name="sunny" size={24} color="white" />
            <Switch
              trackColor="#767577"
              thumbColor={nightMode ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNightMode}
              value={nightMode}
              disabled={isNightOnly === "true"} // Disable switch if isNightOnly is true
            />
            <Icon name="moon" size={24} color="white" />
          </View>
        </>
      )}
    </View>
  );
};

export default PalHeatMap;
