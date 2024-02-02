import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SolarEclipseImage from '../assets/full-solar-eclipse.png'; // Adjust the path as needed
import { useTheme } from './ThemeContext';

const TopBar = ({ title, navigation }) => {

  const { toggleTheme, currentTheme } = useTheme(); // Get current theme

  return (
    <View
      style={[styles.topBar]}
    >
      {title ? (
        <>
          <Text style={[styles.title, {color:currentTheme.textColor} ]}>PALPEDIIA</Text>
          <TouchableOpacity style={styles.icon} onPress={toggleTheme}>
            <Image source={SolarEclipseImage} style={[styles.eclipseImage, {tintColor:currentTheme.textColor}]} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.icon}  onPress={toggleTheme}>
            <Image source={SolarEclipseImage} style={[styles.eclipseImage, {tintColor:currentTheme.textColor}]} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    marginTop: 20, // Adjust the marginTop to account for the status bar
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Use space-between to separate the icons
    height: 60, // Set a fixed height for the top bar
    width: '100%',
  },
  title: {
    alignContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  eclipseImage: {
    width: 30, // Adjust the width as needed
    height: 30,
    // Adjust the height as needed
  },
});

export default TopBar;
