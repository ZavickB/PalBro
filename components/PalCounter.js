import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext'; // Ensure correct import path
import { useTheme } from '../components/contexts/ThemeContext'; // Ensure correct import path

const PalCounter = ({ palKey }) => {
  const { capturedPals, increaseCapture, decreaseCapture } = useCapturedPals();
  const [isLoading, setIsLoading] = useState(false); // New state to track loading status
  const { currentTheme } = useTheme();
  const count = capturedPals[palKey] || 0;
  const isComplete = count >= 10;
  const barWidth = `${Math.min(100, (count / 10) * 100)}%`; // Calculate bar width as a percentage

  // Conditional styles for the progress bar
  const progressBarColor = isComplete ? ['#DAA520', '#FFD700', '#DAA520'] : ['#D3D3D3', '#C0C0C0', '#D3D3D3'];

  const handleIncrease = async () => {
    setIsLoading(true); // Disable the button
    try {
      await increaseCapture(palKey);
    } catch (error) {
      console.error('Failed to increase capture count:', error);
    }
    setIsLoading(false); // Re-enable the button
  };

  const handleDecrease = async () => {
    setIsLoading(true); // Disable the button
    try {
      await decreaseCapture(palKey);
    } catch (error) {
      console.error('Failed to decrease capture count:', error);
    }
    setIsLoading(false); // Re-enable the button
  };

  const isGold = count >= 10;

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItems: 'center',
      backgroundColor: currentTheme.progressBarBackgroundColor,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: currentTheme.textColor,
    },
    progressBarContainer: {
      width: '100%',
      height: 25,
      backgroundColor: '#808080', // Base color for the progress bar
      borderRadius: 5,
      overflow: 'hidden',
      marginBottom: 10,
    },
    bar: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    text: {
      color: 'black',
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Capture Progress</Text>
      <View style={styles.progressBarContainer}>
        <LinearGradient
          colors={progressBarColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.bar, { width: barWidth }]}
        >
          <Text style={styles.text}>{count}/10</Text>
        </LinearGradient>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="-" color={currentTheme.backgroundColor} onPress={handleDecrease} disabled={isLoading || count <= 0} />
        <Button title="+" color={currentTheme.backgroundColor} onPress={handleIncrease} disabled={isLoading} />
        {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
      </View>
    </View>
  );
};

export default PalCounter;
