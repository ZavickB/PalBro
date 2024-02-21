import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import TopBar from '../components/TopBar';
import { useTheme } from '../components/contexts/ThemeContext';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import ItemsList from '../assets/data/ItemsList';
import { useMemo } from 'react';
import GradientBackground from '../components/GradientBackground';
import SearchBar from '../components/SearchBar';
import PalDropsModal from '../components/PalDropsModal'; // Import the DropsModal component
import { responsiveScale } from '../utils/responsiveScale';

const DropsView = ({ route, navigation }) => {
  const { currentTheme } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [filteredDrops, setFilteredDrops] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [palsWithItem, setPalsWithItem] = useState([]); // State for pals with the selected item

  // useMemo to memoize uniqueDropsData
  const uniqueDropsData = useMemo(() => {
    const uniqueDrops = new Set();
    PalsProfilesStatsAndBreedings.forEach((pal) => {
      pal.drops?.forEach((drop) => uniqueDrops.add(drop));
    });
    return Array.from(uniqueDrops);
  }, []);

  useEffect(() => {
    const filteredAndSorted = uniqueDropsData
      .filter(drop => drop.toLowerCase().includes(searchText.toLowerCase()))
      .sort((a, b) => a.localeCompare(b)); // Sort alphabetically
    setFilteredDrops(filteredAndSorted);
  }, [searchText, uniqueDropsData]);

  useEffect(() => {
    if (selectedItem) {
      setLoading(true); // Set loading state to true when fetching palsWithItem
      // Simulate an asynchronous API call (replace with your actual data fetching logic)
      setTimeout(() => {
        const pals = PalsProfilesStatsAndBreedings.filter((pal) =>
          pal.drops?.includes(selectedItem)
        );
        setPalsWithItem(pals);
        setLoading(false); // Set loading state to false when data is loaded
      }, 1000); // Simulate a 1-second delay (adjust as needed)
    }
  }, [selectedItem]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

    // Utility function to format drop names for display and matching
    const formatName = (dropName) => {
      return dropName
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    appContainer: {
      flex: 1,
      paddingHorizontal: responsiveScale(10, 'width'),
    },
    title: {
      fontSize: responsiveScale(24),
      fontWeight: 'bold',
      marginBottom: responsiveScale(16, 'height'),
      color: currentTheme.textColor,
    },
    dropItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: responsiveScale(10, 'height'),
      borderWidth: 1,
      borderColor: currentTheme.borderColor,
      borderRadius: responsiveScale(10),
      padding: responsiveScale(10, 'width'),
      backgroundColor: currentTheme.backgroundColor,
      shadowColor: "black",
      shadowOffset: {
        width: responsiveScale(4, 'width'),
        height: responsiveScale(6, 'height'),
      },
      shadowOpacity: 0.8,
      shadowRadius: responsiveScale(8),
    },
    dropText: {
      fontSize: responsiveScale(20),
      color: currentTheme.textColor,
    },
    emptyState: {
      fontSize: responsiveScale(18),
      textAlign: 'center',
      marginTop: responsiveScale(20, 'height'),
      color: 'gray',
    },
    loadingIndicator: {
      marginTop: responsiveScale(20, 'height'),
    },
  });

  const closeModal = () => {
    setSelectedItem(null);
    setModalVisible(false);
    setPalsWithItem([]); // Reset palsWithItem when modal is closed
  };

  return (
    <GradientBackground>
      <View style={[styles.container ]}>
        <View style={styles.appContainer}>
          <TopBar title="Index of Drops" navigation={navigation} theme={currentTheme} />
          <SearchBar
            searchText={searchText}
            onSearchChange={setSearchText}
            placeholder={'Browse Pals drops...'}
            resetFilters={() => {
              setSearchText('');
            }}
          />

          {filteredDrops.length === 0 && <Text style={styles.emptyState}>{"No matching drops found."}</Text>}
          <FlatList
            data={filteredDrops}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={styles.dropItem}>
                  <Image
                    source={ItemsList.find((itemObject) => itemObject.name === formatName(item))?.icon}
                    style={{ width: responsiveScale(50), height: responsiveScale(50), marginRight: responsiveScale(10) }}
                  />
                  <Text style={styles.dropText}>{formatName(item)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <PalDropsModal
            visible={modalVisible}
            onClose={closeModal}
            item={selectedItem}
            pals={palsWithItem}
            loading={loading} // Pass loading state to PalDropsModal
          />
        </View>
      </View>
    </GradientBackground>
  );
};

export default DropsView;
