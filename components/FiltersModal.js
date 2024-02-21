import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveScale } from '../utils/responsiveScale';

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
      paddingHorizontal: responsiveScale(20, "width"),
      paddingTop: responsiveScale(20, "height"),
      width: responsiveScale(340, "width"),
      borderRadius: responsiveScale(10),
      maxHeight: responsiveScale(700, "height"), // Limit height for scrollability
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: responsiveScale(20, "height"),
    },
    modalTitle: {
      fontSize: responsiveScale(20),
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
                <Icon name="close" size={responsiveScale(24)} color={currentTheme.textColor} />
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
