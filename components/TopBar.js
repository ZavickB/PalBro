import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import SolarEclipseImage from '../assets/full-solar-eclipse.png'; // Adjust the path as needed

const TopBar = ({ title, navigation }) => {
  const handleDrawerOpen = () => {
    if (navigation) {
      navigation.openDrawer();
    }
  };

  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.topBar}>
      {title ? (
        <>
          <TouchableOpacity style={styles.icon} onPress={handleDrawerOpen}>
            <FontAwesome name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.icon}>
            <Image source={SolarEclipseImage} style={styles.eclipseImage} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.icon} onPress={handleGoBack}>
            <FontAwesome name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Image source={SolarEclipseImage} style={styles.eclipseImage} />
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
    backgroundColor: '#f5f5f5',
    height: 60, // Set a fixed height for the top bar
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '95%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Winter-Drink',
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
