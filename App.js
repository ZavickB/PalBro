import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainView from './views/MainView';
import PalDetailedView from './views/PalDetailedView';
import { ThemeProvider } from './components/ThemeContext';
import MyPalsView from './views/MyPalsView';
import BreedersSearchView from './views/BreedersSearchView';
import BreedingOptionsView from './views/BreedingOptionsView';
import DropsView from './views/DropsView';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
          <Drawer.Screen name="Home" component={MainView} />
          <Drawer.Screen name="Details" component={PalDetailedView} options={{ drawerItemStyle: { display: "none" }} }/>
          <Drawer.Screen name="My Pals" component={MyPalsView} />
          <Drawer.Screen name="Breeders Search" component={BreedersSearchView} />
          <Drawer.Screen name="BreedingOptions" component={BreedingOptionsView} options={{ drawerItemStyle: { display: "none" }} }/>
          <Drawer.Screen name="Items" component={DropsView} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
