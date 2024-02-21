import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import TypesList from '../assets/data/TypesList';
import SuitabilitiesProfiles from '../assets/data/SuitabilitiesProfiles';
import FiltersModal from './FiltersModal';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from './SearchBar';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext';
import { Switch } from 'react-native';
import { scale } from 'react-native-size-matters';


const SearchableList = ({ data, renderItem, emptyStateText, numColumns, resetKey, searchBarPlaceholder }) => {
  const { currentTheme } = useTheme();
  const { capturedPals } = useCapturedPals();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSuitabilities, setSelectedSuitabilities] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);


  // Define the actions for the FloatingAction button
  const actions = [
    {
      text: "Filters",
      icon: <Icon name="filter" size={scale(25)} color="#fff" />,
      name: "bt_filter",
      position: 1,
      color: currentTheme.primaryColor,
    },
    {
      text: "Sort by Name A-Z",
      icon: <Icon name="sort-alpha-asc" size={scale(25)} color="#fff" />,
      name: "sort_name_asc",
      position: 2,
      color: currentTheme.primaryColor,
    },
    {
      text: "Sort by Name Z-A",
      icon: <Icon name="sort-alpha-desc" size={scale(25)} color="#fff" />,
      name: "sort_name_desc",
      position: 3,
      color: currentTheme.primaryColor,
    },
    {
      text: !hideCompleted ? "Hide Completed Pals" : "Show Completed Pals",
      icon: <Icon name={!hideCompleted ?"eye-slash" : "eye"} size={scale(25)} color="#fff" />,
      name: "toggle_hide_completed",
      position: 4,
      color: currentTheme.primaryColor,
    },
    {
      text: "Reset Filters & Sort",
      icon: <Icon name="refresh" size={scale(25)} color="#fff" />,
      name: "reset_all",
      position: 5,
      color: currentTheme.primaryColor,
    },
  ];

  useEffect(() => {
    filterData(searchText, selectedTypes, selectedSuitabilities, hideCompleted);
  }, [searchText, selectedTypes, selectedSuitabilities, hideCompleted, capturedPals]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const filterData = (text, types, suitabilities, hideCompleted) => {
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
            
      const hideCompletedMatch = !hideCompleted || capturedPals[item.key] < 10 || capturedPals[item.key] === undefined;

      return nameMatch && typeMatch && suitabilityMatch && hideCompletedMatch;
    });
  
    if (hideCompleted) {
      // Sort by capture number decreasing, but only for those not completed
      filtered.sort((a, b) => {
        // Assuming capturedPals[item.key] holds the capture count, adjust if necessary
        const captureCountA = capturedPals[a.key] || 0;
        const captureCountB = capturedPals[b.key] || 0;
  
        // Sort by capture count decreasing
        return captureCountB - captureCountA;
      });
    }

    // Sort filtered data by suitability level if a single suitability is selected
    if (suitabilities.length === 1) {
      const selectedSuitability = suitabilities[0];
      filtered.sort((a, b) => {
        const suitabilityA = a.suitability.find((s) => s.type === selectedSuitability);
        const suitabilityB = b.suitability.find((s) => s.type === selectedSuitability);
        const levelA = suitabilityA ? suitabilityA.level : 0;
        const levelB = suitabilityB ? suitabilityB.level : 0;
        return levelB - levelA;
      });
    }
  
    // Sort filtered data by combined suitability level if multiple suitabilities are selected
    if (suitabilities.length > 1) {
      filtered.sort((a, b) => {
        const combinedLevelA = suitabilities.reduce((totalLevel, suitability) => {
          const palSuitability = a.suitability.find((s) => s.type === suitability);
          return totalLevel + (palSuitability ? palSuitability.level : 0);
        }, 0);
        const combinedLevelB = suitabilities.reduce((totalLevel, suitability) => {
          const palSuitability = b.suitability.find((s) => s.type === suitability);
          return totalLevel + (palSuitability ? palSuitability.level : 0);
        }, 0);
        return combinedLevelB - combinedLevelA;
      });
    }
  
    setFilteredData(filtered);
  };
  
  const toggleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  const sortData = (sortOption) => {
    const sortedData = [...filteredData]; // Create a copy to avoid direct state mutation
  
    switch (sortOption) {
      case 'sort_name_asc':
        sortedData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'sort_name_desc':
        sortedData.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // No default sorting
        break;
    }
  
    setFilteredData(sortedData); // Update the state with the sorted data
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
      paddingHorizontal: scale(10),
      marginBottom: scale(20),
    },
    searchInput: {
      flex: 1,
      height: scale(40),
      borderWidth: scale(1),
      borderRadius: scale(20),
      paddingHorizontal: scale(15),
      backgroundColor: '#fff', // Ensuring input is visibly distinct
      color: currentTheme.textColor, // Text color adapted to theme
    },
    emptyState: {
      fontSize: scale(18),
      textAlign: 'center',
      marginTop: scale(20),
      color: 'gray',
    },
    filterButton: {
      paddingHorizontal: scale(10),
      paddingVertical: scale(5),
      marginHorizontal: scale(10),
      marginBottom: scale(10),
      borderWidth: scale(1),
      borderColor: 'gray',
      borderRadius: scale(5),
      alignSelf: 'flex-end',
    },
    filterModal: {
      padding: scale(20),
      height: '80%',
      marginTop: '20%',
    },
    closeFilterButton: {
      padding: scale(10),
    },
    closeButtonText: {
      color: 'blue',
    },
    filterSection: {
      marginBottom: scale(20),
    },
    sectionTitle: {
      fontSize: scale(16),
      fontWeight: 'bold',
      marginBottom: scale(10),
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
      marginBottom: scale(5),
      marginRight: scale(5), // Adjust as needed to fit three items per row comfortably.
      flex: 1, // Allows the option to flexibly expand but might need adjustment.
      minWidth: '30%', // Adjusted from 45% to fit 3 items per row.
    },
    icon: {
      width: scale(35),
      height: scale(35),
      marginRight: scale(10),
    },
    switchButton: {
      marginRight: scale(5),
    },
  });

  const renderItemWithHideCompleted = ({ item }) => {
    return renderItem({
      item,
      hideCompleted, // Include hideCompleted in the props passed to renderItem
    });
  };

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
                  value={selectedTypes.includes(type.type.toLowerCase())}
                  onValueChange={() => toggleTypeFilter(type.type.toLowerCase())}
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
                
                  value={selectedSuitabilities.includes(suitability.workName.toLowerCase().replace(" ", "_"))}
                  onValueChange={() => toggleSuitabilityFilter(suitability.workName.toLowerCase().replace(" ", "_"))}
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
          renderItem={renderItemWithHideCompleted}
          keyExtractor={(item) => `${item.key}`}
          numColumns={numColumns}
        />
      </View>

      <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name === "bt_filter") {
            setFilterModalVisible(true);
          } else if (name === "toggle_hide_completed") {
            toggleHideCompleted(); // Toggle the hideCaptured state
          } else if (name === "reset_all") {
            setSearchText('');
            setSelectedTypes([]);
            setSelectedSuitabilities([]);
            setHideCompleted(false); // Reset hideCaptured to false
            sortData('');
          } else {
            sortData(name);
          }
        }}
        color={currentTheme.backgroundColor}
        overlayColor='rgba(0, 0, 0, 0.0)'
      />
    </View>
  );
};

export default SearchableList;
