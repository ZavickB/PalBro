import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext';
import GradientBackground from '../components/GradientBackground';

const MainView = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  const [capturedPals, setCapturedPals] = useState([]);
  const STORAGE_KEY = 'capturedPals';

  const handleTilePress = (item) => {
    navigation.navigate('PalsDetails', { palData: item });
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
      return value !== null ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error retrieving data:', error);
      return [];
    }
  };

  useEffect(() => {
    // Load data from local storage when the component mounts
    const loadData = async () => {
      const storedCapturedPals = await getData(STORAGE_KEY);
      setCapturedPals(storedCapturedPals);
    };

    loadData();
  }, []); // Initial data load when the component mounts

  PalsProfilesStatsAndBreedings.sort((a, b) => {
    const aKey = a.key.toLowerCase();
    const bKey = b.key.toLowerCase();

    const aNumeric = parseInt(aKey, 10);
    const bNumeric = parseInt(bKey, 10);

    const aLetter = aKey.replace(/^\d+/g, '');
    const bLetter = bKey.replace(/^\d+/g, '');

    if (aNumeric < bNumeric) return -1;
    if (aNumeric > bNumeric) return 1;

    return aLetter.localeCompare(bLetter);
  });

  return (
    <GradientBackground>
      <View style={[styles.container ]}>
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
                    onCapturePress={() => toggleCapture(item.key)}
                    isCaptured={capturedPals.includes(item.key)}
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
            emptyStateText="No matching Pals found."
          />
        </View>
      </View>
    </GradientBackground>
  );
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
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MainView;
