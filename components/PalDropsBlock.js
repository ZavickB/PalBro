import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from './ThemeContext'; // Import the theme context

const PalDropsBlock = ({ drops }) => {
  const { currentTheme } = useTheme(); // Get the current theme from context

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: currentTheme.backgroundColor, // Use theme-aware background color
      borderRadius: 10,
      marginVertical: 10,
    },
    dropItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    dropIcon: {
      width: 20,
      height: 20,
      marginRight: 5,
      tintColor: currentTheme.textColor, // Tint the icon based on the theme
    },
    dropText: {
      color: currentTheme.textColor, // Set text color based on the theme
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: currentTheme.textColor }}>
        Potential Drops:
      </Text>
      {drops.map((drop, index) => (
        <View key={index} style={styles.dropItem}>
          <Image source={drop.icon} style={styles.dropIcon} />
          <Text style={styles.dropText}>{drop.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default PalDropsBlock;
