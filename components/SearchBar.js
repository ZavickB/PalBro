import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from './contexts/ThemeContext';

const SearchBar = ({ searchText, onSearchChange, placeholder, resetFilters }) => {
  
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: currentTheme.searchBarBackgroundColor,
      borderRadius: 30,
      paddingHorizontal: 15,
      elevation: 3, // Add elevation for a card-like effect
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3.84,
      marginVertical: 10,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 10,
      color: currentTheme.textColor,
    },
    emptyButton: {
      padding: 10,
    },
  });
  
  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} style={styles.searchIcon} color={currentTheme.primaryColor} />
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
        <Icon name="close" size={20} color={currentTheme.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
