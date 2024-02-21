import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { scale, verticalScale } from 'react-native-size-matters';

const { height } = Dimensions.get('window'); // Get the screen height

const FiltersModal = ({ isVisible, onClose, children }) => {
  const { currentTheme } = useTheme();

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: currentTheme.modalContentBackground,
      padding: scale(20),
      width: '80%',
      borderRadius: scale(10),
      maxHeight: scale(height * 0.8), // Set max height to 80% of screen height
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: scale(20),
    },
    modalTitle: {
      fontSize: scale(20),
      fontWeight: 'bold',
      color: currentTheme.textColor,
    },
  });

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Options</Text>
              <TouchableOpacity onPress={onClose} >
                <Icon name="close" size={24} color={currentTheme.textColor} />
              </TouchableOpacity>
            </View>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FiltersModal;
