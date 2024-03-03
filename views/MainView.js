import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import { useTheme } from '../components/contexts/ThemeContext';
import GradientBackground from '../components/GradientBackground';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext';
import { responsiveScale } from '../utils/responsiveScale';

const MainView = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const spacing = responsiveScale(5);

  // Calculate tile width and height using responsiveScale and verticalScale respectively
  const tileWidth = responsiveScale(120, 'width') - spacing;
  const tileHeight =  responsiveScale(221, 'height') - spacing;

  const { capturedPals, toggleCapture } = useCapturedPals();
 
  const handleTilePress = (item, index, data) => {
    navigation.navigate('PalsDetails', { palData: item, currentIndex: index , allData: data  });
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


  const resetKey = 0;
  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <TopBar title="Home" navigation={navigation} theme={currentTheme} />
          <SearchableList
            searchBarPlaceholder={'Browse all Pals...'}
            data={PalsProfilesStatsAndBreedings}
            resetKey={resetKey + 1}
            renderItem={({ item, index, hideCompleted }) => (
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => handleTilePress(item, index, PalsProfilesStatsAndBreedings)}>
                  <PalTile
                    pal={item}
                    tileWidth={tileWidth}
                    tileHeight={tileHeight}
                    spacing={spacing}
                    captureCount={capturedPals[item.key] || 0}
                    onCapturePress={() => toggleCapture(item.key)}
                    isCaptured={!!capturedPals[item.key]}
                    hideCompleted={hideCompleted}
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
    paddingHorizontal: responsiveScale(10, "width"), // Apply moderateScale for horizontal padding
  },
  listContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MainView;
