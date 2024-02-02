import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Modal, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext';
import TypesList from '../assets/data/TypesList';
import SuitabilitiesProfiles from '../assets/data/SuitabilitiesProfiles';
import FiltersModal from './FiltersModal';
import CheckBox from 'expo-checkbox';
import { FloatingAction } from "react-native-floating-action"; // Import the FloatingAction component
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchableList = ({ data, renderItem, emptyStateText, numColumns }) => {
  const { currentTheme } = useTheme();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSuitabilities, setSelectedSuitabilities] = useState([]);

  // Define the actions for the FloatingAction button
  const actions = [
    {
      text: "Filter",
      icon: <Icon name="filter" size={25} color="#fff" />,
      name: "bt_filter",
      position: 1,
      color: currentTheme.primaryColor,
    },
  ];

  useEffect(() => {
    filterData(searchText, selectedTypes, selectedSuitabilities);
  }, [searchText, selectedTypes, selectedSuitabilities]);

  const filterData = (text, types, suitabilities) => {
    const filtered = data.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(text.toLowerCase());
      
      // Check if all selected types are present in the pal's types array.
      const typeMatch =
        types.length === 0 ||
        types.every((type) => item.types.includes(type));
  
      // Check if all selected suitabilities are present in the pal's suitabilities array.
      const suitabilityMatch =
        suitabilities.length === 0 ||
        suitabilities.every((suitability) =>
          item.suitability.some((s) => s.type === suitability)
        );
  
      return nameMatch && typeMatch && suitabilityMatch;
    });
    setFilteredData(filtered);
  };
  

  const toggleTypeFilter = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleSuitabilityFilter = (suitability) => {
    if (selectedSuitabilities.includes(suitability)) {
      setSelectedSuitabilities(selectedSuitabilities.filter((s) => s !== suitability));
    } else {
      setSelectedSuitabilities([...selectedSuitabilities, suitability]);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {
      flex: 1,
      alignItems: 'center',
    },
    actionButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: currentTheme.modalBackground, // Using modalBackground from theme
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderRadius: 20,
      paddingHorizontal: 15,
      backgroundColor: '#fff', // Ensuring input is visibly distinct
      color: currentTheme.textColor, // Text color adapted to theme
    },
    emptyState: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 20,
      color: 'gray',
    },
    filterButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginHorizontal: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      alignSelf: 'flex-end',
    },
    filterModal: {
      padding: 20,
      height: '80%',
      marginTop: '20%',
    },
    closeFilterButton: {
      padding: 10,
    },
    closeButtonText: {
      color: 'blue',
    },
    filterSection: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    filterOptionRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    filterOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginRight: 20,
    },
    icon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
  });

  return (
    <View style={[styles.container]}>
      <FiltersModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Types:</Text>
          <View style={styles.filterOptionRow}>
            {TypesList.map((type) => (
              <View key={type.type} style={styles.filterOption}>
                <CheckBox
                  value={selectedTypes.includes(type.type)}
                  onValueChange={() => toggleTypeFilter(type.type)}
                />
                <Image source={type.iconFileName} style={styles.icon} />
                <Text>{type.type}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Suitabilities:</Text>
          <View style={styles.filterOptionRow}>
            {SuitabilitiesProfiles.map((suitability) => (
              <View key={suitability.workName} style={styles.filterOption}>
                <CheckBox
                  value={selectedSuitabilities.includes(suitability.workName)}
                  onValueChange={() => toggleSuitabilityFilter(suitability.workName)}
                />
                {suitability.iconFileName && (
                  <Image source={suitability.iconFileName} style={styles.icon} />
                )}
                <Text>{suitability.workName}</Text>
              </View>
            ))}
          </View>
        </View>
      </FiltersModal>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={currentTheme.textColor}
          style={[styles.searchInput, { borderColor: currentTheme.borderColor }]}
          onChangeText={setSearchText}
          value={searchText}
        />
        <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
          <Icon name="search" size={20} color={currentTheme.primaryColor} />
        </TouchableOpacity>
      </View>

      {filteredData.length === 0 && <Text style={styles.emptyState}>{emptyStateText}</Text>}
      <View style={[styles.container]}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.key}`}
          numColumns={numColumns}
        />
      </View>

      <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name === "bt_filter") {
            setFilterModalVisible(true);
          }
        }}
        color={currentTheme.backgroundColor}
        overlayColor='rgba(0, 0, 0, 0.0)'
      />
    </View>
  );
};

export default SearchableList;
