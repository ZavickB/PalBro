import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import ItemsList from '../assets/data/ItemsList';
import { responsiveScale } from '../utils/responsiveScale';

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
      padding: responsiveScale(10),
      borderRadius: responsiveScale(10),
      marginVertical: responsiveScale(10, 'height'),
    },
    dropItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsiveScale(10, 'height'),
      borderWidth: responsiveScale(1),
      borderColor: currentTheme.borderColor || 'black',
      borderRadius: responsiveScale(5),
      padding: responsiveScale(10),
      justifyContent: 'space-between',
    },
    dropIcon: {
      width: responsiveScale(30),
      height: responsiveScale(30),
      marginRight: responsiveScale(10, 'width'),
    },
    dropText: {
      color: currentTheme.textColor,
      flex: 1,
      fontWeight: 'bold',
      fontSize: responsiveScale(16),
      marginLeft:responsiveScale(10, 'width'), // Space between icon and text
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
