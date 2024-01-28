import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainView from './views/MainView';
import DetailedView from './views/DetailedView';
import * as Font from 'expo-font';

const Drawer = createDrawerNavigator();

export default function App() {
  return (

      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}} >
          <Drawer.Screen name="Main" component={MainView} />
          <Drawer.Screen name="Details" component={DetailedView} />
          {/* Add more routes as needed */}
        </Drawer.Navigator>
      </NavigationContainer>

  );
}
