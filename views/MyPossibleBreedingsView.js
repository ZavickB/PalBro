import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext';

import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import { ScrollView } from 'react-native-gesture-handler';

const MyPossibleBreedingsView = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const [capturedPals, setCapturedPals] = useState([]);
  const [isLoadingBreedings, setIsLoadingBreedings] = useState(true); // State to track loading of breedings

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

  useEffect(() => {
    console.log('Fetching data from AsyncStorage...');
    getData(STORAGE_KEY)
      .then((storedCapturedPals) => {
        console.log('Stored Captured Pals:', storedCapturedPals);
        if (storedCapturedPals !== null) {
          // Data found, set it in the state
          console.log('Setting Captured Pals in state...');
          setCapturedPals(storedCapturedPals);
        }
        setIsLoadingBreedings(false); // Mark loading as complete
        console.log('Loading complete.');
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setIsLoadingBreedings(false); // Mark loading as complete even in case of error
        console.log('Loading complete with error.');
      });
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

  const calculatePossibleBreedings = () => {
    const breedingsMap = new Map(); // Use a Map to group results by breed

    // Iterate through all pals in PalsProfilesStatsAndBreedings
    for (const pal of PalsProfilesStatsAndBreedings) {
      const { breedings } = pal;
      // Check if the pal has breedings
      if (breedings) {
        for (const key in breedings) {
          // Check if both parents exist in capturedPalsData
          const parent1 = capturedPalsData.find((pal1) => pal1.name === key);
          const parent2 = capturedPalsData.find((pal2) => pal2.name === breedings[key]);
          if (parent1 && parent2) {
            // Calculate the breed produced by this couple
            const breed = `${pal.name}`;
            // Check if the breed already exists in the map
            if (!breedingsMap.has(breed)) {
              // If it doesn't exist, create a new group with this breed
              breedingsMap.set(breed, { breed, couples: [] });
            }
            // Add the couple to the breed
            breedingsMap.get(breed).couples.push([parent1.name, parent2.name]);
          }
        }
      }
    }

    // Convert the map values to an array of groups
    const palListWithParentsGroups = Array.from(breedingsMap.values());

    return palListWithParentsGroups; // Return the array of groups
  };

  // Conditional rendering based on isLoadingBreedings
  if (isLoadingBreedings) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

    const calculatePotentialParentsForSelectedPal = (selectedPal) => {
    return calculatePotentialParents(selectedPal, capturedPalsData);
  };

  const renderPotentialParents = () => {
    return PalsProfilesStatsAndBreedings.map((selectedPal, index) => {
      const potentialParents = calculatePotentialParentsForSelectedPal(selectedPal);

      // Check if the selectedPal has potential parents
      if (potentialParents.length > 0) {
        return (
          <View key={index} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>Potential Parents for {selectedPal.name}</Text>
            {potentialParents.map((couple, i) => (
              <Text key={i} style={styles.palName}>
                - {couple[0].name} x {couple[1].name}
              </Text>
            ))}
          </View>
        );
      }

      // If there are no potential parents, don't render this pal
      return null;
    });
  };

  // Conditional rendering based on isLoadingBreedings
  if (isLoadingBreedings) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <TopBar title="List of possible breedings" navigation={navigation} theme={currentTheme} />
      <ScrollView style={styles.listContainer}>
        {renderPotentialParents()}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
