import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import { useTheme } from '../components/ThemeContext';
import GradientBackground from '../components/GradientBackground';
import { useCapturedPals } from '../components/CapturedPalsContext'; // Import the context hook

const MyPalsView = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const { capturedPals, toggleCapture, refreshKey } = useCapturedPals(); // Use the context hook to access state and functions

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const tileWidthPercentage = 30;
  const tileHeightPercentage = 25;
  const spacing = 5;
  const tileWidth = ((screenWidth * tileWidthPercentage) / 100) - spacing;
  const tileHeight = ((screenHeight * tileHeightPercentage) / 100) - spacing;

  const handleTilePress = (item) => {
    navigation.navigate('Details', { palData: item });
  };

  // Filter the newly captured pals directly here
  const newlyCapturedPals = PalsProfilesStatsAndBreedings.filter((pal) =>
    capturedPals.includes(pal.key)
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <TopBar title="My Pals" navigation={navigation} theme={currentTheme} />
          <SearchableList
            data={newlyCapturedPals} // Use newlyCapturedPals here
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
                    capturedPals={capturedPals}
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
            emptyStateText="No captured Pals found."
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1, // Add this to allow the ScrollView to grow with content
  },
});

export default MyPalsView;
