import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import TopBar from '../components/TopBar';
import { useTheme } from '../components/contexts/ThemeContext';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import ItemsList from '../assets/data/ItemsList';
import { useMemo } from 'react';
import GradientBackground from '../components/GradientBackground';
import SearchBar from '../components/SearchBar';
import PalDropsModal from '../components/PalDropsModal'; // Import the DropsModal component

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
    const filtered = uniqueDropsData.filter((drop) =>
      drop.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDrops(filtered);
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    appContainer: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: currentTheme.textColor,
    },
    dropItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: currentTheme.borderColor,
      borderRadius: 10,
      padding: 10,
      backgroundColor: currentTheme.backgroundColor,
      shadowColor: "black",
      shadowOffset: {
        width: 4,
        height: 6,
      },
      shadowOpacity: 0.8,
      shadowRadius: 8,
    },
    dropText: {
      fontSize: 20,
      color: currentTheme.textColor,
    },
    loadingIndicator: {
      marginTop: 20,
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
            placeholder={'Search for drops...'}
            resetFilters={() => {
              setSearchText('');
            }}
          />
          <FlatList
            data={filteredDrops}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <View style={styles.dropItem}>
                  <Image
                    source={ItemsList.find((itemObject) => itemObject.name === item)?.icon}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <Text style={styles.dropText}>{item}</Text>
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
