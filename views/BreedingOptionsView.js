import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import TypeBadge from '../components/TypeBadge';
import TopBar from '../components/TopBar';
import { useTheme } from '../components/contexts/ThemeContext';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SwitchButton from '../components/SwitchButton'; // Import the SwitchButton component
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

const BreedingOptionsView = ({ route, navigation }) => {
  const { palData } = route.params;
  const { currentTheme } = useTheme();
  const [capturedPals, setCapturedPals] = useState([]);
  const [isUsingCapturedPals, setIsUsingCapturedPals] = useState(false); // State to toggle between using captured pals or default list
  const [potentialParentsData, setPotentialParentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  const STORAGE_KEY = 'capturedPals';

  // Define capturedPalsData outside of useEffect
  const capturedPalsData = PalsProfilesStatsAndBreedings.filter((pal) =>
    capturedPals.includes(pal.key)
  );

// Function to calculate potential parent couples
const calculatePotentialParents = (selectedPal, useCapturedPals) => {
  const palsList = useCapturedPals ? capturedPalsData : PalsProfilesStatsAndBreedings;
  const potentialParents = [];

  // Add logging to check the value of selectedPal

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
    setIsUsingCapturedPals(false);
  }, [palData]);
  
  useEffect(() => {
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
  }, []); // Run this effect only once on component mount

  // Calculate potential parents data when the capturedPals or isUsingCapturedPals state changes
  useEffect(() => {
    const updatedPotentialParentsData = calculatePotentialParents(
      palData,
      isUsingCapturedPals
    );
    setPotentialParentsData(updatedPotentialParentsData);
  }, [palData, isUsingCapturedPals]);

  // Toggle between using captured pals or default list
  const toggleList = () => {
    setIsUsingCapturedPals((prev) => !prev);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor, // Use theme-aware background color
    },
    image: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
    },
    infoContainer: {
      padding: 16,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 8,
      color: currentTheme.textColor, // Set text color based on the theme
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: currentTheme.textColor, // Set text color based on the theme
    },
    description: {
      fontSize: 16,
      textAlign: 'justify',
      color: currentTheme.textColor, // Set text color based on the theme
    },
    abilities: {
      fontSize: 16,
      marginBottom: 8,
      color: currentTheme.textColor, // Set text color based on the theme
    },
    breedPicker: {
      // Style for the picker
    },
    palListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    palImage: {
      width: 24, // Adjust the width as needed
      height: 24, // Adjust the height as needed
      marginRight: 8,
    },
  });

  return (
    <View style={styles.container}>
      <TopBar title="Breeding Options" navigation={navigation} />
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={palData.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>#{palData.key} {palData.name}</Text>
          <View style={styles.typesContainer}>
            <TypeBadge types={palData.types} />
          </View>

          <SwitchButton onPress={toggleList} isUsingCapturedPals={isUsingCapturedPals} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Potential Parent Couples:</Text>
            {potentialParentsData.length > 0 ? (
              potentialParentsData.map((couple, index) => (
                <View key={index} style={styles.palListItem}>
                  {couple.map((pal, palIndex) => (
                    <React.Fragment key={palIndex}>
                      {pal.image ? (
                        <Image source={pal.image} style={styles.palImage} />
                      ) : (
                        console.log('No image available for', pal.name)
                      )}
                      <Text style={styles.description}>{pal.name}</Text>
                      {palIndex === 0 && <Text style={styles.description}> + </Text>}
                    </React.Fragment>
                  ))}
                </View>
              ))
            ) : (
              <Text style={styles.description}>Not available</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BreedingOptionsView;