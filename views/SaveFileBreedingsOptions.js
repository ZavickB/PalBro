import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import TopBar from '../components/TopBar';
import GradientBackground from '../components/GradientBackground';
import { useTheme } from '../components/contexts/ThemeContext';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import getPotentialsCouplesForBabyWithPassives from '../utils/couplesLogic';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';

const SaveFileBreedingsOptions = ({ navigation }) => {
    const { currentTheme } = useTheme();
    const [selectedBaby, setSelectedBaby] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [desiredSkills, setDesiredSkills] = useState(['', '', '', '']);
    const [result, setResult] = useState(null);

    const handleCalculate = async () => {
        console.log('Result before calculation:', result);
        if (!result || !result.uri) {
            console.error('Please select a file');
            return;
        }
    
        console.log('Inputs to getPotentialsCouplesForBabyWithPassives:', { playerName, selectedBaby, desiredSkills, uri: result.uri });
        
        
        // Assuming palsOfficialProfiles is imported directly and doesn't need async reading
        try {
            // Instead of reading from a file, use the directly imported JSON data
            const couplesProbabilities = await getPotentialsCouplesForBabyWithPassives(selectedBaby, playerName, desiredSkills, result.uri);
            console.log('Potential Couples:', couplesProbabilities);
        } catch (error) {
            console.error('Error fetching potential couples:', error);
        }
    };
    
    const babyNames = PalsProfilesStatsAndBreedings.map(profile => profile.name);

    return (
        <GradientBackground>
            <View style={styles.container}>
                <TopBar title="BreedingsFromSave" navigation={navigation} theme={currentTheme} />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={`Player name`}
                        value={playerName}
                        onChangeText={(name) => setPlayerName(name)}
                    />
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedBaby}
                        onValueChange={(itemValue) => setSelectedBaby(itemValue)}
                    >
                        <Picker.Item label="Select a Baby" value="" />
                        {babyNames.map((name, index) => (
                            <Picker.Item key={index} label={name} value={name} />
                        ))}
                    </Picker>
                    {desiredSkills.map((skill, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            placeholder={`Desired Skill ${index + 1}`}
                            value={skill}
                            onChangeText={(text) => {
                                const newSkills = [...desiredSkills];
                                newSkills[index] = text;
                                setDesiredSkills(newSkills);
                            }}
                        />
                    ))}
                    <Button
                        title="Open file picker for single JSON file selection"
                        onPress={async () => {
                            try {
                                const result = await DocumentPicker.getDocumentAsync({
                                    type: 'application/json',
                                    multiple: false, // Ensure only one file can be picked
                                });

                                // Log the full result to understand its structure
                                console.log('Document Picker Result:', JSON.stringify(result));

                                // Check if the file picking was successful by ensuring 'canceled' is false and 'assets' exists
                                if (!result.canceled && result.assets && result.assets.length > 0) {
                                    const { uri, name, size } = result.assets[0]; // Extract file details from the first asset
                                    console.log('File picked:', { uri, name, size });
                                    setResult({ uri, name, size });
                                } else {
                                    console.log('File picking was canceled or no file was selected');
                                }
                            } catch (error) {
                                console.error('Error picking document:', error);
                            }
                        }}
                    />
                    <Button style={{marginHorizontal:10 }} title="Calculate" onPress={handleCalculate} />
                </View>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        flex: 1,
        padding: 20,
    },
    picker: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    input: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default SaveFileBreedingsOptions;
