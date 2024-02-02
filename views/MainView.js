import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import { useTheme } from '../components/ThemeContext';
import GradientBackground from '../components/GradientBackground';

// Import Redux related functions
import { connect } from 'react-redux';
import { updateCapturedPals } from '../redux/capturedPals'; // Replace with the correct path to your action

const MainView = ({ navigation, capturedPals, updateCapturedPals }) => {
  const { currentTheme } = useTheme();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  const handleTilePress = (item) => {
    navigation.navigate('PalsDetails', { palData: item });
  };

  const toggleCapture = (palKey) => {
    let updatedCapturedPals;

    if (capturedPals.includes(palKey)) {
      updatedCapturedPals = capturedPals.filter((key) => key !== palKey);
    } else {
      updatedCapturedPals = [...capturedPals, palKey];
    }

    // Use the updateCapturedPals function from Redux to update the state
    updateCapturedPals(updatedCapturedPals);

    // You can remove the AsyncStorage part since Redux will handle state persistence
  };

  PalsProfilesStatsAndBreedings.sort((a, b) => {
    const aKey = a.key.toLowerCase();
    const bKey = b.key.toLowerCase();

    const aNumeric = parseInt(aKey, 10);
    const bNumeric = parseInt(bKey, 10);

    const aLetter = aKey.replace(/^\d+/g, '');
    const bLetter = bKey.replace(/^\d+/g, '');

    if (aNumeric < bNumeric) return -1;
    if (aNumeric > bNumeric) return 1;

    return aLetter.localeCompare(bLetter);
  });

  return (
    <GradientBackground>
      <View style={[styles.container ]}>
        <View style={styles.appContainer}>
          <TopBar title="Home" navigation={navigation} theme={currentTheme} />
          <SearchableList
            data={PalsProfilesStatsAndBreedings}
            renderItem={({ item }) => (
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => handleTilePress(item)}>
                  <PalTile
                    pal={item}
                    tileWidth={tileWidth}
                    tileHeight={tileHeight}
                    spacing={spacing}
                    onCapturePress={() => toggleCapture(item.key)}
                    isCaptured={capturedPals.includes(item.key)}
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
            emptyStateText="No matching Pals found."
          />
        </View>
      </View>
    </GradientBackground>
  );
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
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

// Map Redux state to component props
const mapStateToProps = (state) => ({
  capturedPals: state.capturedPals,
});

// Connect the component to Redux and updateCapturedPals action
export default connect(mapStateToProps, { updateCapturedPals })(MainView);
