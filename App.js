import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import the createBottomTabNavigator
import MainView from './views/MainView';
import PalDetailedView from './views/PalDetailedView';
import { ThemeProvider } from './components/ThemeContext';
import MyPalsView from './views/MyPalsView';
import BreedersSearchView from './views/BreedersSearchView';
import BreedingOptionsView from './views/BreedingOptionsView';
import DropsView from './views/DropsView';
import MyPossibleBreedingsView from './views/MyPossibleBreedingsView';
import GradientBackground from './components/GradientBackground';

const Tab = createBottomTabNavigator(); // Create a Tab Navigator

export default function App() {
  return (
    <ThemeProvider>
      <GradientBackground>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={MainView} />
            <Tab.Screen name="Details" component={PalDetailedView} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="My Pals" component={MyPalsView} />
            <Tab.Screen name="Breeders Search" component={BreedersSearchView} />
            <Tab.Screen name="BreedingOptions" component={BreedingOptionsView} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="Drops" component={DropsView} />
            <Tab.Screen name="MyPossibleBreedingsView" component={MyPossibleBreedingsView} />
          </Tab.Navigator>
        </NavigationContainer>
      </GradientBackground>
    </ThemeProvider>
  );
}
