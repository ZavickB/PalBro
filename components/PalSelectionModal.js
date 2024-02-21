import React, { useContext } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from './contexts/ThemeContext'; // Import the useTheme hook
import TypeBadge from './TypeBadge';
import { responsiveScale } from '../utils/responsiveScale';

const screenHeight = Dimensions.get('window').height;

const MemoizedPalsList = React.memo(({ data, handlePalSelection }) => {
  // Assuming your theme context provides a method to access the current theme
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    pickerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: responsiveScale(10, 'width'),
      paddingVertical: responsiveScale(10, 'height'),
      backgroundColor: currentTheme.backgroundColor, // Example background color
    },
    pickerItemImage: {
      width: responsiveScale(35),
      height: responsiveScale(35),
      resizeMode: 'cover',
      marginRight: responsiveScale(8, 'width'),
    },
    pickerItemText: {
      flex: 1, // Allow text to fill the available space but not overflow
      fontSize: responsiveScale(16),
      marginRight: responsiveScale(10, 'width'), // Add some margin to the right if needed
      // Handling text overflow
      color: currentTheme.textColor, 
      flexDirection: 'row',
      flexWrap: 'wrap', //// Dynamic text color based on theme
    },
    typesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Allow badges to wrap to next line if needed
      justifyContent: 'flex-end', // Align badges to the right
      marginLeft: responsiveScale(15, 'width'), // Ensure there's space between text and badges
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
      padding: responsiveScale(20),
      borderRadius: responsiveScale(10),
      width: responsiveScale(340, "width"),
      maxHeight: responsiveScale(440, "height"), // Limit height for scrollability
    },
    modalTitle: {
      fontSize: responsiveScale(18),
      fontWeight: 'bold',
      marginBottom: responsiveScale(10),
      color: currentTheme.textColor, // Dynamic text color based on theme
    },
    closeButton: {
      backgroundColor: currentTheme.primaryColor, // Dynamic button color based on theme
      borderRadius: responsiveScale(5),
      padding: responsiveScale(10),
      alignItems: 'center',
      marginTop: responsiveScale(10),
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