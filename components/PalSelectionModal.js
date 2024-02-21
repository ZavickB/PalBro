import React, { useContext } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from './contexts/ThemeContext'; // Import the useTheme hook
import TypeBadge from './TypeBadge';
import { scale } from 'react-native-size-matters';

const screenHeight = Dimensions.get('window').height;

const MemoizedPalsList = React.memo(({ data, handlePalSelection }) => {
  // Assuming your theme context provides a method to access the current theme
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    pickerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scale(10),
      paddingVertical: scale(10),
      backgroundColor: currentTheme.backgroundColor, // Example background color
    },
    pickerItemImage: {
      width: scale(35),
      height: scale(35),
      resizeMode: 'cover',
      marginRight: scale(8),
    },
    pickerItemText: {
      flex: 1, // Allow text to fill the available space but not overflow
      fontSize: scale(16),
      marginRight: scale(10), // Add some margin to the right if needed
      // Handling text overflow
      color: currentTheme.textColor, 
      flexDirection: 'row',
      flexWrap: 'wrap', //// Dynamic text color based on theme
    },
    typesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Allow badges to wrap to next line if needed
      justifyContent: 'flex-end', // Align badges to the right
      marginLeft: scale(15), // Ensure there's space between text and badges
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

  // Sort PalsProfilesStatsAndBreedings by name in ascending order (A to Z)
  const sortedPalsProfiles = React.useMemo(() => {
    return [...PalsProfilesStatsAndBreedings].sort((a, b) => a.name.localeCompare(b.name));
  }, [PalsProfilesStatsAndBreedings]); // Depend on PalsProfilesStatsAndBreedings so it recalculates only if it changes

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
      backgroundColor: currentTheme.backgroundColor, // Dynamic background color based on theme
      padding: scale(20),
      borderRadius: scale(10),
      width: '80%',
      maxHeight: screenHeight / 2, // Limit height for scrollability
    },
    modalTitle: {
      fontSize: scale(18),
      fontWeight: 'bold',
      marginBottom: scale(10),
      color: currentTheme.textColor, // Dynamic text color based on theme
    },
    closeButton: {
      backgroundColor: currentTheme.primaryColor, // Dynamic button color based on theme
      borderRadius: scale(5),
      padding: scale(10),
      alignItems: 'center',
      marginTop: scale(10),
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
          {/* Pass the sorted data to MemoizedPalsList */}
          <MemoizedPalsList data={sortedPalsProfiles} handlePalSelection={handlePalSelection} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PalSelectionModal;