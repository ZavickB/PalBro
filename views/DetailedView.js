import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import SuitabilityBlock from '../components/SuitabilityBlock';
import PalBreedingInfosBlock from '../components/PalBreedingInfosBlock';
import TypeBadge from '../components/TypeBadge';
import TopBar from '../components/TopBar';
import PalStatsBlock from '../components/PalStatsBlock'; // Import the PalStatsBlock component
import { statsOrder } from '../components/configs/PalsStatsOrderConfig'; // Import statsOrder
import { useTheme } from '../components/ThemeContext'; // Import the useTheme hook

const DetailedView = ({ route, navigation }) => {
  const { palData } = route.params;
  const { currentTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <TopBar title="" navigation={navigation} />
      <ScrollView style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
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
            <Text style={styles.sectionTitle}>Breeding Information:</Text>
            <PalBreedingInfosBlock palData={palData} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
  },
  abilities: {
    fontSize: 16,
    marginBottom: 8,
  },
  breedPicker: {
    // Style for the picker
  },
});

export default DetailedView;
