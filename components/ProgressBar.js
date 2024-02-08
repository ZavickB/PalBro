import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const ProgressBar = ({ progress }) => {
  // Assuming progress is a value between 0 and 1 where 1 is 100%
  const barWidth = Math.min(100, progress * 100); // Calculate width of the progress bar

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#DAA520', '#FFD700', '#DAA520']} // Gold gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.bar, { width: `${barWidth}%` }]}
      >
        <Text style={styles.text}>COMPLETE {progress}/10</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  bar: {
    height: 20,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  ratio: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 5,

  },
});

export default ProgressBar;