import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import SuitabilityBlock from '../components/SuitabilityBlock';
import PalBreedingInfosBlock from '../components/PalBreedingInfosBlock';
import TypeBadge from '../components/TypeBadge';
import TopBar from '../components/TopBar';
import PalStatsBlock from '../components/PalStatsBlock';
import { statsOrder } from '../components/configs/PalsStatsOrderConfig';
import { useTheme } from '../components/contexts/ThemeContext';
import PalSkillsBlock from '../components/PalSkillsBlock';
import PalDropsBlock from '../components/PalDropsBlock';
import GradientBackground from '../components/GradientBackground';
import PalHeatMap from '../components/PalHeatMap';
import ProgressBar from '../components/ProgressBar';

const PalDetailedView = ({ route, navigation }) => {
  const { palData } = route.params;
  const { currentTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View style={styles.imageContainer}>
            <Image source={palData.image} style={styles.image} />
            <View style={styles.overlayText}>
              <Text style={styles.sectionPalTitle}>#{palData.key} {palData.name}</Text>
              <TypeBadge types={palData.types} />
            </View>
          </View>
        );
      case 'progress':
        return (
          <View style={styles.section}>
            <ProgressBar progress={10} />
          </View>
        );
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
      case 'map':
        return (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Pal Location:</Text>
              <PalHeatMap palName={palData.name} loading={loading} />
            </View>
        );
      default:
        return null;
    }
  };

  const sections = [
    { type: 'header' },
    { type: 'progress' },
    { type: 'description' },
    { type: 'suitabilities' },
    { type: 'stats' },
    { type: 'skills' },
    { type: 'drops' },
    { type: 'breeding' },
    { type: 'map' }, 
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageContainer: {
      width: '100%',
      height: 300,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    section: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    overlayText: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 16,
      paddingBottom: 12,
      paddingTop: 24, // Adjust based on content
    },
    sectionPalTitle: {
      fontSize: 24, // Larger font size
      fontWeight: 'bold',
      color: currentTheme.palDetailsName,
      marginBottom: 4, // Adjust spacing
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
    loadingIndicator: {
      position: 'absolute',
      alignSelf: 'center',
      top: '50%',
      color: currentTheme.primaryColor,
    },
  });

  return (
    <GradientBackground>
      <View style={styles.container}>
        <TopBar title="" navigation={navigation} />
        <FlatList
          data={sections}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.type + index}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </GradientBackground>
  );
};

export default PalDetailedView;
