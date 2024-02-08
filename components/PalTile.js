import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import TypePin from './TypePin'; // Make sure to adjust the import path as needed
import { useTheme } from './contexts/ThemeContext'; // Adjust the import path as needed

const PalTile = ({ pal, tileWidth, tileHeight, spacing, captureCount, onCapturePress }) => {
  const { currentTheme } = useTheme();

  const isGold = captureCount >= 10; // Determine if the tile should be golden

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
      borderRadius: 10,
      margin: spacing,
      shadowOffset: { width: 4, height: 6 },
      shadowOpacity: 0.8,
      shadowRadius: 8,
      elevation: 10,
      width: tileWidth,
      height: tileHeight,
      position: 'relative',
    },
    gradient: {
      borderRadius: 10,
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      padding: 10,
      width: '100%',
      height: '100%',
      borderRadius: 10, // Ensure this matches the gradient's borderRadius if applicable
    },
    image: {
      width: '100%',
      height: '60%',
      borderRadius: 10,
      marginBottom: 5,
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      color: currentTheme.palTileTextColor,
    },
    typesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    rarityBadge: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 5,
      borderRadius: 5,
      backgroundColor: '#fff', // You might want to adjust this based on your theme
    },
    rarityText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },
    captureButton: {
      position: 'absolute',
      top: 5,
      left: 5,
      width: 30,
      height: 30,
    },
  });

  return (
    <View style={styles.container}>
      {isGold ? (
        <LinearGradient
          colors={['#FFD700', '#FFA500', '#FFD700']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <Image style={styles.image} source={pal.image} />
            <View style={styles.typesContainer}>
              {pal.types.map((type, index) => (
                <TypePin key={index} type={type} tileWidth={tileWidth} />
              ))}
            </View>
            <Text style={[styles.text, {color: currentTheme.goldenPalTileTextColor}]}>{pal.name}</Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.contentContainer, { backgroundColor: currentTheme.palTileBackgroundColor }]}>
          <Image style={styles.image} source={pal.image} />
          <View style={styles.typesContainer}>
            {pal.types.map((type, index) => (
              <TypePin key={index} type={type} tileWidth={tileWidth} />
            ))}
          </View>
          <Text style={styles.text}>{pal.name}</Text>
        </View>
      )}
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
