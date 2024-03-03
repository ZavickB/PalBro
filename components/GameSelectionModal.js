import React, { useState, useContext, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Dimensions } from 'react-native';
import { useTheme } from './contexts/ThemeContext';
import { responsiveScale } from '../utils/responsiveScale';
import { FontAwesome5 } from '@expo/vector-icons';
import { GameContext } from './contexts/GameContext';
import CustomAlertModal from './CustomAlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export const GameSelectionModal = ({ visible, onClose = () => setHasToBeVisible(false) }) => {

    const { currentTheme } = useTheme();
    const { games, currentGame, setCurrentGame, addGame, removeGame } = useContext(GameContext);
    const [newGame, setNewGame] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [gameToDelete, setGameToDelete] = useState('');
    const [firstLaunch, setFirstLaunch] = useState('');
    const [hasToBeVisible, setHasToBeVisible] = useState(visible);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
            if (alreadyLaunched === null) {
                setFirstLaunch(true);
                // Do not automatically set hasToBeVisible here; let firstLaunch logic handle it
            } else {
                setFirstLaunch(false);
                // Assuming you want the modal to be controllable via props after the first launch
            }
        };
    
        checkFirstLaunch();
    }, []);

    useEffect(() => {
        if (!firstLaunch) { // Only automatically sync with visible prop if not first launching
            setHasToBeVisible(visible);
        }
    }, [visible, firstLaunch]);

    const handleClose = () => {
        setHasToBeVisible(false); // Update internal state to close the modal
        onClose(); // Call the onClose prop function, if it does anything additional
    };
        
    const handleFirstLaunchConfirm = async () => {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setFirstLaunch(false);
        setHasToBeVisible(true); // Or set based on some condition or prop
    };

    const handleGameSelection = (game) => {
        setCurrentGame(game);
    };

    const handleAddGame = () => {
        if (newGame.trim()) {
            addGame(newGame);
            setNewGame('');
        }
    };

    const handleDeleteGame = (game) => {
        if (game === currentGame) {
            setAlertTitle("Cannot Delete Current Game");
            setAlertMessage("Please select or add another game before deleting this one.");
        } else {
            setAlertTitle("Delete Game?");
            setAlertMessage(`Are you sure you want to delete "${game}"? This action cannot be undone.`);
            setGameToDelete(game);
        }
        setAlertVisible(true);
    };

    const confirmDelete = () => {
        if (gameToDelete) {
            removeGame(gameToDelete);
        }
        setAlertVisible(false);
    };

    return (
        <>
            {firstLaunch ? (
                <CustomAlertModal
                    visible={true}
                    title="Welcome to PalBro! 🎉"
                    message="Let's get started! To track your game progress, tap the 🎮 icon in the top bar. There, you can add your first game and begin your journey. Have fun!"
                    confirmButtonText="Start Now" // If your CustomAlertModal supports custom button text
                    onConfirm={handleFirstLaunchConfirm}
                />
            ) : (
            <Modal visible={hasToBeVisible} animationType="slide" transparent={true}>
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { backgroundColor: currentTheme.backgroundColor }]}>
                        <View style={styles.header}>
                            <Text style={[styles.title, { color: currentTheme.textColor }]}>Select a game</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                                <FontAwesome5 name="times" size={responsiveScale(20)} color={currentTheme.textColor} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.gamesList}>
                            {Object.keys(games).map((gameName, index) => (
                                <View key={index} style={styles.gameContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.game,
                                            { backgroundColor: gameName === currentGame ? currentTheme.palTileBackgroundColor : 'transparent' },
                                        ]}
                                        onPress={() => handleGameSelection(gameName)}
                                    >
                                        <Text style={[styles.gameName, { color: currentTheme.textColor }]}>{gameName}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDeleteGame(gameName)}
                                    >
                                        <FontAwesome5 name="trash" size={responsiveScale(15)} color={currentTheme.textColor} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                        <View style={styles.addGame}>
                            <TextInput
                                style={[styles.input, { color: currentTheme.textColor, backgroundColor: currentTheme.searchBarBackgroundColor }]}
                                value={newGame}
                                onChangeText={setNewGame}
                                placeholder="Add a new game"
                                placeholderTextColor={currentTheme.placeholderColor}
                            />
                            <TouchableOpacity style={styles.addButton} onPress={handleAddGame}>
                                <FontAwesome5 name="plus" size={responsiveScale(20)} color={currentTheme.textColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {alertVisible && (
                    <CustomAlertModal
                        visible={alertVisible}
                        title={alertTitle}
                        message={alertMessage}
                        onConfirm={confirmDelete}
                        onCancel={() => setAlertVisible(false)}
                    />
                )}
            </Modal>
        )}
        </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
        margin: 20,
        width: width * 0.8, // Use 80% of screen width
        maxHeight: height * 0.8, // Use 80% of screen height
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 20, // Rounded corners
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%', // Ensure the header uses the full width of the modal
        marginBottom: 15, // Add some space below the header
    },
    title: {
        fontSize: responsiveScale(20),
        fontWeight: 'bold', // Make the title bold
    },
    closeButton: {
        padding: responsiveScale(10),
    },
    gamesList: {
        width: '100%', // Ensure the list uses the full width of the modal
    },
    game: {
        padding: responsiveScale(10),
        borderRadius: 10, // Rounded corners for game items
        marginBottom: 10, // Add space between game items
    },
    gameName: {
        fontSize: responsiveScale(16), // Adjust font size for better readability
    },
    addGame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%', // Ensure the add game section uses the full width of the modal
        marginTop: 15, // Add some space above the add game section
    },
    input: {
        flex: 1,
        marginRight: 10, // Add some space between the input and the add button
        padding: responsiveScale(10),
        borderRadius: 10, // Rounded corners for the input
    },
    addButton: {
        padding: responsiveScale(10),
    },
    gameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: responsiveScale(10),
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    deleteButton: {
        marginLeft: 10, // Add some space between the game name and the delete button
    },
});

export default GameSelectionModal;
