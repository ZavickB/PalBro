import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useTheme } from '../components/ThemeContext';

const MainView = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const [capturedPals, setCapturedPals] = useState([]); // State to store captured Pals

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  const handleTilePress = (item) => {
    navigation.navigate('Details', { palData: item });
  };

  const toggleCapture = (palKey) => {
    let updatedCapturedPals;

    // Check if the Pal is already captured
    if (capturedPals.includes(palKey)) {
      // Pal is captured, release it
      updatedCapturedPals = capturedPals.filter((key) => key !== palKey);
    } else {
      // Pal is not captured, capture it
      updatedCapturedPals = [...capturedPals, palKey];
    }

    // Update the state
    setCapturedPals(updatedCapturedPals);

    // Store the updated capturedPals array in AsyncStorage
    storeData(STORAGE_KEY, updatedCapturedPals);
  };

  // Custom sorting function
  PalsProfilesStatsAndBreedings.sort((a, b) => {
    const aKey = a.key.toLowerCase();
    const bKey = b.key.toLowerCase();

    // Extract the numeric part of the keys
    const aNumeric = parseInt(aKey, 10);
    const bNumeric = parseInt(bKey, 10);

    // Extract the letter part of the keys
    const aLetter = aKey.replace(/^\d+/g, '');
    const bLetter = bKey.replace(/^\d+/g, '');

    // Compare the numeric parts
    if (aNumeric < bNumeric) return -1;
    if (aNumeric > bNumeric) return 1;

    // If numeric parts are equal, compare the letter parts
    return aLetter.localeCompare(bLetter);
  });

  // Define the storage key for captured Pals
  const STORAGE_KEY = 'capturedPals';

  // Function to store data in AsyncStorage
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Handle AsyncStorage errors here
      console.error('Error storing data:', error);
    }
  };

  // Function to retrieve data from AsyncStorage
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      // Handle AsyncStorage errors here
      console.error('Error retrieving data:', error);
      return null;
    }
  };

  useEffect(() => {
    // Load captured Pals from AsyncStorage
    getData(STORAGE_KEY).then((storedCapturedPals) => {
      if (storedCapturedPals !== null) {
        // Data found, set it in the state
        setCapturedPals(storedCapturedPals);
      }
    });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.appContainer}>
        <TopBar title="Home" navigation={navigation} theme={currentTheme} />
        <SearchableList
          data={PalsProfilesStatsAndBreedings}
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <TouchableOpacity onPress={() => handleTilePress(item)}>
                <PalTile
                  pal={item}
                  tileWidth={tileWidth}
                  tileHeight={tileHeight}
                  spacing={spacing}
                  onCapturePress={() => toggleCapture(item.key)} // Pass the toggleCapture function
                  isCaptured={capturedPals.includes(item.key)} // Check if the Pal is captured
                />
              </TouchableOpacity>
            </View>
          )}
          numColumns={3} // Set the number of columns to 3
          emptyStateText="No matching Pals found."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MainView;
