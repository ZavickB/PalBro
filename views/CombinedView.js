import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext';
import TopBar from '../components/TopBar';
import GradientBackground from '../components/GradientBackground';
import PalTile from '../components/PalTile';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import SwitchSelector from "react-native-switch-selector";


const CombinedView = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const [isCapturedPals, setIsCapturedPals] = useState(true);
  const [capturedPals, setCapturedPals] = useState([]);
  const [isLoadingBreedings, setIsLoadingBreedings] = useState(false);
  const [potentialBreedings, setPotentialBreedings] = useState([]);

  const STORAGE_KEY = 'capturedPals';

  const capturedPalsData = PalsProfilesStatsAndBreedings.filter((pal) =>
    capturedPals.includes(pal.key)
  );


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoadingBreedings(true);
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        const storedCapturedPals = JSON.parse(value);
        setCapturedPals(storedCapturedPals);
        calculatePossibleBreedings(storedCapturedPals);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
    setIsLoadingBreedings(false);
  };

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
              tileWidth={Dimensions.get('window').width * 0.3 - 5}
              tileHeight={Dimensions.get('window').height * 0.25 - 5}
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

  // Conditional rendering based on isLoadingBreedings
  if (isLoadingBreedings) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Function to handle pal tile press
  const handleTilePress = (item) => {
    navigation.navigate('BreedingOptionsView', { palData: item });
  };

  // Function to toggle capture state of a pal
  const toggleCapture = async (palKey) => {
    let updatedCapturedPals;
    if (capturedPals.includes(palKey)) {
      updatedCapturedPals = capturedPals.filter((key) => key !== palKey);
    } else {
      updatedCapturedPals = [...capturedPals, palKey];
    }
    setCapturedPals(updatedCapturedPals);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCapturedPals));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };


 // Main render method
 return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.appContainer}>
        <TopBar title="Combined View" navigation={navigation} theme={currentTheme} />
        <SwitchSelector
            initial={0}
            onPress={setIsCapturedPals}
            textColor={currentTheme.textColor} //'#7a44cf'
            selectedColor={currentTheme.textColor}
            buttonColor={currentTheme.textColor}
            borderColor={currentTheme.textColor}
            hasPadding
            options={[
                { label: "My Pals only", value: {isCapturedPals} , imageIcon: '' }, //images.feminino = require('./path_to/assets/img/feminino.png')
                { label: "Use all Pals", value: null , imageIcon: '' } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
        />
          {isCapturedPals ? (
            // Potential parents section
            <ScrollView style={styles.scrollView}>
              {isLoadingBreedings ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                    renderPotentialParents()   
             )}
            </ScrollView>
          ) : (
            // Pal tiles section
            <SearchableList
              data={PalsProfilesStatsAndBreedings}
              renderItem={({ item }) => (
                <View style={styles.listContainer}>
                  <TouchableOpacity onPress={() => handleTilePress(item)}>
                    <PalTile
                      pal={item}
                      tileWidth={Dimensions.get('window').width * 0.3 - 5}
                      tileHeight={Dimensions.get('window').height * 0.25 - 5}
                      spacing={5}
                      onCapturePress={() => toggleCapture(item.key)}
                      isCaptured={capturedPals.includes(item.key)}
                    />
                  </TouchableOpacity>
                </View>
              )}
              numColumns={3}
            />
          )}
        </View>
      </View>
    </GradientBackground>
  );
};

// Adjusted styles to match MainView
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
  scrollView: {
    flexGrow: 1,
  },
  switchButton:{
    alignSelf: 'center',
    margin: 10,
  }
})

export default CombinedView;
