import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from './contexts/ThemeContext';
import { scale } from 'react-native-size-matters';

const SearchBar = ({ searchText, onSearchChange, placeholder, resetFilters }) => {
  
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: currentTheme.searchBarBackgroundColor,
      borderRadius: scale(30),
      paddingHorizontal: scale(15),
      elevation: 3, // Add elevation for a card-like effect
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: scale(2),
      },
      shadowOpacity: 0.2,
      shadowRadius: scale(3.84),
      marginVertical: scale(10),
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {
      marginRight: scale(10),
    },
    searchInput: {
      flex: 1,
      fontSize: scale(16),
      paddingVertical: scale(10),
      color: currentTheme.textColor,
    },
    emptyButton: {
      padding: scale(10),
    },
  });
  
  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={scale(20)} style={styles.searchIcon} color={currentTheme.primaryColor} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={currentTheme.textColor}
          style={[styles.searchInput, { borderColor: currentTheme.borderColor }]}
          onChangeText={onSearchChange}
          value={searchText}
        />
      </View>
      <TouchableOpacity 
        onPress={() => {
          resetFilters(); // Call resetFilters to reset the types, suitability, etc.
          onSearchChange(''); // Set the searchText state to an empty string
        }}
        style={styles.emptyButton}>
        <Icon name="close" size={scale(20)} color={currentTheme.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
