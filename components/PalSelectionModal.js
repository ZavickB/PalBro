import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TypeBadge from './TypeBadge'; // Import the TypeBadge component


const MemoizedPalsList = React.memo(({ data, handlePalSelection }) => {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePalSelection(item)}>
            <View style={styles.pickerItem}>
              <Image source={item.image} style={styles.pickerItemImage} />
              <Text style={styles.pickerItemText}>#{item.key} {item.name}</Text>
              <View style={styles.typesContainer}>
                <TypeBadge types={item.types} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  });

  
const PalSelectionModal = ({ isModalVisible, setModalVisible, PalsProfilesStatsAndBreedings, handlePalSelection }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Select a pal</Text>
        <MemoizedPalsList data={PalsProfilesStatsAndBreedings} handlePalSelection={handlePalSelection} />
      </View>
    </Modal>
  );
};

// Define styles for the modal here
const styles = StyleSheet.create({
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
        modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default PalSelectionModal;
