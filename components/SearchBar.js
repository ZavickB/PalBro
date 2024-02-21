import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from './contexts/ThemeContext';
import { responsiveScale } from '../utils/responsiveScale';

const SearchBar = ({ searchText, onSearchChange, placeholder, resetFilters }) => {
  
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: currentTheme.searchBarBackgroundColor,
      borderRadius: responsiveScale(30),
      paddingHorizontal: responsiveScale(15, 'width'),
      elevation: 3, // Add elevation for a card-like effect
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: responsiveScale(2, 'height'),
      },
      shadowOpacity: 0.2,
      shadowRadius: responsiveScale(3.84),
      marginVertical: responsiveScale(10, 'height'),
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchIcon: {
      marginRight: responsiveScale(10, 'width'),
    },
    searchInput: {
      flex: 1,
      fontSize: responsiveScale(16),
      paddingVertical: responsiveScale(10, 'height'),
      color: currentTheme.textColor,
    },
    emptyButton: {
      padding: responsiveScale(10),
    },
  });
  
  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={responsiveScale(20)} style={styles.searchIcon} color={currentTheme.primaryColor} />
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
        <Icon name="close" size={responsiveScale(20)} color={currentTheme.primaryColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
