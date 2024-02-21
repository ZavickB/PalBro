import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { scale, verticalScale } from 'react-native-size-matters';


const PalDropsModal = ({ visible, onClose, item, pals, loading }) => {
  const [displayedPals, setDisplayedPals] = useState([]);
  const { currentTheme } = useTheme();
  const screenHeight = Dimensions.get('window').height;

  // Utility function to format drop names for display and matching
  const formatName = (dropName) => {
    if (!dropName) return ''; // Return empty string if dropName is null or undefined
    return dropName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  

  useEffect(() => {
    if (item && !loading) {
      // Reset displayedPals when a new item is selected
      setDisplayedPals(pals);
    }
  }, [item, pals, loading]);

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
      backgroundColor: currentTheme.backgroundColor,
      padding: scale(20),
      borderRadius: scale(10),
      width: '80%',
      maxHeight: screenHeight * 0.5,
    },
    modalTitle: {
      fontSize: scale(18),
      fontWeight: 'bold',
      marginBottom: scale(10),
      color: currentTheme.textColor,
    },
    listContainer: {
      maxHeight: screenHeight * 0.5,
      marginBottom: scale(10),
    },
    modalText: {
      fontSize: scale(16),
      textAlign: 'justify',
      color: currentTheme.textColor, // Set text color based on the theme
    },
    closeButton: {
      backgroundColor: currentTheme.primaryColor,
      borderRadius: scale(5),
      padding: scale(10),
      alignItems: 'center',
      marginTop: scale(10),
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    palListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scale(10),
      paddingVertical: scale(10),
    },
    palImage: {
      width: scale(35),
      height: scale(35),
      marginRight: scale(8),
    },

  });
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Pals who can drop {formatName(item)} :</Text>
          {loading ? (
            <ActivityIndicator size="large" color={currentTheme.textColor} />
          ) : (
            <ScrollView persistentScrollbar={true}  style={styles.listContainer}>
              {pals.map((pal, index) => (
                <View style={styles.palListItem} key={index}>
                  <Image source={ pal.image } style={styles.palImage} />
                  <Text style={styles.modalText}>#{pal.key} {pal.name}</Text>
                </View>
                ))
              }
            </ScrollView>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PalDropsModal;