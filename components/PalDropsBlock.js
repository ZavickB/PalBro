import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import ItemsList from '../assets/data/ItemsList';

const PalDropsBlock = ({ drops }) => {
  const { currentTheme } = useTheme();

  // Utility function to format drop names for display and matching
  const formatDropName = (dropName) => {
    return dropName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

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
        keyExtractor={(item, index) => item + index} // Updated to handle potential duplicates
        renderItem={({ item }) => {
          // Use formatted name for display and matching
          const formattedName = formatDropName(item);
          const itemData = ItemsList.find((itemObject) => itemObject.name === formattedName);

          return (
            <View style={styles.dropItem}>
              {itemData?.icon && (
                <Image
                  source={itemData.icon} // Assuming icon is a valid React Native Image source
                  style={styles.dropIcon}
                />
              )}
              <Text style={styles.dropText}>{formattedName}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PalDropsBlock;
