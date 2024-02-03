import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, RefreshControl, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext';

import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import GradientBackground from '../components/GradientBackground';
import SearchableList from '../components/SearchableList';
import PalTile from '../components/PalTile';

const MyPossibleBreedingsView = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const [capturedPals, setCapturedPals] = useState([]);
  const [isLoadingBreedings, setIsLoadingBreedings] = useState(true); // State to track loading of breedings
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  const STORAGE_KEY = 'capturedPals';

  const capturedPalsData = PalsProfilesStatsAndBreedings.filter((pal) =>
    capturedPals.includes(pal.key)
  );

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error retrieving data:', error);
      return [];
    }
  };

  const loadData = () => {
    getData(STORAGE_KEY)
      .then((storedCapturedPals) => {
        if (storedCapturedPals !== null) {
          // Data found, set it in the state
          setCapturedPals(storedCapturedPals);
        }
        setIsLoadingBreedings(false); // Mark loading as complete
        setRefreshing(false); // Stop the refresh indicator
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setIsLoadingBreedings(false); // Mark loading as complete even in case of error
        setRefreshing(false); // Stop the refresh indicator in case of error
      });
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
  
    // Trigger a refresh
    setRefreshing(true);
  };

  useEffect(() => {
    loadData();
  }, []); // Run this effect only once on component mount

  const calculatePotentialParents = (selectedPal, palsList) => {
    const potentialParents = [];

    // Iterate through all pals
    for (const pal of palsList) {
      const { breedings } = pal;

      // Check if the pal has breedings
      if (breedings) {
        for (const key in breedings) {
          if (breedings[key] === selectedPal.name) {
            // Find the parent pal by name
            const parent = palsList.find((p) => p.name === key);

            // Check if the parent is not undefined
            if (parent) {
              // Found a potential parent couple
              const parentCouple = [pal, parent];

              // Check if the couple is already in the array
              let alreadyInArray = false;
              for (const couple of potentialParents) {
                if (
                  (couple[0].name === parentCouple[0].name &&
                    couple[1].name === parentCouple[1].name) ||
                  (couple[0].name === parentCouple[1].name &&
                    couple[1].name === parentCouple[0].name)
                ) {
                  alreadyInArray = true;
                }
              }
              if (!alreadyInArray) {
                potentialParents.push(parentCouple);
              }
            }
          }
        }
      }
    }
    return potentialParents;
  };

  const calculatePotentialParentsForSelectedPal = (selectedPal) => {
    return calculatePotentialParents(selectedPal, capturedPalsData);
  };

  const renderPotentialParents = () => {
    // Assuming calculatePotentialParentsForSelectedPal returns an array of pals
    // Prepare data for SearchableList
    const dataForSearchableList = PalsProfilesStatsAndBreedings.map(pal => {
      const potentialParents = calculatePotentialParentsForSelectedPal(pal);
      return {
        ...pal,
        potentialParents: potentialParents.length > 0 ? potentialParents : null
      };
    }).filter(pal => pal.potentialParents); // Filter out pals with no potential parents

    return (
      <SearchableList
        data={dataForSearchableList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTilePress(item)}>
            <PalTile
              pal={item}
              tileWidth={tileWidth}
              tileHeight={tileHeight}
              spacing={5}
              onCapturePress={() => toggleCapture(item.key)}
              isCaptured={capturedPals.includes(item.key)}
            />
          </TouchableOpacity>
        )}
        numColumns={3}
        // Include other necessary props for SearchableList, such as search functionality
      />
    );
  };

  const handleTilePress = (item) => {
    navigation.navigate('BreedingOptionsView', { palData: item });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Perform your data refresh logic here
    loadData(); // Reload the data
  }, []);

  // Conditional rendering based on isLoadingBreedings
  if (isLoadingBreedings) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <TopBar title="My Pals" navigation={navigation} theme={currentTheme} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {renderPotentialParents()}
          </ScrollView>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  palName: {
    fontSize: 16,
    marginLeft: 20,
  },
});

export default MyPossibleBreedingsView;