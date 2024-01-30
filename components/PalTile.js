import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import TypePin from './TypePin';
import { useTheme } from './ThemeContext';

const PalTile = ({ pal, tileWidth, tileHeight, spacing, isCaptured, onCapturePress }) => {

  const { currentTheme } = useTheme();

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
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 10,
      margin: spacing,
      shadowColor: getRarityColor(pal.rarity),
      shadowOffset: {
        width: 4,
        height: 6,
      },
      shadowOpacity: 0.8,
      shadowRadius: 8,
      elevation: 10,
      width: tileWidth,
      height: tileHeight,
      position: 'relative',
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
    },
    rarityText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },
    captureButton: {
      position: 'absolute',
      top: 5, // Set top to 0 to align with the top edge
      left: 5, // Set left to 0 to align with the left edge
      width: 30,
      height: 30,
    },    
  });

  return (
    <View style={[styles.container, { shadowColor: getRarityColor(pal.rarity) }]}>
      <Image style={styles.image} source={pal.image} />
      <View style={styles.typesContainer}>
        {pal.types.map((type, index) => (
          <TypePin key={index} type={type} />
        ))}
      </View>
      <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(pal.rarity) }]}>
        <Text style={styles.rarityText}>{pal.rarity}</Text>
      </View>
      <Text style={styles.text}>{pal.name}</Text>
      <TouchableOpacity onPress={onCapturePress} style={[styles.captureButton]}>
        <Image
          source={require('../assets/images/Sphere_icon.png')}
          style={[
            styles.captureButton,
            isCaptured
              ? {} // No additional styles when captured
              : {
                  tintColor: 'gray', // Apply gray color when not captured
                },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PalTile;
