import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import SuitabilityBlock from '../components/SuitabilityBlock';
import PalBreedingInfosBlock from '../components/PalBreedingInfosBlock';
import TypeBadge from '../components/TypeBadge';
import TopBar from '../components/TopBar';
import PalStatsBlock from '../components/PalStatsBlock';
import { statsOrder } from '../components/configs/PalsStatsOrderConfig';
import { useTheme } from '../components/ThemeContext'; // Import the useTheme hook
import PalSkillsBlock from '../components/PalSkillsBlock';

const DetailedView = ({ route, navigation }) => {
  const { palData } = route.params;
  const { currentTheme } = useTheme(); // Get the current theme from the context

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
  });

  return (
    <View style={styles.container}>
      <TopBar title="" navigation={navigation} />
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={palData.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>#{palData.key} {palData.name}</Text>
          <View style={styles.typesContainer}>
            <TypeBadge types={palData.types} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description:</Text>
            <Text style={styles.description}>{palData.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suitabilities:</Text>
            <SuitabilityBlock suitabilities={palData.suitability} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Capacity: {palData.specialCapacity.name} </Text>
            <Text style={styles.description}>{palData.specialCapacity.description}</Text>
          </View>
          <View style={styles.section}>
            <PalStatsBlock stats={palData.stats} statsOrder={statsOrder} />
          </View>
          <View style={styles.section}>
            <PalSkillsBlock skills={palData.skills} />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Breeding Information:</Text>
            <PalBreedingInfosBlock palData={palData} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailedView;
