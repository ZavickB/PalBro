import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import SuitabilityBlock from '../components/SuitabilityBlock'; // Adjust the import path as needed
import PalBreedingInfos from '../components/PalBreedingInfos'; // Adjust the import path as needed
import TypeBadge from '../components/TypeBadge'; // Adjust the import path as needed
import TopBar from '../components/TopBar'; // Adjust the import path as needed
const DetailedView = ({ route, navigation }) => {
  const { palData } = route.params;

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
            {/* Assuming abilities is a string or can be mapped similarly to types */}
            <SuitabilityBlock suitabilities={palData.suitability} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Breeding Information:</Text>
            <PalBreedingInfos palData={palData} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
