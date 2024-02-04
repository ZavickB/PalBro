import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import TypesList from '../assets/data/TypesList';
import SuitabilitiesProfiles from '../assets/data/SuitabilitiesProfiles';
import FiltersModal from './FiltersModal';
import { FloatingAction } from "react-native-floating-action"; // Import the FloatingAction component
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from './SearchBar';

import { Switch } from 'react-native';


const SearchableList = ({ data, renderItem, emptyStateText, numColumns, resetKey, searchBarPlaceholder }) => {
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

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

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
      color: currentTheme.textColor,
    },
    filterOptionRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly', // This helps distribute space evenly around items.
    },
    filterOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
      marginRight: 5, // Adjust as needed to fit three items per row comfortably.
      flex: 1, // Allows the option to flexibly expand but might need adjustment.
      minWidth: '30%', // Adjusted from 45% to fit 3 items per row.
    },
    icon: {
      width: 35,
      height: 35,
      marginRight: 10,
    },
    switchButton: {
      marginRight: 5,
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
                <Switch
                  value={selectedSuitabilities.includes(type.type)}
                  onValueChange={() => toggleSuitabilityFilter(type.type)}
                  thumbColor={currentTheme.switchThumbColor} // Using the new theme prop for thumb color
                  trackColor={{ false: currentTheme.switchTrackColorOff, true: currentTheme.switchTrackColorOn }} // Using the new theme props for track color
                  style={styles.switchButton}
                />
                <Image source={type.iconFileName} style={styles.icon} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Suitabilities:</Text>
          <View style={styles.filterOptionRow}>
            {SuitabilitiesProfiles.map((suitability) => (
              <View key={suitability.workName} style={styles.filterOption}>
                <Switch
                  value={selectedSuitabilities.includes(suitability.workName)}
                  onValueChange={() => toggleSuitabilityFilter(suitability.workName)}
                  thumbColor={currentTheme.switchThumbColor} // Using the new theme prop for thumb color
                  trackColor={{ false: currentTheme.switchTrackColorOff, true: currentTheme.switchTrackColorOn }} // Using the new theme props for track color
                  style={styles.switchButton}
                />
                {suitability.iconFileName && (
                  <Image source={suitability.iconFileName} style={styles.icon} />
                )}
              </View>
            ))}
          </View>
        </View>
      </FiltersModal>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        onSearchSubmit={() => filterData(searchText, selectedTypes, selectedSuitabilities)}
        currentTheme={currentTheme}
        placeholder={searchBarPlaceholder}
        resetFilters={() => {
          setSelectedTypes([]);
          setSelectedSuitabilities([]);
        }}
      />

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
