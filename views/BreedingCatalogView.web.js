import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Dimensions, TouchableOpacity, SafeAreaView, Text, Pressable } from 'react-native';
import { useTheme } from '../components/contexts/ThemeContext';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext';
import TopBar from '../components/TopBar';
import GradientBackground from '../components/GradientBackground';
import SearchableList from '../components/SearchableList';
import PalTile from '../components/PalTile';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import { findAllBreedingPossibilities } from '../utils/BreedingsCalculator';
import { responsiveScale } from '../utils/responsiveScale';

const BreedingCatalogView = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const { capturedPals, toggleCapture } = useCapturedPals();

  const spacing = responsiveScale(5);

  // Calculate tile width and height using responsiveScale and verticalScale respectively
  const tileWidth = responsiveScale(120, 'width') - spacing;
  const tileHeight =  responsiveScale(221, 'height') - spacing;
  
  const TICKER_HEIGHT = responsiveScale(30, "height");

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
        renderItem={({ item, hideCompleted }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => handleTilePress(item, "MyPals")}>
              <PalTile
                pal={item}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                spacing={spacing}
                captureCount={capturedPals[item.key] || 0} // Adjusted count for captured status
                onCapturePress={() => toggleCapture(item.key)}
                isCaptured={!!capturedPals[item.key]} // Adjusted check for captured status
                hideCompleted={hideCompleted} // Now passing hideCompleted to each PalTile
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
        emptyStateText="No possible breeding found."
        initialNumToRender={15}
      />
    );
  };

  const handleTilePress = (item, palsUsed) => {
    navigation.navigate('BreedingDetailsView', { palData: item, palsUsed });
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    appContainer: {
      flex: 1,
      paddingHorizontal: responsiveScale(10, 'width'),
    },
    pagerView: {
      flex: 1,
    },
    dotIndicatorContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: responsiveScale(10, 'height'),
    },
    dot: {
      height: responsiveScale(8, 'height'),
      width: responsiveScale(24, 'width'),
      borderRadius: responsiveScale(4),
      marginHorizontal: responsiveScale(5, 'width'),
      backgroundColor: currentTheme.backgroundColor,
    },
    listContainer: {
      flex: 1,
      alignItems: 'center',
    },
    tickerContainer: {
      height: TICKER_HEIGHT, // Set a fixed height for the ticker container
      overflow: 'hidden',
    },
    tickerText: {
      fontSize: responsiveScale(20),
      fontWeight: 'bold',
      color: currentTheme.textColor,
    },
  });


  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.appContainer}>
          <TopBar title="Breeding Catalog" navigation={navigation} />
          <Text style={styles.tickerText} >Captured Outcomes</Text>
          
            <View style={{flex: 1}}>
              {renderPotentialParents()}
            </View>

        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default BreedingCatalogView;