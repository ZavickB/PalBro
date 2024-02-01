import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import SuitabilityBlock from '../components/SuitabilityBlock';
import PalBreedingInfosBlock from '../components/PalBreedingInfosBlock';
import TypeBadge from '../components/TypeBadge';
import TopBar from '../components/TopBar';
import PalStatsBlock from '../components/PalStatsBlock';
import { statsOrder } from '../components/configs/PalsStatsOrderConfig';
import { useTheme } from '../components/ThemeContext';
import PalSkillsBlock from '../components/PalSkillsBlock';
import PalDropsBlock from '../components/PalDropsBlock';

const PalDetailedView = ({ route, navigation }) => {
  const { palData } = route.params;
  const { currentTheme } = useTheme();

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return <Image source={palData.image} style={styles.image} />;
      case 'description':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description:</Text>
            <Text style={styles.description}>{palData.description}</Text>
          </View>
        );
      case 'suitabilities':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Suitabilities:</Text>
            <SuitabilityBlock suitabilities={palData.suitability} />
          </View>
        );
      case 'stats':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistics:</Text>
            <PalStatsBlock stats={palData.stats} statsOrder={statsOrder} />
          </View>
        );
      case 'skills':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills:</Text>
            <PalSkillsBlock skills={palData.skills} />
          </View>
        );
      case 'drops':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Drops:</Text>
            <PalDropsBlock drops={palData.drops} />
          </View>
        );
      case 'breeding':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Breeding Information:</Text>
            <PalBreedingInfosBlock palData={palData} navigation={navigation} />
          </View>
        );
      default:
        return null;
    }
  };

  const sections = [
    { type: 'header' },
    { type: 'description' },
    { type: 'suitabilities' },
    { type: 'stats' },
    { type: 'skills' },
    { type: 'drops' },
    { type: 'breeding' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
    },
    image: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
    },
    section: {
      marginBottom: 16,
      padding: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: currentTheme.textColor,
    },
    description: {
      fontSize: 16,
      textAlign: 'justify',
      color: currentTheme.textColor,
    },
    // ... add other styles as needed
  });

  return (
    <View style={styles.container}>
      <TopBar title="" navigation={navigation} />
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.type + index}
      />
    </View>
  );
};

export default PalDetailedView;
