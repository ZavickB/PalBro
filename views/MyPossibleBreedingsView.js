import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, RefreshControl, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/contexts/ThemeContext';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext'; // Import the context hook

import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import GradientBackground from '../components/GradientBackground';
import SearchableList from '../components/SearchableList';
import PalTile from '../components/PalTile';

const MyPossibleBreedingsView = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const { capturedPals, toggleCapture, refreshKey } = useCapturedPals(); // Use the context hook to access state and functions
  const [isLoadingBreedings, setIsLoadingBreedings] = useState(true); // State to track loading of breedings
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  const capturedPalsData = PalsProfilesStatsAndBreedings.filter((pal) =>
    capturedPals.includes(pal.key)
  );

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
        searchBarPlaceholder={'Browse potential breedings...'}
        data={dataForSearchableList}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
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
          </View>
        )}
        numColumns={3}
        emptyStateText="No possible breeding found."
      />
    );
  };

  const handleTilePress = (item) => {
    navigation.navigate('BreedingOptionsView', { palData: item });
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <TopBar title="Breeding Catalog" navigation={navigation} theme={currentTheme} />
            {renderPotentialParents()}
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

export default MyPossibleBreedingsView;