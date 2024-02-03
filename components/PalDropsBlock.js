import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import ItemsList from '../assets/data/ItemsList';

const PalDropsBlock = ({ drops }) => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 10,
      marginVertical: 10,
    },
    dropItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: currentTheme.borderColor || 'black',
      borderRadius: 5,
      padding: 10,
      justifyContent: 'space-between',
    },
    dropIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    dropText: {
      color: currentTheme.textColor,
      flex: 1,
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 10, // Space between icon and text
    },
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={drops}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.dropItem}>
            <Image
              source={ ItemsList.find((itemObject) => itemObject.name === item)?.icon }
              style={styles.dropIcon}
            />
            <Text style={styles.dropText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PalDropsBlock;
