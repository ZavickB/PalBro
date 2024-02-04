import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Modal, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useTheme } from './contexts/ThemeContext';


const PalDropsModal = ({ visible, onClose, item, pals, loading }) => {
  const [displayedPals, setDisplayedPals] = useState([]);
  const { currentTheme } = useTheme();
  const screenHeight = Dimensions.get('window').height;

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
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: currentTheme.textColor,
    },
    listContainer: {
      maxHeight: screenHeight / 2,
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      textAlign: 'justify',
      color: currentTheme.textColor, // Set text color based on the theme
    },
    closeButton: {
      backgroundColor: currentTheme.primaryColor,
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    palListItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    palImage: {
      width: 30,
      height: 30,
      marginRight: 8,
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
      <Text style={styles.modalTitle}>Pals who can drop {item}:</Text>
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