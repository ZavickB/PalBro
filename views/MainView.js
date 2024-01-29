import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import { useTheme } from '../components/ThemeContext';

const MainView = ({ navigation }) => {
  // Use the useTheme hook to get the current theme
  const { currentTheme } = useTheme();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  const handleTilePress = (item) => {
    navigation.navigate('Details', { palData: item });
  };

  // Custom sorting function
  PalsProfilesStatsAndBreedings.sort((a, b) => {
    const aKey = a.key.toLowerCase();
    const bKey = b.key.toLowerCase();

    // Extract the numeric part of the keys
    const aNumeric = parseInt(aKey, 10);
    const bNumeric = parseInt(bKey, 10);

    // Extract the letter part of the keys
    const aLetter = aKey.replace(/^\d+/g, '');
    const bLetter = bKey.replace(/^\d+/g, '');

    // Compare the numeric parts
    if (aNumeric < bNumeric) return -1;
    if (aNumeric > bNumeric) return 1;

    // If numeric parts are equal, compare the letter parts
    return aLetter.localeCompare(bLetter);
  });

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      <View style={styles.appContainer}>
        <TopBar title="Home" navigation={navigation} theme={currentTheme} />
          <SearchableList
            data={PalsProfilesStatsAndBreedings}
            renderItem={({ item }) => (
              <View style={styles.listContainer}>
              <TouchableOpacity onPress={() => handleTilePress(item)}>
                <PalTile
                  palName={item.name}
                  palImageSource={item.image}
                  palTypes={item.types}
                  tileWidth={tileWidth}
                  tileHeight={tileHeight}
                  spacing={spacing}
                  rarity={item.rarity}
                  theme={currentTheme} // Pass the theme to PalTile
                />
              </TouchableOpacity>
            </View>
            )}
            numColumns={3} // Set the number of columns to 3
            emptyStateText="No matching Pals found."
          />
      </View>
    </View>
  );
};


const App = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MainView navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  listContainer:{
    flex: 1,
    alignItems: 'center',
  }
});

export default App;
