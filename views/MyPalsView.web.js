import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import { useTheme } from '../components/contexts/ThemeContext';
import GradientBackground from '../components/GradientBackground';
import { useCapturedPals } from '../components/contexts/CapturedPalsContext';
import { responsiveScale } from '../utils/responsiveScale';

const MyPalsView = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const { capturedPals, toggleCapture } = useCapturedPals();
  
  // Use moderateScale to adjust spacing for different screen sizes
  const spacing = responsiveScale(5);

  // Calculate tile width and height using responsiveScale and verticalScale respectively
  const tileWidth = responsiveScale(120, 'width') - spacing;
  const tileHeight =  responsiveScale(221, 'height') - spacing;

  const TICKER_HEIGHT = responsiveScale(30, "height");

  const newlyCapturedPals = PalsProfilesStatsAndBreedings.filter(pal => !!capturedPals[pal.key]);

  const handleTilePress = (item, index, data) => {
    navigation.navigate('PalsDetails', { palData: item, currentIndex: index , allData: data  });
  };

  const renderCapturedPals = () => {
    return (
      <SearchableList
        searchBarPlaceholder={'Browse captured Pals...'}
        data={newlyCapturedPals}
        renderItem={({ item, index, hideCompleted }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => handleTilePress(item, index, newlyCapturedPals)}>
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
        initialNumToRender={15}
      />
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
      <View style={[styles.container ]}>
        <View style={styles.appContainer}>  
          <TopBar title="My Pals" navigation={navigation} theme={currentTheme} />
          <Text style={styles.tickerText}>Catpured Pals</Text>
        
            <View style={{flex: 1}}>
              {renderCapturedPals()}
            </View>

        </View>
      </View>
    </GradientBackground>
  );
};

export default MyPalsView;