import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { responsiveScale } from '../utils/responsiveScale';

const capitalize = (str) => {
  if (typeof str !== 'string' || str.length === 0) return ''; // Check if str is not a string or is an empty string
  return str.charAt(0).toUpperCase() + str.slice(1);
}


const TypeBadge = ({ types }) => {
  return (
    <View style={styles.container}>
      {types[0].map((type, index) => (
        <View key={index} style={[styles.badge, { backgroundColor: getTypeColor(capitalize(type)) }]}>
          <Text style={styles.text}>{capitalize(type)}</Text>
        </View>
      ))}
    </View>
  );
};

const getTypeColor = (type) => {
  // Define colors for each type
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

  return typeColors[type] || 'gray'; // Default to gray if type is not found
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: responsiveScale(8, "width"),
    paddingVertical: responsiveScale(4, "height"),
    borderRadius: responsiveScale(8),
    marginHorizontal:responsiveScale(4, "width"),
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: responsiveScale(14),
  },
});

export default TypeBadge;
