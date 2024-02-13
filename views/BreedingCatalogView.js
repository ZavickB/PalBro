import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, SafeAreaView, Text, Pressable } from 'react-native';
import { useTheme } from '../components/contexts/ThemeContext';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext';
import TopBar from '../components/TopBar';
import GradientBackground from '../components/GradientBackground';
import SearchableList from '../components/SearchableList';
import PalTile from '../components/PalTile';
import PagerView from 'react-native-pager-view';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';

import { findAllBreedingPossibilities  } from '../utils/BreedingsCalculator';

const BreedingCatalogView = ({ navigation }) => {
  const { currentTheme } = useTheme();

  const { capturedPals, toggleCapture, refreshKey } = useCapturedPals(); // Use the context hook to access state and functions

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  const [pageIndex, setPageIndex] = useState(0);
  const PAGES = [
    1, 
    2
  ];
  const pageNames = [
    'Captured Outcomes', // Reflects potential pals from captured pals only
    'All Outcomes' // Reflects potential pals from all pals
  ];
  const currentPageName = pageNames[pageIndex];

  const onPageSelected = (e) => {
    setPageIndex(e.nativeEvent.position);
  };

  const capturedPalsData = [...PalsProfilesStatsAndBreedings].filter((pal) =>
    !!capturedPals[pal.key]
  );

  const renderPotentialParents = () => {
    const capturedPalsBreedingPossibilities = findAllBreedingPossibilities(capturedPalsData);
    // Prepare data for SearchableList
    const dataForSearchableList = PalsProfilesStatsAndBreedings.filter((pal) =>
      capturedPalsBreedingPossibilities.find((breeding) => breeding.key === pal.key)
    );

    return (
      <SearchableList
        searchBarPlaceholder={'Browse potential breedings...'}
        data={dataForSearchableList}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => handleTilePress(item, "MyPals")}>
              <PalTile
                pal={item}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                spacing={5}
                captureCount={capturedPals[item.key] || 0} // Adjusted count for captured status
                onCapturePress={() => toggleCapture(item.key)}
                isCaptured={!!capturedPals[item.key]} // Adjusted check for captured status
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
        emptyStateText="No possible breeding found."
      />
    );
  };

  const renderAllPals = () => {
    const dataForSearchableList = PalsProfilesStatsAndBreedings;
    return (
      <SearchableList
        searchBarPlaceholder={'Browse potential breedings...'}
        data={dataForSearchableList}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => handleTilePress(item, "AllPals")}>
              <PalTile
                pal={item}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                spacing={5}
                captureCount={capturedPals[item.key] || 0} // Adjusted count for captured status
                onCapturePress={() => toggleCapture(item.key)}
                isCaptured={!!capturedPals[item.key]} // Adjusted check for captured status
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
        emptyStateText="No possible breeding found."
      />
    );
  };


  const handleTilePress = (item, palsUsed ) => {
    navigation.navigate('BreedingOptionsView', { palData: item, palsUsed});
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
  });


  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.appContainer}>
          <TopBar title="Breeding Catalog" navigation={navigation} />
          <Pressable onLongPress={() => navigation.navigate('SaveFileBreedingsOptions')}>
            <Text style={styles.pageName}>{currentPageName}</Text>
          </Pressable>
          <PagerView style={styles.pagerView} initialPage={0} onPageSelected={onPageSelected}>
            <View key="1">
              {renderPotentialParents()}
            </View>
            <View key="2">
              {renderAllPals()}
            </View>
          </PagerView>
          {renderDotIndicators()}
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};


export default BreedingCatalogView;