import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import TopBar from '../components/TopBar';
import GradientBackground from '../components/GradientBackground';
import { useTheme } from '../components/contexts/ThemeContext';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import getPotentialsCouplesForBabyWithPassives from '../utils/couplesLogic';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import PotentialCoupleCard from '../components/PotentialCoupleCard'; // A new component to display each couple

const AdvancedBreedingsView = ({ navigation }) => {
    const { currentTheme } = useTheme();
    const [selectedBaby, setSelectedBaby] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [desiredSkills, setDesiredSkills] = useState(['', '', '', '']);
    const [result, setResult] = useState(null);
    const [potentialCouples, setPotentialCouples] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const width = Dimensions.get('window').width;
    const fieldWidth = 0.5 * width - 20;
    const buttonWidth = 0.9 * width;

    const handleCalculate = async () => {
        setIsLoading(true);
        if (!result || !result.uri) {
            console.error('Please select a file');
            return;
        }
    
        try {
            const couplesProbabilities = await getPotentialsCouplesForBabyWithPassives(selectedBaby, playerName, desiredSkills, result.uri);
            setPotentialCouples(couplesProbabilities);
        } catch (error) {
            console.error('Error fetching potential couples:', error);
        }
        setIsLoading(false);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        appContainer: {
            flex: 1,
            paddingTop: 20,
            paddingHorizontal: 10,
          },
        inputContainer: {
            flex: 1,
            padding: 20,
        },
        resultContainer: {
            flex: 2,
            padding: 20,
        },
        inputRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15, // Ensure space between rows
        },
        input: {
            backgroundColor: currentTheme.backgroundColor,
            color: currentTheme.textColor,
            borderColor: currentTheme.borderColor,
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            width: fieldWidth, // Adjust width to fit 2 inputs per row
            marginHorizontal: 10, // Ensure space between inputs
        },
        button: {
            backgroundColor: currentTheme.modalContentBackground, // You can change the color as needed
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: "5%", // Ensure space between buttons
            width: buttonWidth, // Adjust width to fit the screen
          },
          buttonText: {
            color: currentTheme.textColor,
            fontWeight: 'bold',
          },
    });

    const pals = PalsProfilesStatsAndBreedings.map(profile => profile).sort((a, b) => a.name.localeCompare(b.name));


    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.appContainer}>
                    <TopBar title="Advanced" navigation={navigation} theme={currentTheme} />
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={currentTheme.secondaryColor}
                                placeholder={`Player name`}
                                value={playerName}
                                onChangeText={(name) => setPlayerName(name.trim())}
                            />
                            <Picker
                                style={[styles.input, {padding: 0, justifyContent: 'center'}]} // Adjust style for Picker
                                selectedValue={selectedBaby}
                                onValueChange={(itemValue) => setSelectedBaby(itemValue)}
                            >
                                <Picker.Item label="Select a Baby" value="" />
                                {pals.map((pal, index) => (
                                    <Picker.Item key={index} label={pal.name} value={pal} />
                                ))}
                            </Picker>
                        </View>
                        {desiredSkills.slice(0, 2).map((skill, index) => (
                            <View key={index} style={styles.inputRow}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Desired Skill ${index * 2 + 1}`}
                                    placeholderTextColor={currentTheme.secondaryColor}
                                    value={desiredSkills[index * 2]}
                                    onChangeText={(text) => {
                                        const newSkills = [...desiredSkills];
                                        newSkills[index * 2] = text.trim();
                                        setDesiredSkills(newSkills);
                                    }}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder={`Desired Skill ${index * 2 + 2}`}
                                    placeholderTextColor={currentTheme.secondaryColor}
                                    value={desiredSkills[index * 2 + 1]}
                                    onChangeText={(text) => {
                                        const newSkills = [...desiredSkills];
                                        newSkills[index * 2 + 1] = text.trim();
                                        setDesiredSkills(newSkills);
                                    }}
                                />
                            </View>
                        ))}
                        <TouchableOpacity
                            style={styles.button} 
                            onPress={async () => {
                                try {
                                    const result = await DocumentPicker.getDocumentAsync({
                                        type: 'application/json',
                                        multiple: false, // Ensure only one file can be picked
                                    });

                                    // Check if the file picking was successful by ensuring 'canceled' is false and 'assets' exists
                                    if (!result.canceled && result.assets && result.assets.length > 0) {
                                        const { uri, name, size } = result.assets[0]; // Extract file details from the first asset
                                        setResult({ uri, name, size });
                                    } else {
                                        console.log('File picking was canceled or no file was selected');
                                    }
                                } catch (error) {
                                    console.error('Error picking document:', error);
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>Select File</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleCalculate}>
                            <Text style={styles.buttonText}>Calculate Potential Couples</Text>
                        </TouchableOpacity>
                    <View style={styles.resultContainer}>
                        {isLoading ? (
                            // Display loading indicator when isLoading is true
                            <ActivityIndicator size="large" color={currentTheme.primaryColor} />
                        ) : potentialCouples.length > 0 ? (
                            // Display potential couples if any
                            <ScrollView>
                                {potentialCouples.map((couple, index) => (
                                    <PotentialCoupleCard key={index} couple={couple} />
                                ))}
                            </ScrollView>
                        ) : (
                            // Display no results message
                            <Text style={{ color: currentTheme.textColor, textAlign: 'center' }}>
                                No potential couple found for selected Passives
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </GradientBackground>
    );
};

export default AdvancedBreedingsView;