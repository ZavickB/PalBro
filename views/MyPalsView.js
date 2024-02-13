import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import { useTheme } from '../components/contexts/ThemeContext';
import GradientBackground from '../components/GradientBackground';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext'; // Import the context hook
import PagerView from 'react-native-pager-view';

const MyPalsView = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const { capturedPals, toggleCapture } = useCapturedPals(); // Use the context hook to access state and functions

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  // Filter the newly captured pals directly here
  const newlyCapturedPals = PalsProfilesStatsAndBreedings.filter((pal) =>
    !!capturedPals[pal.key] // Adjusted check for captured status
  );

  const missingPals = PalsProfilesStatsAndBreedings.filter((pal) =>
    !capturedPals[pal.key] // Adjusted check for captured status
  );

  const [pageIndex, setPageIndex] = useState(0);
  const PAGES = [1, 2];
  const pageNames = [
    'Captured Pals ('+ newlyCapturedPals.length +')', // Reflects potential pals from captured pals only
    'Missing Pals ('+ missingPals.length +')' // Reflects potential pals from all pals
  ];
  const currentPageName = pageNames[pageIndex];

  const onPageSelected = (e) => {
    setPageIndex(e.nativeEvent.position);
  };


  const handleTilePress = (item) => {
    navigation.navigate('MyPalsDetails', { palData: item });
  };

  const renderCapturedPals = () => {
    return (
      <SearchableList
        searchBarPlaceholder={'Browse captured Pals...'}
        data={newlyCapturedPals} // Use newlyCapturedPals here
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => handleTilePress(item)}>
              <PalTile
                pal={item}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                spacing={spacing}
                captureCount={capturedPals[item.key] || 0} // Adjusted count for captured status
                onCapturePress={() => toggleCapture(item.key)}
                isCaptured={!!capturedPals[item.key]} // Adjusted check for captured status
                capturedPals={capturedPals}
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
        emptyStateText="No captured Pals found."
      />
    )
  };

  const renderMissingPals = () => {
    return (
      <SearchableList
        searchBarPlaceholder={'Browse missing Pals...'}
        data={missingPals} // Use newlyCapturedPals here
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => handleTilePress(item)}>
              <PalTile
                pal={item}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                spacing={spacing}
                captureCount={capturedPals[item.key] || 0} // Adjusted count for captured status
                onCapturePress={() => toggleCapture(item.key)}
                isCaptured={!!capturedPals[item.key]} // Adjusted check for captured status
                capturedPals={capturedPals}
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
        emptyStateText="No matching Pals found."
      />
    )
  };

  const renderDotIndicators = () => {
    const theme = useTheme(); // Assuming this hook returns the current theme object
    const activeDotColor = theme.currentTheme.primaryColor; // Active dot color
    const inactiveDotColor = theme.currentTheme.secondaryColor; // Inactive dot color
    
    return (
      <View style={styles.dotIndicatorContainer}>
        {PAGES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: pageIndex === index ? activeDotColor : inactiveDotColor, width: pageIndex === index ? 24 : 8 },
            ]}
          />
        ))}
      </View>
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
    pagerView: {
      flex: 1,
    },
    dotIndicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 10,
      backgroundColor: "transparent"
    },
    dot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      marginHorizontal: 5,
    },
    pageName: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'left',
      marginBottom: 10,
      color: currentTheme.textColor,
    },
    listContainer: {
      flex: 1,
      alignItems: 'center',
    },
    scrollView: {
      flexGrow: 1, // Add this to allow the ScrollView to grow with content
    },
  });

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <TopBar title="My Pals" navigation={navigation} theme={currentTheme} />
          <Text style={styles.pageName}>{currentPageName}</Text>
          <PagerView style={styles.pagerView} initialPage={0} onPageSelected={onPageSelected}>
            <View key="1">
                {renderCapturedPals()}
              </View>
              <View key="2">
                {renderMissingPals()}
            </View>
          </PagerView>
          {renderDotIndicators()}
        </View>
      </View>
    </GradientBackground>
  );
};


export default MyPalsView;
