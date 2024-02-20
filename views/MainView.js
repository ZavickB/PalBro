import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import { useTheme } from '../components/contexts/ThemeContext';
import GradientBackground from '../components/GradientBackground';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext'; // Import the context hook

const MainView = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  const { capturedPals, toggleCapture } = useCapturedPals(); // Use the context hook
 
  const handleTilePress = (item) => {
    navigation.navigate('PalsDetails', { palData: item });
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
            resetKey={resetKey+1}
            renderItem={({ item, hideCompleted }) => (
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => handleTilePress(item)}>
                  <PalTile
                    pal={item}
                    tileWidth={tileWidth}
                    tileHeight={tileHeight}
                    spacing={spacing}
                    captureCount={capturedPals[item.key] || 0} // Adjusted count for captured status
                    onCapturePress={() => toggleCapture(item.key)} // Use the context function
                    isCaptured={!!capturedPals[item.key]} // Adjusted check for captured status
                    hideCompleted={hideCompleted} // Now passing hideCompleted to each PalTile
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

export default MainView;
