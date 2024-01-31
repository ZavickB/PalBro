import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import TopBar from '../components/TopBar';
import { useTheme } from '../components/ThemeContext';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import { FlatList } from 'react-native-gesture-handler';
import ItemsList from '../assets/data/ItemsList';

const DropsView = ({ route, navigation }) => {
  const { currentTheme } = useTheme();

  
  // Function to extract unique drops from PalsProfilesStatsAndBreedings data
  const getUniqueDrops = () => {
    const uniqueDrops = new Set();
    PalsProfilesStatsAndBreedings.forEach((pal) => {
      const { drops } = pal;
      if (drops) {
        drops.forEach((drop) => {
          uniqueDrops.add(drop);
        });
      }
    });

    return Array.from(uniqueDrops);
  };

  const uniqueDropsData = getUniqueDrops();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor, // Use your theme-aware background color
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: currentTheme.textColor, // Set text color based on the theme
    },
    dropItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    dropText: {
      fontSize: 16,
      color: currentTheme.textColor, // Set text color based on the theme
    },
  });

  return (
    <View style={styles.container}>
      <TopBar title="Drops" navigation={navigation} theme={currentTheme} />
      <Text style={styles.title}>Unique Drops</Text>
      <FlatList
        data={uniqueDropsData}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.dropItem}>
            <Image
              source={ ItemsList.find((itemObject) => itemObject.name === item)?.icon }
              style={{ width: 30, height: 30, marginRight: 10 }}
            />
            <Text style={styles.dropText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};


export default DropsView;
