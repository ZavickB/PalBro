import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import TypeBadge from './TypeBadge'; // Adjust the import path as needed

const PalTile = ({ palName, palImageSource, palTypes, tileWidth, tileHeight, spacing }) => {
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            margin: spacing, // Ajoutez la marge inférieure
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            width: tileWidth,
            height: tileHeight,
        },
        image: {
            width: '100%',
            height: 100,
            borderRadius: 10,
            marginBottom: 10,
        },
        text: {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        typesContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
        },
        typeBadge: {
            // Styles for individual type badges
            margin: 2,
            // Add more styling as needed
        },
    });

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={palImageSource} />
            <Text style={styles.text}>{palName}</Text>
            <View style={styles.typesContainer}>
                <TypeBadge types={palTypes} />
            </View>
        </View>
    );
};

export default PalTile;
