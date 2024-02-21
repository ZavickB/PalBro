import React, { useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, View, Dimensions, TouchableOpacity, SafeAreaView, Text, Pressable } from 'react-native';
import { useTheme } from '../components/contexts/ThemeContext';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext';
import TopBar from '../components/TopBar';
import GradientBackground from '../components/GradientBackground';
import SearchableList from '../components/SearchableList';
import PalTile from '../components/PalTile';
import PagerView from 'react-native-pager-view';
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

  const [pageIndex, setPageIndex] = useState(0);
  const pageIndexAnimatedValue = useRef(new Animated.Value(0)).current;
  const PAGES = [0, 1];
  const pageNames = ['Captured Outcomes', 'All Outcomes'];

  useEffect(() => {
    pageIndexAnimatedValue.setValue(pageIndex); // Directly set to pageIndex for immediate response
  }, [pageIndex]);

  const PageNameTicker = ({ pageIndex }) => {
    const translateY = pageIndexAnimatedValue.interpolate({
      inputRange: pageNames.map((_, index) => index),
      outputRange: pageNames.map((_, index) => index * - TICKER_HEIGHT),
    });

    return (
      <View style={styles.tickerContainer}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          {pageNames.map((name, index) => (
            <Text key={index} style={styles.tickerText}>{name}</Text>
          ))}
        </Animated.View>
      </View>
    );
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
                spacing={spacing}
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

  const handleTilePress = (item, palsUsed) => {
    navigation.navigate('BreedingDetailsView', { palData: item, palsUsed });
  };

  const renderDotIndicators = () => {
    return (
      <View style={styles.dotIndicatorContainer}>
        {PAGES.map(index => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: pageIndexAnimatedValue.interpolate({
                  inputRange: PAGES,
                  outputRange: PAGES.map(i => (i === index ? currentTheme.primaryColor : currentTheme.backgroundColor)),
                }),

              },
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
          <PageNameTicker pageIndexAnimatedValue={pageIndexAnimatedValue} />
          <PagerView
            initialPage={0}
            style={styles.pagerView}
            onPageSelected={e => {
              Animated.spring(pageIndexAnimatedValue, {
                toValue: e.nativeEvent.position,
                useNativeDriver: true,
              }).start();
            }}
          >           
            <View key="1" style={{flex: 1}}>
              {renderPotentialParents()}
            </View>
            <View key="2" style={{flex: 1}}>
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