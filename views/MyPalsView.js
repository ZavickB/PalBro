import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import { useTheme } from '../components/contexts/ThemeContext';
import GradientBackground from '../components/GradientBackground';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext';
import PagerView from 'react-native-pager-view';

const MyPalsView = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const { capturedPals, toggleCapture } = useCapturedPals();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;
  const newlyCapturedPals = PalsProfilesStatsAndBreedings.filter(pal => !!capturedPals[pal.key]);
  const missingPals = PalsProfilesStatsAndBreedings.filter(pal => !capturedPals[pal.key]);
  const pageIndexAnimatedValue = useRef(new Animated.Value(0)).current;
  const [pageIndex, setPageIndex] = useState(0);

  const PAGES = [0,1];
  const pageNames = [
    `Captured Pals (${newlyCapturedPals.length})`,
    `Missing Pals (${missingPals.length})`
  ];
  const TICKER_HEIGHT = 30;

  useEffect(() => {
    pageIndexAnimatedValue.setValue(pageIndex); // Directly set to pageIndex for immediate response
  }, [pageIndex]);

  const PageNameTicker = ({ pageIndex }) => {
    const translateY = pageIndexAnimatedValue.interpolate({
      inputRange: pageNames.map((_, index) => index),
      outputRange: pageNames.map((_, index) => index * -TICKER_HEIGHT),
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

  const handleTilePress = (item) => {
    navigation.navigate('MyPalsDetails', { palData: item });
  };

  const renderCapturedPals = () => {
    return (
      <SearchableList
        searchBarPlaceholder={'Browse captured Pals...'}
        data={newlyCapturedPals}
        renderItem={({ item, hideCompleted }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => handleTilePress(item)}>
              <PalTile
                pal={item}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                spacing={spacing}
                captureCount={capturedPals[item.key] || 0}
                onCapturePress={() => toggleCapture(item.key)}
                isCaptured={!!capturedPals[item.key]}
                capturedPals={capturedPals}
                hideCompleted={hideCompleted}
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
        emptyStateText="No captured Pals found."
      />
    );
  };

  const renderMissingPals = () => {
    return (
      <SearchableList
        searchBarPlaceholder={'Browse missing Pals...'}
        data={missingPals}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => handleTilePress(item)}>
              <PalTile
                pal={item}
                tileWidth={tileWidth}
                tileHeight={tileHeight}
                spacing={spacing}
                captureCount={capturedPals[item.key] || 0}
                onCapturePress={() => toggleCapture(item.key)}
                isCaptured={!!capturedPals[item.key]}
                capturedPals={capturedPals}
              />
            </TouchableOpacity>
          </View>
        )}
        numColumns={3}
        emptyStateText="No matching Pals found."
      />
    );
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
                // Interpolate the background color of each dot based on the pageIndexAnimatedValue
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
    },
    dot: {
      height: 8,
      width: 24,
      borderRadius: 4,
      marginHorizontal: 5,
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
      fontSize: 20,
      fontWeight: 'bold',
      color: currentTheme.textColor,
    },
  });

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <TopBar title="My Pals" navigation={navigation} theme={currentTheme} />
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
              {renderCapturedPals()}
            </View>
            <View key="2" style={{flex: 1}}>
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