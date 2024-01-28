import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TypeBadge = ({ types }) => {
  return (
    <View style={styles.container}>
      {types.map((type, index) => (
        <View key={index} style={[styles.badge, { backgroundColor: getTypeColor(type) }]}>
          <Text style={styles.text}>{type}</Text>
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TypeBadge;
