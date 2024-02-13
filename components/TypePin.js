import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const TypePin = ({ type, tileWidth }) => {
    type = capitalize(type);
    
    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center', // Center content vertically and horizontally
            margin: 2,
        },
        badge: {
            alignItems: 'center',
            justifyContent: 'center', // Center content vertically and horizontally
            width: tileWidth ? tileWidth / 4 : 30, // Adjust the size as needed
            height: tileWidth ? tileWidth / 4 : 30, // Adjust the size as needed
            borderRadius: 18, // Make it round
            backgroundColor: getTypeColor(type),
            margin: 4,
        },
        typeIcon: {
            width: 20,
            height: 20,
            alignItems: 'center', // Center the image inside the badge
            justifyContent: 'center', // Center the image inside the badge
        },
        typeName: {
            color: 'white',
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.badge}>
                <Image style={styles.typeIcon} source={getTypeIcon(type)} />
            </View>
        </View>
    );
};

const capitalize = (str) => {
    if (typeof str !== 'string' || str.length === 0) return ''; // Check if str is not a string or is an empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const getTypeColor = (type) => {
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
        // Add more types and colors as needed
    };

    return typeColors[type] || 'gray';
};


const getTypeIcon = (type) => {
    const typeIcons = {
        "Ground": require('../assets/images/types/Ground_icon.png'),
        "Fire": require('../assets/images/types/Fire_icon.png'),
        "Dragon": require('../assets/images/types/Dragon_icon.png'),
        "Water": require('../assets/images/types/Water_icon.png'),
        "Electric": require('../assets/images/types/Electric_icon.png'),
        "Grass": require('../assets/images/types/Grass_icon.png'),
        "Normal": require('../assets/images/types/Normal_icon.png'),
        "Dark": require('../assets/images/types/Dark_icon.png'),
        "Ice": require('../assets/images/types/Ice_icon.png'),
    };

    return typeIcons[type];
};

export default TypePin;
