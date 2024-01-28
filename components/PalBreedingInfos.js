import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import PalsProfilesAndBreedings from '../assets/data/PalsProfilesAndBreedings'; // Import the pal data

// Function to find the baby based on the selected pal's breedings
const findBaby = (palData, selectedPalName) => {
  const breedings = palData.breedings;
  if (breedings && selectedPalName in breedings) {
    const babyName = breedings[selectedPalName];
    return PalsProfilesAndBreedings.find((pal) => pal.name === babyName);
  }
  return null; // Aucun bébé trouvé
};

// Define the new component
const PalBreedingInfos = ({ palData }) => {
  const [selectedPalInfo, setSelectedPalInfo] = useState(palData); // Use palData as the initial selection
  const [babyInfo, setBabyInfo] = useState(null); // Initial state for babyInfo
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to handle pal selection
  const handlePalSelection = (pal) => {
    setSelectedPalInfo(pal);
    const babyInfo = findBaby(palData, pal.name);
    setBabyInfo(babyInfo);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.palInfo}>
          <Image source={selectedPalInfo.image} style={styles.palImage} />
          <Text style={styles.palName}>{selectedPalInfo.name}</Text>
          <Text style={styles.palNumber}>Paldex Number: {selectedPalInfo.key}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={PalsProfilesAndBreedings}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePalSelection(item)}>
                <View style={styles.pickerItem}>
                  <Image source={item.image} style={styles.pickerItemImage} />
                  <Text style={styles.pickerItemText}>{item.name}</Text>
                  <Text style={styles.pickerItemNumber}>Paldex Number: {item.key}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      {babyInfo && (
        <View style={styles.breededBabyInfo}>
          <Text style={styles.breededBabyLabel}>Baby:</Text>
          <Image source={babyInfo.image} style={styles.breededBabyImage} />
          <Text style={styles.breededBabyName}>{babyInfo.name}</Text>
          <Text style={styles.breededBabyNumber}>Paldex Number: {babyInfo.key}</Text>
        </View>
      )}
    </View>
  );
};

// Define styles
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
  },
  palNumber: {
    fontSize: 16,
    marginTop: 5,
  },
  breededBabyInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  breededBabyLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breededBabyImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  breededBabyName: {
    fontSize: 16,
    marginTop: 5,
  },
  breededBabyNumber: {
    fontSize: 14,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pickerItemImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    marginRight: 10,
  },
  pickerItemText: {
    fontSize: 16,
  },
  pickerItemNumber: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default PalBreedingInfos;
