import React, { useEffect, useMemo, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import { palsLocation } from '../assets/data/PalsLocation';
import { useTheme } from './contexts/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon component

export const PalHeatMap = ({ palName, loading }) => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [palData, setPalData] = useState(null);
  const [nightMode, setNightMode] = useState(false); // State for night mode toggle

  const { currentTheme } = useTheme();

  const [finalPalName, setFinalPalName] = useState(null);

  useEffect(() => {
    loadPalData(palName);
  }, [palName]);

  const loadPalData = (palName) => {
    try {
      let formattedPalName = palName.replace(/ /g, '_');
      console.log('Loading pal data for:', formattedPalName);
      let data = palsLocation[formattedPalName];
      setFinalPalName(formattedPalName);
      // If data not found, try with "BOSS_" prefix

      if (!data) {
        formattedPalName = `BOSS_${formattedPalName}`;
        data = palsLocation[formattedPalName];
        setFinalPalName(formattedPalName);
      }
      
      if (data) {
        console.log('Pal data loaded successfully:', formattedPalName); // New log: Check if pal data is loaded successfully
        setPalData(data);
      } else {
        console.log('Pal data not found for:', formattedPalName);
      }
    } catch (error) {
      console.error('Error loading pal data:', error);
    }
  };

  const toggleNightMode = () => {
    console.log('Toggling night mode...'); // New log: Check if toggleNightMode function is called
    setNightMode(prevMode => !prevMode);
    // Reload pal data to update with appropriate mode (night or day)
    loadPalData(palName);
  };

  const inGameMapSize = {
    max: {
      x: 335112.0,
      y: 617000.0,
    },
    min: {
      x: -582888.0,
      y: -301000.0,
    },
  };

  const convertPalsCoordinates = (palData, mapsize, imageWidth, imageHeight) => {
    if (!palData) return [];

    const coordinates = nightMode ? palData.nightTimeLocations.locations : palData.dayTimeLocations.locations;

    return coordinates.map(coord =>
      convertCoordinate(coord, mapsize, imageWidth, imageHeight)
    );
  };

  const convertCoordinate = (coord, mapsize, imageWidth, imageHeight) => {
    const rangeX = mapsize.max.x - mapsize.min.x;
    const rangeY = mapsize.max.y - mapsize.min.y;

    const normalizedX = (coord.X - mapsize.min.x) / rangeX;
    const normalizedY = (coord.Y - mapsize.min.y) / rangeY;

    const scaledX = normalizedX * imageWidth;
    const scaledY = (1 - normalizedY) * imageHeight;

    return { x: scaledX, y: scaledY };
  };

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  const nodes = useMemo(() => {
    if (!palData) return [];
    return convertPalsCoordinates(palData, inGameMapSize, containerSize.width, containerSize.height);
  }, [palData, containerSize, nightMode]);

  const mapImageSource = require('../assets/images/WorldMap-1024.png');

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
    node: {
      position: 'absolute',
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: currentTheme.palDetailsName
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
    toggleText: {
      color: 'white',
      marginRight: 5,
    },
  });

  return (
    <View style={styles.mapContainer}>
      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} size="large" color={currentTheme.primaryColor} />
      ) : (
        <>
          <Image onLayout={onLayout} source={mapImageSource} style={styles.mapImage} />
          {nodes.map((node, index) => (
            <View
              key={index}
              style={[
                styles.node,
                {
                  top: node.y,
                  left: node.x,
                },
              ]}
            />
          ))}
          <View style={styles.toggleContainer}>
            <Icon name="sunny" size={24} color="white" />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={nightMode ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNightMode}
              value={nightMode}
            />
            <Icon name="moon" size={24} color="white" />
          </View>
        </>
      )}
    </View>
  );
};

export default PalHeatMap;
