import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import TypeBadge from '../components/TypeBadge';
import TopBar from '../components/TopBar';
import { useTheme } from '../components/ThemeContext'; // Import the useTheme hook
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';

const BreedingOptionsView = ({ route, navigation }) => {
  const { palData } = route.params;
  const { currentTheme } = useTheme(); // Get the current theme from the context

  // Function to calculate potential parent couples
  const calculatePotentialParents = (selectedPal) => {
    const potentialParents = [];

    // Iterate through all pals
    for (const pal of PalsProfilesStatsAndBreedings) {
      const { breedings } = pal;

      // Check if the pal has breedings
      if (breedings) {
        for (const key in breedings) {
          if (breedings[key] === selectedPal.name) {
            // Found a potential parent couple
            const parentCouple = [pal, PalsProfilesStatsAndBreedings.find((p) => p.name === key)];
            console.log('Found a potential parent couple:', pal.name, 'and', key);
            //check if the couple is already in the array
            let alreadyInArray = false;
            for (const couple of potentialParents) {
                if (couple[0].name === parentCouple[0].name && couple[1].name === parentCouple[1].name || couple[0].name === parentCouple[1].name && couple[1].name === parentCouple[0].name) {
                    alreadyInArray = true;
                }
            }
            if (!alreadyInArray){
                potentialParents.push(parentCouple);
            }
          }
        }
      }
    }
    return potentialParents;
  };

  const potentialParentsData = calculatePotentialParents(palData);
  console.log(potentialParentsData);

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

          {/* Display potential parent couples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Potential Parent Couples:</Text>
            {potentialParentsData.map((couple, index) => (
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
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BreedingOptionsView;
