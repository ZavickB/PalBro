import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainView from './views/MainView';
import DetailedView from './views/DetailedView';
import { ThemeProvider } from './components/ThemeContext';
import MyPalsView from './views/MyPalsView';
import BreedersSearchView from './views/BreedersSearchView';
import BreedingOptionsView from './views/BreedingOptionsView';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
          <Drawer.Screen name="Home" component={MainView} />
          <Drawer.Screen name="Details" component={DetailedView} />
          <Drawer.Screen name="My Pals" component={MyPalsView} />
          <Drawer.Screen name="Breeders Search" component={BreedersSearchView} />
          <Drawer.Screen name="BreedingOptions" component={BreedingOptionsView} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
