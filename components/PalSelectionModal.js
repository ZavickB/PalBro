import React, { useContext } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from './contexts/ThemeContext'; // Import the useTheme hook
import TypeBadge from './TypeBadge';

const screenHeight = Dimensions.get('window').height;

const MemoizedPalsList = React.memo(({ data, handlePalSelection }) => {
  // Assuming your theme context provides a method to access the current theme
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    pickerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: currentTheme.backgroundColor, // Example background color
    },
    pickerItemImage: {
      width: 35,
      height: 35,
      resizeMode: 'cover',
      marginRight: 8,
    },
    pickerItemText: {
      flex: 1, // Allow text to fill the available space but not overflow
      fontSize: 16,
      marginRight: 10, // Add some margin to the right if needed
      // Handling text overflow
      color: currentTheme.textColor, 
      flexDirection: 'row',
      flexWrap: 'wrap', //// Dynamic text color based on theme
    },
    typesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Allow badges to wrap to next line if needed
      justifyContent: 'flex-end', // Align badges to the right
      marginLeft: 15, // Ensure there's space between text and badges
      flex: 1, // Take up remaining space
    },
  });

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePalSelection(item)}>
          <View style={styles.pickerItem}>
            <Image source={item.image} style={styles.pickerItemImage} />
            <Text style={styles.pickerItemText}>{item.name}</Text>
            <View style={styles.typesContainer}>
              <TypeBadge types={[item.types]} />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
});

const PalSelectionModal = ({ isModalVisible, setModalVisible, PalsProfilesStatsAndBreedings, handlePalSelection }) => {
  const { currentTheme } = useTheme(); // Use theme context

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      backgroundColor: currentTheme.backgroundColor, // Dynamic background color based on theme
      padding: 20,
      borderRadius: 10,
      width: '80%',
      maxHeight: screenHeight / 2, // Limit height for scrollability
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: currentTheme.textColor, // Dynamic text color based on theme
    },
    closeButton: {
      backgroundColor: currentTheme.primaryColor, // Dynamic button color based on theme
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a pal</Text>
          <MemoizedPalsList data={PalsProfilesStatsAndBreedings} handlePalSelection={handlePalSelection} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PalSelectionModal;
