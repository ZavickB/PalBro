import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainView from './views/MainView';
import DetailedView from './views/DetailedView';
import { ThemeProvider } from './components/ThemeContext'; // Make sure the import path is correct

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
          <Drawer.Screen name="Home" component={MainView} />
          <Drawer.Screen name="Details" component={DetailedView} />
          {/* Add more routes as needed */}
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
