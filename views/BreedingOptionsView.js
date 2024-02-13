import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TypeBadge from '../components/TypeBadge';
import TopBar from '../components/TopBar';
import { useTheme } from '../components/contexts/ThemeContext';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SwitchButton from '../components/SwitchButton';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext';
import GradientBackground from '../components/GradientBackground';
import { findPotentialParentsForPal } from '../utils/BreedingsCalculator';

const BreedingOptionsView = ({ route, navigation }) => {
  const { palData, palsUsed } = route.params;
  const { currentTheme } = useTheme();
  const { capturedPals } = useCapturedPals();
  const [isUsingCapturedPals, setIsUsingCapturedPals] = useState(palsUsed === "MyPals");
  const [potentialParentsData, setPotentialParentsData] = useState([]);

  useEffect(() => {
    const palList = isUsingCapturedPals ? PalsProfilesStatsAndBreedings.filter(pal => !!capturedPals[pal.key]) : PalsProfilesStatsAndBreedings;
    const updatedPotentialParentsData = findPotentialParentsForPal(palData.key, palList);
    setPotentialParentsData(updatedPotentialParentsData);
  }, [palData, isUsingCapturedPals, capturedPals]);


  const toggleList = () => setIsUsingCapturedPals(prev => !prev);

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
    overlayText: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 16,
      paddingBottom: 12,
      paddingTop: 24,
    },
    sectionPalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.palDetailsName,
      marginBottom: 4,
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
    parentPairContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      padding: 8,
      backgroundColor: currentTheme.palTileBackgroundColor,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
      width: Dimensions.get('window').width - 32, // Subtracting total horizontal padding/margin
      marginLeft: 16,
      marginRight: 16,
    },
    parentDetails: {
      flex: 1, // This ensures that the parent details take up equal space on both sides
      alignItems: 'center',
    },
    plusSign: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.textColor,
      paddingHorizontal: 10, // Add some padding to ensure there's space around the plus sign
    },
    parentImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    parentName: {
      marginTop: 4,
      fontWeight: 'bold',
      color: currentTheme.textColor,
    },
  });

  const renderParentPair = ({ item: parentsPair }) => {
    const [parent1, parent2] = parentsPair;

    if (!parent1 || !parent2) {
      console.error('Missing parent data');
      return null;
    }

    return (
      <View style={styles.parentPairContainer}>
        <View style={styles.parentDetails}>
          <Image source={parent1.image} style={styles.parentImage} />
          <Text style={styles.parentName}>#{parent1.key} {parent1.name}</Text>
        </View>
        <Text style={styles.plusSign}>+</Text>
        <View style={styles.parentDetails}>
          <Image source={parent2.image} style={styles.parentImage} />
          <Text style={styles.parentName}>#{parent2.key} {parent2.name}</Text>
        </View>
      </View>
    );
  };


  const renderHeader = () => (
    <>
      <TopBar title="" navigation={navigation}/>
      <View style={styles.imageContainer}>
        <Image source={palData.image} style={styles.image} />
        <View style={styles.overlayText}>
          <Text style={styles.sectionPalTitle}>#{palData.key} {palData.name}</Text>
          <TypeBadge types={[palData.types]} />
        </View>
      </View>
      <SwitchButton onPress={toggleList} isUsingCapturedPals={isUsingCapturedPals} />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Potential Parent Couples:</Text>
      </View>
    </>
  );

  return (
    <GradientBackground>
      {renderHeader()}
        <FlatList
          data={potentialParentsData}
          renderItem={renderParentPair}
          keyExtractor={(_, index) => `parentPair-${index}`}
          ListHeaderComponentStyle={{ alignItems: 'center' }}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={styles.description}>No parent pairs found.</Text>}
        />
    </GradientBackground>
  );
};

export default BreedingOptionsView;