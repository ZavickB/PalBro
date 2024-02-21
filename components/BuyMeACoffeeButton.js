import React from 'react';
import { View, TouchableOpacity, Linking, Image, StyleSheet } from 'react-native';
import { useTheme } from './contexts/ThemeContext'; // Adjust the import path as needed
import { scale, verticalScale } from 'react-native-size-matters';

const BuyMeACoffeeButton = () => {
    const { currentTheme } = useTheme(); // Use the useTheme hook to access the current theme

    // URL to your Buy Me a Coffee page
    const buyMeACoffeeUrl = 'https://www.buymeacoffee.com/zavickb';

    const handlePress = () => {
        Linking.openURL(buyMeACoffeeUrl).catch(err => console.error('An error occurred', err));
    };

    // Determine the image source based on the current theme
    const imageSource = require('../assets/bmc-button.png') 
        
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress}>
                <Image
                    source={imageSource}
                    style={styles.buttonImage}
                    resizeMode="contain"
                    tintColor={currentTheme.buttonImageTintColor}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: scale(10),
    },
    buttonImage: {
        width: scale(200), // Set the width as needed
        height: scale(60), // Set the height as needed
    },
});

export default BuyMeACoffeeButton;
