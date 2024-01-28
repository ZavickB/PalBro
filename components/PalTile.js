import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import TypePin from './TypePin';

const PalTile = ({ palName, palImageSource, palTypes, tileWidth, tileHeight, spacing }) => {
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            margin: spacing,
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
    });

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={palImageSource} />
            <Text style={styles.text}>{palName}</Text>
            <View style={styles.typesContainer}>
                {palTypes.map((type, index) => (
                    <TypePin key={index} type={type} />
                ))}
            </View>
        </View>
    );
};

export default PalTile;
