import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import ItemsList from '../assets/data/ItemsList';
import { scale, verticalScale } from 'react-native-size-matters';

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
      padding: scale(10),
      borderRadius: scale(10),
      marginVertical: scale(10),
    },
    dropItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(10),
      borderWidth: scale(1),
      borderColor: currentTheme.borderColor || 'black',
      borderRadius: scale(5),
      padding: scale(10),
      justifyContent: 'space-between',
    },
    dropIcon: {
      width: scale(30),
      height: scale(30),
      marginRight: scale(10),
    },
    dropText: {
      color: currentTheme.textColor,
      flex: 1,
      fontWeight: 'bold',
      fontSize: scale(16),
      marginLeft:scale(10), // Space between icon and text
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
