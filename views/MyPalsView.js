import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext';
import { ActivityIndicator } from 'react-native';

const MyPalsView = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const [capturedPals, setCapturedPals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

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

    if (capturedPals.includes(palKey)) {
      updatedCapturedPals = capturedPals.filter((key) => key !== palKey);
    } else {
      updatedCapturedPals = [...capturedPals, palKey];
    }

    setCapturedPals(updatedCapturedPals);
    storeData(STORAGE_KEY, updatedCapturedPals);
  };

  const STORAGE_KEY = 'capturedPals';

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log('Retrieved data:', value); // Add this line
      return value !== null ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error retrieving data:', error);
      return [];
    }
  };

  useEffect(() => {
    // Load captured Pals from AsyncStorage
    getData(STORAGE_KEY)
      .then((storedCapturedPals) => {
        if (storedCapturedPals !== null) {
          // Data found, set it in the state
          setCapturedPals(storedCapturedPals);
        }
        setIsLoading(false); // Mark loading as complete
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setIsLoading(false); // Mark loading as complete even in case of error
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Render a loading indicator while data is loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={currentTheme.primaryColor} />
      </View>
    );
  }

  // Filter the PalsProfilesStatsAndBreedings data to display only captured pals
  const capturedPalsData = PalsProfilesStatsAndBreedings.filter((pal) =>
    capturedPals.includes(pal.key)
  );

  console.log('Captured pals data:', capturedPalsData); // Add this line

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.appContainer}>
        <TopBar title="My Pals" navigation={navigation} theme={currentTheme} />
        <SearchableList
          data={capturedPalsData} // Pass the capturedPalsData as data
          renderItem={({ item }) => (
            <View style={styles.listContainer}>
              <TouchableOpacity onPress={() => handleTilePress(item)}>
                <PalTile
                  pal={item}
                  tileWidth={tileWidth}
                  tileHeight={tileHeight}
                  spacing={spacing}
                  onCapturePress={() => toggleCapture(item.key)}
                  isCaptured={capturedPals.includes(item.key)}
                />
              </TouchableOpacity>
            </View>
          )}
          numColumns={3}
          emptyStateText="No captured Pals found."
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

export default MyPalsView;
