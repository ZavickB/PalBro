import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesAndBreedings from '../assets/data/PalsProfilesAndBreedings';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailedView from './DetailedView';
import SearchableList from '../components/SearchableList';
import LinearGradient from 'react-native-linear-gradient';


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

  return (
    <View style={styles.container}>
    <TopBar title="Main" navigation={navigation} />
      <SearchableList
        data={PalsProfilesAndBreedings}
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

const App =  ({ navigation }) => {
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
    padding: 10,
  },
});

export default App;
