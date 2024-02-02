import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, RefreshControl, ActivityIndicator, ScrollView } from 'react-native';
import PalTile from '../components/PalTile';
import TopBar from '../components/TopBar';
import PalsProfilesStatsAndBreedings from '../assets/data/PalsProfilesStatsAndBreedings';
import SearchableList from '../components/SearchableList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext';
import GradientBackground from '../components/GradientBackground';

const MyPalsView = ({ navigation }) => {
  const { currentTheme } = useTheme();
  const [capturedPals, setCapturedPals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

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

  const toggleCapture = (palKey) => {
    let updatedCapturedPals;

    if (capturedPals.includes(palKey)) {
      updatedCapturedPals = capturedPals.filter((key) => key !== palKey);
    } else {
      updatedCapturedPals = [...capturedPals, palKey];
    }

    setCapturedPals(updatedCapturedPals);
    storeData(STORAGE_KEY, updatedCapturedPals);
  };

  const STORAGE_KEY = 'capturedPals';

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error retrieving data:', error);
      return [];
    }
  };

  const loadData = () => {
    getData(STORAGE_KEY)
      .then((storedCapturedPals) => {
        if (storedCapturedPals !== null) {
          setCapturedPals(storedCapturedPals);
        }
        setIsLoading(false);
        setRefreshing(false); // Stop the refresh indicator
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setIsLoading(false);
        setRefreshing(false); // Stop the refresh indicator in case of error
      });
  };

  useEffect(() => {
    loadData();
  }, []); // Initial data load when the component mounts

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Perform your data refresh logic here
    loadData(); // Reload the data
  }, []);

  // Render a loading indicator while data is loading
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={currentTheme.primaryColor} />
      </View>
    );
  }

  // Filter the PalsProfilesStatsAndBreedings data to display only captured pals
  const capturedPalsData = PalsProfilesStatsAndBreedings.filter((pal) =>
    capturedPals.includes(pal.key)
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <TopBar title="My Pals" navigation={navigation} theme={currentTheme} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <SearchableList
              data={capturedPalsData}
              key={refreshing ? 'refreshing' : 'not_refreshing'} // Add a unique key to force re-render when refreshing
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
              emptyStateText="No captured Pals found."
            />
          </ScrollView>
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
