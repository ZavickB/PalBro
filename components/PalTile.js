import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TypePin from './TypePin'; // Make sure to adjust the import path as needed
import { useTheme } from './contexts/ThemeContext'; // Adjust the import path as needed
import { scale } from 'react-native-size-matters';

const PalTile = ({ pal, tileWidth, tileHeight, spacing, captureCount, onCapturePress, hideCompleted = false }) => {
  const { currentTheme } = useTheme();

  const isCompleted = captureCount >= 10; // Determine if the tile should be golden
  
  const capitalize = (str) => {
    if (typeof str !== 'string' || str.length === 0) return ''; // Check if str is not a string or is an empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getTypeColor = (type) => {
    type = capitalize(type);
    const typeColors = {
        "Ground": '#E0C068',
        "Fire": '#F08030',
        "Dragon": '#7038F8',
        "Water": '#6890F0',
        "Electric": '#F8D030',
        "Grass": '#78C850',
        "Normal": '#A8A878',
        "Dark": '#705848',
        "Ice": '#98D8D8',
    };

    return typeColors[type] || 'gray';
  };

  const getRarityColor = (rarity) => {
    if (rarity > 10) {
      return '#ff9557';
    } else if (rarity >= 8) {
      return '#b963ff';
    } else if (rarity >= 5) {
      return '#6a92ff';
    } else {
      return '#7e7e7e';
    }
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: scale(10),
      margin: spacing,
      shadowOffset: { width: scale(4), height: scale(6) },
      shadowOpacity: 0.8,
      shadowRadius: scale(8),
      elevation: scale(10),
      width: tileWidth,
      height: tileHeight,
      position: 'relative',
    },
    completedBanner: {
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: [{ translateY: scale(10) }],
      width: tileWidth,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
      height: scale(30),
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    bannerText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: scale(14),
    },
    contentContainer: {
      padding: scale(10),
      width: '100%',
      height: '100%',
      borderRadius: scale(10), // Ensure this matches the gradient's borderRadius if applicable
    },
    image: {
      width: '100%',
      height: '60%',
      borderRadius: scale(10),
      marginBottom: scale(5),
    },
    text: {
      fontSize: scale(14),
      fontWeight: 'bold',
      textAlign: 'center',
      color: currentTheme.goldenPalTileTextColor,
    },
    typesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    rarityBadge: {
      position: 'absolute',
      top: scale(10),
      right: scale(10),
      padding: scale(5),
      borderRadius: scale(5),
      backgroundColor: '#fff', // You might want to adjust this based on your theme
    },
    rarityText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: scale(12),
    },
    captureButton: {
      position: 'absolute',
      top: scale(5),
      left: scale(5),
      width: scale(30),
      height: scale(30),
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.contentContainer, { backgroundColor: getTypeColor(pal.types[0]) }]}>
        <Image style={styles.image} source={pal.image} />
        {isCompleted && (
          <View style={styles.completedBanner}>
            <Text style={styles.bannerText}>COMPLETED</Text>
          </View>
        )}
        {
          hideCompleted && (
            <View style={styles.completedBanner}>
              <Text style={styles.bannerText}>{captureCount} / 10 </Text>
            </View>
          )
        }
        <View style={styles.typesContainer}>
          {pal.types.map((type, index) => (
            <TypePin key={index} type={type} tileWidth={tileWidth} />
          ))}
        </View>
        <Text style={styles.text}>{pal.name}</Text>
      </View>
      <TouchableOpacity onPress={onCapturePress} style={styles.captureButton}>
        <Image
          source={require('../assets/images/Sphere_icon.png')} // Update the path to your actual capture icon
          style={[
            styles.captureButton,
            captureCount != 0 ? {} : { tintColor: 'gray' }
          ]}
        />
      </TouchableOpacity>
      <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(pal.rarity) }]}>
        <Text style={styles.rarityText}>{pal.rarity}</Text>
      </View>
    </View>
  );
};

export default PalTile;
