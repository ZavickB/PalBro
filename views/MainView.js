import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';

const MainView = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 20;
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
    <View style={styles.container}>
      <TopBar title="Home" navigation={navigation} />
      <SearchableList
        data={PalsProfilesStatsAndBreedings}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTilePress(item)}>
            <PalTile
              palName={item.name}
              palImageSource={item.image}
              palTypes={item.types}
              tileWidth={tileWidth}
              tileHeight={tileHeight}
              spacing={spacing}
            />
          </TouchableOpacity>
        )}
        numColumns={3} // Set the number of columns to 3
        emptyStateText="No matching Pals found."
      />
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
    paddingHorizontal: 5,
    paddingTop: 20,
  },
});

export default App;
