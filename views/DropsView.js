import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from 'react-native';
import TopBar from '../components/TopBar';
import { useTheme } from '../components/ThemeContext';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import ItemsList from '../assets/data/ItemsList';
import { useMemo } from 'react';

const DropsView = ({ route, navigation }) => {
  const { currentTheme } = useTheme();
  const [searchText, setSearchText] = useState('');
  const [filteredDrops, setFilteredDrops] = useState([]);

  // useMemo to memoize uniqueDropsData
  const uniqueDropsData = useMemo(() => {
    const uniqueDrops = new Set();
    PalsProfilesStatsAndBreedings.forEach((pal) => {
      pal.drops?.forEach((drop) => uniqueDrops.add(drop));
    });
    return Array.from(uniqueDrops);
  }, []); // Empty dependency array means it only calculates on initial render

  useEffect(() => {
    const filtered = uniqueDropsData.filter((drop) =>
      drop.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDrops(filtered);
  }, [searchText, uniqueDropsData]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      color: currentTheme.textColor,
    },
    dropItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    dropText: {
      fontSize: 16,
      color: currentTheme.textColor,
    },
    searchInput: {
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <TopBar title="Index of Drops" navigation={navigation} theme={currentTheme} />
      <TextInput
        placeholder="Search Drops..."
        style={styles.searchInput}
        onChangeText={setSearchText}
        value={searchText}
      />
      <FlatList
        data={filteredDrops}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.dropItem}>
            <Image
              source={ItemsList.find((itemObject) => itemObject.name === item)?.icon}
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
