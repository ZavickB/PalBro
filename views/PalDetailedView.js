import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import SuitabilityBlock from '../components/SuitabilityBlock';
import PalBreedingInfosBlock from '../components/PalBreedingInfosBlock';
import PalSpecialCapacityBlock from '../components/PalSpecialCapacityBlock';
import TypeBadge from '../components/TypeBadge';
import TopBar from '../components/TopBar';
import PalStatsBlock from '../components/PalStatsBlock';
import { statsOrder } from '../components/configs/PalsStatsOrderConfig';
import { useTheme } from '../components/contexts/ThemeContext';
import PalSkillsBlock from '../components/PalSkillsBlock';
import PalDropsBlock from '../components/PalDropsBlock';
import GradientBackground from '../components/GradientBackground';
import PalCounter from '../components/PalCounter';
import PalHeatMap from '../components/PalHeatMap';
import { responsiveScale } from '../utils/responsiveScale';

const PalDetailedView = ({ route, navigation }) => {
  const { palData } = route.params;
  const { currentTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  const palIsNightOnly = palData.maps.night && palData.maps.night.length > 0 && palData.maps.day.length === 0;

  useEffect(() => {
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
            <Image source={ palData.image } style={styles.image} />
            <View style={styles.overlayText}>
              <Text style={styles.sectionPalTitle}>#{palData.key} {palData.name}</Text>
              <TypeBadge types={[palData.types]} />
            </View>
          </View>
        );
      case 'progress':
        return (
          <View style={styles.section}>
            <PalCounter palKey={palData.key} />
          </View>
        );
      case 'aura':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aura:</Text>
            <PalSpecialCapacityBlock aura={palData.aura} />
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
      case 'map':
        return (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Habitat:</Text>
              <PalHeatMap palData={palData} />
            </View>
        );
      case 'breedings':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Breeding:</Text>
            <PalBreedingInfosBlock palData={palData} navigation={navigation}/>
          </View>
        );
      default:
        return null;
    }
  };

  const sections = [
    { type: 'header' },
    { type: 'progress' },
    { type: 'aura' },
    { type: 'description' },
    { type: 'suitabilities' },
    { type: 'skills' },
    { type: 'drops' },
    { type: 'map' },
    { type: 'breedings' },
  ];


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageContainer: {
      width: '100%',
      height: responsiveScale(300, "height"),
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    section: {
      paddingHorizontal: responsiveScale(16, "width"),
      paddingVertical: responsiveScale(12, "height"),
    },
    overlayText: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: responsiveScale(16, "width"),
      paddingBottom: responsiveScale(12, "height"),
      paddingTop: responsiveScale(24, "height"),
    },
    sectionPalTitle: {
      fontSize: responsiveScale(24),
      fontWeight: 'bold',
      color: currentTheme.palDetailsName,
      marginBottom: responsiveScale(4, "height"),
    },
    sectionTitle: {
      fontSize: responsiveScale(18),
      fontWeight: 'bold',
      marginBottom: responsiveScale(8, "height"),
      color: currentTheme.textColor,
    },
    description: {
      fontSize: responsiveScale(16),
      textAlign: 'justify',
      color: currentTheme.textColor,
    },
    loadingIndicator: {
      position: 'absolute',
      alignSelf: 'center',
      top: '50%',
      color: currentTheme.primaryColor,
    },
    specialCapacitySection: {
      paddingHorizontal: responsiveScale(16, "width"),
      paddingVertical: responsiveScale(12, "height"),
      marginBottom: responsiveScale(12, "height"),
      backgroundColor: "transparent", // Example background color
      borderRadius: responsiveScale(8), // Rounded corners
      borderWidth: responsiveScale(1),
      borderColor: currentTheme.borderColor, // Light border for definition
    },
    specialCapacityTitle: {
      fontSize: responsiveScale(18),
      fontWeight: 'bold',
      marginBottom: responsiveScale(8, "height"),
      color: '#333', // Example title color
    },
    specialCapacityContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    specialCapacityIcon: {
      width: responsiveScale(30, "width"),
      height: responsiveScale(30, "height"),
      marginRight: responsiveScale(10, "width"),
    },
    specialCapacityName: {
      fontSize: responsiveScale(16),
      fontWeight: 'bold',
      color: '#333',
    },
    specialCapacityDescription: {
      fontSize: responsiveScale(14),
      color: '#666', // Lighter text for the description
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