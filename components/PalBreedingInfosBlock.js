import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings'; // Import the pal data
import TypeBadge from './TypeBadge'; // Import the TypeBadge component
import { useTheme } from './contexts/ThemeContext'; // Import the useTheme hook
import PalSelectionModal from './PalSelectionModal';

// Function to find the baby based on the selected pal's breedings
const findBaby = (palData, selectedPalName) => {
  const breedings = palData.breedings;
  if (breedings && selectedPalName in breedings) {
    const babyName = breedings[selectedPalName];
    return PalsProfilesStatsAndBreedings.find((pal) => pal.name === babyName);
  }
  return null; // Aucun bébé trouvé
};

// Define the new component
const PalBreedingInfosBlock = ({ palData, navigation }) => {
  const { currentTheme } = useTheme();

  const [selectedPalInfo, setSelectedPalInfo] = useState(palData); // Initialize with palData
  const [babyInfo, setBabyInfo] = useState(null); // Initial state for babyInfo
  const [isModalVisible, setModalVisible] = useState(false);

  // Use useEffect to update selectedPalInfo when palData changes
  useEffect(() => {
    setSelectedPalInfo(palData);
    setBabyInfo(palData);
  }, [palData]);

  // Function to handle pal selection
  const handlePalSelection = (pal) => {
    setSelectedPalInfo(pal);
    const babyInfo = findBaby(palData, pal.name);
    setBabyInfo(babyInfo);
    setModalVisible(false);
  };

  const handleBabyPress = (item) => {
    navigation.navigate('Details', { palData: item });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    palInfo: {
      alignItems: 'center',
    },
    palImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
    },
    palName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      color: currentTheme.textColor,
    },
    palNumber: {
      fontSize: 16,
      marginTop: 5,
      color: currentTheme.textColor,
    },
    breededBabyInfo: {
      alignItems: 'center',
      marginTop: 20,
      color: currentTheme.textColor,
    },
    Parent2Label: {
      fontSize: 18,
      fontWeight: 'bold',
      color: currentTheme.textColor,
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
    
  });

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.palInfo}>
          <Text style={styles.Parent2Label}>Parent 2:</Text>
          <Image source={selectedPalInfo.image} style={styles.palImage} />
          <Text style={styles.palName}>#{selectedPalInfo.key} {selectedPalInfo.name}</Text>
          <View style={styles.typesContainer}>
            <TypeBadge types={selectedPalInfo.types} />
          </View>
        </View>
      </TouchableOpacity>

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
            <View style={styles.typesContainer}>
              <TypeBadge types={babyInfo.types} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};



export default PalBreedingInfosBlock;
