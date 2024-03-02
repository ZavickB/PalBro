import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './contexts/ThemeContext'; // Assuming this is your theme context
import { responsiveScale } from '../utils/responsiveScale';

const CustomAlertModal = ({ visible, title, message, onConfirm, onCancel }) => {
  const { currentTheme } = useTheme();

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: currentTheme.backgroundColor }]}>
          <Text style={[styles.modalTitle, { color: currentTheme.textColor }]}>{title}</Text>
          <Text style={[styles.modalMessage, { color: currentTheme.textColor }]}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={[styles.button, { borderColor: currentTheme.secondaryColor }]}>
              <Text style={[styles.buttonText, { color: currentTheme.secondaryColor }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={[styles.button, { backgroundColor: currentTheme.primaryColor,  borderColor: currentTheme.secondaryColor }]}>
              <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dim the background
  },
  modalView: {
    margin: responsiveScale(20),
    padding: responsiveScale(35),
    borderRadius: responsiveScale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: responsiveScale(3.84),
    elevation: responsiveScale(5),
  },
  modalTitle: {
    fontSize: responsiveScale(18),
    fontWeight: 'bold',
    marginBottom: responsiveScale(15, 'height'),
  },
  modalMessage: {
    fontSize: responsiveScale(16),
    marginBottom: responsiveScale(20, 'height'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: responsiveScale(20),
    padding: responsiveScale(10),
    elevation: responsiveScale(2),
    minWidth: responsiveScale(100, 'width'),
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: responsiveScale(14),
  },
});

export default CustomAlertModal;
