import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from './contexts/ThemeContext';

const SearchBar = ({ searchText, onSearchChange, placeholder, resetFilters, choices }) => {
  const { currentTheme } = useTheme();
  const [showChoices, setShowChoices] = useState(false); // State to track whether to show choices

  const styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: currentTheme.searchBarBackgroundColor,
      borderRadius: 30,
      paddingHorizontal: 15,
      elevation: 3,
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
    choiceContainer: {
      position: 'absolute',
      top: 60, // Adjust the top position based on your layout
      left: 0,
      right: 0,
      backgroundColor: currentTheme.searchBarBackgroundColor,
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: currentTheme.borderColor,
      zIndex: 1000, // Ensure choices appear above other elements
    },
    choiceItem: {
      paddingVertical: 5,
    },
  });

  const handleInputChange = (text) => {
    onSearchChange(text); // Call the provided onSearchChange function
    setShowChoices(!!text); // Show choices if text is present
  };

  const renderChoiceItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSearchChange(item)} style={styles.choiceItem}>
      <Text style={{ color: currentTheme.textColor }}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Icon name="search" size={20} style={styles.searchIcon} color={currentTheme.primaryColor} />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={currentTheme.textColor}
            style={[styles.searchInput, { borderColor: currentTheme.borderColor }]}
            onChangeText={handleInputChange}
            value={searchText}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            resetFilters();
            onSearchChange('');
          }}
          style={styles.emptyButton}
        >
          <Icon name="close" size={20} color={currentTheme.primaryColor} />
        </TouchableOpacity>
      </View>
      {showChoices && (
        <FlatList
          data={choices.filter((choice) => choice.toLowerCase().includes(searchText.toLowerCase()))}
          renderItem={renderChoiceItem}
          keyExtractor={(item) => item}
          style={styles.choiceContainer}
        />
      )}
    </View>
  );
};

export default SearchBar;
