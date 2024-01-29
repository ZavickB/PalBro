import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import TypePin from './TypePin';
import { useTheme } from './ThemeContext';

const PalTile = ({ palName, palImageSource, palTypes, rarity, tileWidth, tileHeight, spacing }) => {
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
            shadowColor: getRarityColor(rarity),
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
            position: 'absolute', // Position absolutely within the container
            top: 10, // Adjust as needed
            right: 10, // Adjust as needed
            padding: 5,
            borderRadius: 5,
            // Add other styling for your rarity badge here
        },
        rarityText: {
            // Styling for the text inside the rarity badge
            color: 'white',
            fontWeight: 'bold',
            fontSize: 12,
        },
    });

    return (
        <View style={[styles.container , { shadowColor: getRarityColor(rarity) } ]}>
            <Image style={styles.image} source={palImageSource} />
            <View style={styles.typesContainer}>
                {palTypes.map((type, index) => (
                    <TypePin key={index} type={type} />
                ))}
            </View>
            <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(rarity) }]}>
                <Text style={styles.rarityText}>{rarity}</Text>
            </View>
            <Text style={styles.text}>{palName}</Text>
        </View>
    );
};

export default PalTile;
