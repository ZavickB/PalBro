import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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
            <FontAwesome name="user" size={24} color="black" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.icon} onPress={handleGoBack}>
            <FontAwesome name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesome name="user" size={24} color="black" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Use space-between to separate the icons
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    height: 60, // Set a fixed height for the top bar
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
});

export default TopBar;
