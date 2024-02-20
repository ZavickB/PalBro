import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './contexts/ThemeContext';
import BuyMeACoffeeButton from './BuyMeACoffeeButton';
import Icon from 'react-native-vector-icons/FontAwesome';

const BuyMeACoffeeModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const { currentTheme } = useTheme();

    useEffect(() => {
        setTimeout(() => {
            displayModal();
        }, 2000);
    }, []);

    const displayModal = async () => {
        const firstLaunch = await AsyncStorage.getItem('alreadyLaunched');
        if (firstLaunch === null) {
            AsyncStorage.setItem('alreadyLaunched', 'true');
        } else {
            setModalVisible(true);
        }
    };

    const onClose = () => setModalVisible(false);

    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ensuring this is applied correctly
            width: '100%',
            height: '100%',
        },
        modalView: {
            margin: 20,
            backgroundColor: currentTheme.modalContentBackground,
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            borderColor: currentTheme.borderColor,
            borderWidth: 1,
        },
        greetingText: {
            marginBottom: 10,
            fontSize: 20,
            textAlign: "center",
            color: currentTheme.textColor
        },
        messageText: {
            marginBottom: 15,
            fontSize: 16,
            textAlign: "center",
            color: currentTheme.textColor
        },
        thanksText: {
            marginBottom: 20,
            fontSize: 14,
            textAlign: "center",
            color: currentTheme.textColor,
            fontStyle: 'italic'
        },
        closeButton: {
            position: 'absolute',
            right: 20,
            top: 20,
            fontStyle:'bold'
        }
    });

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={24} color={currentTheme.primaryColor} />
                    </TouchableOpacity>
                    <Text style={styles.greetingText}>Hey there! 👋</Text>
                    <Text style={styles.messageText}>
                        I hope you're enjoying the app.
                    </Text>
                    <Text style={styles.messageText}>
                         It's crafted with ❤️ and kept ad-free for the best user experience.
                    </Text>
                    <Text style={styles.messageText}>
                        If you find it useful, consider buying me a coffee. Your support helps keep the app alive and evolving.
                    </Text>
                    <Text style={styles.thanksText}>Thank you for being awesome! 🙌</Text>
                    <BuyMeACoffeeButton />
                </View>
            </View>
        </Modal>
    );
}

export default BuyMeACoffeeModal;
