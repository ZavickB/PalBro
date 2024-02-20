import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import TypeBadge from './TypeBadge'; // Import the TypeBadge component
import { useTheme } from './contexts/ThemeContext'; // Import the useTheme hook
import PalSelectionModal from './PalSelectionModal';
import { findSpecificBreeding } from '../utils/BreedingsCalculator'; // Import the utility functions
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings'; // Import the PalsProfilesStatsAndBreedings data
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define the new component
const PalBreedingInfosBlock = ({ palData, navigation }) => {
  const { currentTheme } = useTheme();

  const [selectedPalInfo, setSelectedPalInfo] = useState(palData); // Initialize with palData
  const [babyInfo, setBabyInfo] = useState(palData); // Initial state for babyInfo
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to handle pal selection
  const handlePalSelection = (parent2) => {
    setSelectedPalInfo(parent2);
    const possibleBreedings = findSpecificBreeding(palData, parent2);
    if (possibleBreedings.length > 0) {
      const baby = possibleBreedings[0]; // For simplicity, assuming only one baby is possible
      setBabyInfo(baby);
    }
    setModalVisible(false);
  };

  const handleBabyPress = (item) => {
    navigation.push('PalsDetails', { palData: item });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    parentsRow: {
      flexDirection: 'row',
      alignItems: 'top',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
    },
    palInfo: {
      alignItems: 'center',
      marginHorizontal: 10,
      padding: 5,
      borderColor: currentTheme.primaryColor, // Highlight with theme color
      borderWidth: selectedPalInfo === palData ? 0 : 2, // Highlight if selection is active
      borderRadius: 5,
    },
    palImage: {
      width: 80,
      height: 80,
      resizeMode: 'cover',
    },
    plusSign: {
      fontSize: 24,
      position: 'relative',
      top: 40,
      color: currentTheme.textColor,
      fontWeight: 'bold',
    },
    palName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
      color: currentTheme.textColor,
    },
    palNumber: {
      fontSize: 14,
      color: currentTheme.textColor,
    },
    selectIcon: {
      marginTop: 5,
    },
    breededBabyInfo: {
      alignItems: 'center',
      marginTop: 20,
    },
    breededBabyLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: currentTheme.textColor,
    },
    breededBabyImage: {
      width: 80,
      height: 80,
      resizeMode: 'cover',
    },
    breededBabyNumber: {
      fontSize: 14,
      marginTop: 5,
      color: currentTheme.textColor,
    },
    selectPalText: {
      fontSize: 14,
      color: currentTheme.primaryColor, // Use primaryColor for emphasis
      marginTop: 5,
      textAlign: 'center',
    },

  });
  
  return (
    <View style={styles.container}>
      <View style={styles.parentsRow}>
        <View style={styles.palInfo}>
          <Image source={palData.image} style={styles.palImage} />
          <Text style={styles.palName}>#{palData.key} {palData.name}</Text>
          <TypeBadge types={[palData.types]} />
        </View>
        <Text style={styles.plusSign}>+</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.palInfo, { borderStyle: selectedPalInfo === palData ? 'dashed' : 'solid' }]}>
          <Image source={selectedPalInfo.image} style={styles.palImage} />
          <Text style={styles.palName}>#{selectedPalInfo.key} {selectedPalInfo.name}</Text>
          <TypeBadge types={[selectedPalInfo.types]} />
          {selectedPalInfo === palData && <Ionicons name="swap-horizontal-outline" size={24} color={currentTheme.primaryColor} style={styles.selectIcon} />}
        </TouchableOpacity>
      </View>

      <PalSelectionModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        PalsProfilesStatsAndBreedings={PalsProfilesStatsAndBreedings}
        handlePalSelection={handlePalSelection}
      />

      {babyInfo && (
        <TouchableOpacity onPress={() => handleBabyPress(babyInfo)}>
          <View style={styles.breededBabyInfo}>
            <Text style={styles.breededBabyLabel}>Baby:</Text>
            <Image source={babyInfo.image} style={styles.breededBabyImage} />
            <Text style={styles.breededBabyLabel}>#{babyInfo.key} {babyInfo.name}</Text>
            <TypeBadge types={[babyInfo.types]} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PalBreedingInfosBlock;