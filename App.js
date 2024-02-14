import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './views/MainView';
import PalDetailedView from './views/PalDetailedView';
import MyPalsView from './views/MyPalsView';
import BreedingCatalogView from './views/BreedingCatalogView';
import BreedingDetailsView from './views/BreedingDetailsView';
import DropsView from './views/DropsView';
import { ThemeProvider } from './components/contexts/ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CapturedPalsProvider } from './components/contexts/CapturedPalsContext';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AdvancedBreedingsView from './views/AdvancedBreedingsView';

enableScreens();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Main" component={MainView} screenOptions={{ headerShown: false }}/>
      <Stack.Screen name="PalsDetails" component={PalDetailedView} />
    </Stack.Navigator>
  );
}

function MyPalsStack() {
  return (
    <Stack.Navigator initialRouteName="MyPalsContainer" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="MyPalsContainer" component={MyPalsView} screenOptions={{ headerShown: false }}/>
      <Stack.Screen name="MyPalsDetails" component={PalDetailedView} />
    </Stack.Navigator>
  );
}

function BreedingStack() {
  return (
    <Stack.Navigator initialRouteName="BreedingCatalog" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BreedingCatalog" component={BreedingCatalogView} />
      <Stack.Screen name="BreedingDetailsView" component={BreedingDetailsView} />
      <Stack.Screen name="AdvancedBreedingsView" component={AdvancedBreedingsView} />
    </Stack.Navigator>
  );
}

export default function App() {

  // Uncomment this block before building the app
  //useEffect(() => {
  //  SplashScreen.hide();
  //}, []);
  
  return (
    <ThemeProvider>
      <CapturedPalsProvider>
          <NavigationContainer>
          <StatusBar translucent backgroundColor="transparent" style="auto"  />
            <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: "darkgray",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: [
                {
                  "display": "flex"
                },
                null
              ],
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'My Pals') {
                  iconName = focused ? 'paw' : 'paw-outline';
                } else if (route.name === 'Breedings') {
                  iconName = focused ? 'egg' : 'egg-outline';
                } else if (route.name === 'Drops') {
                  iconName = focused ? 'cube' : 'cube-outline';
                } 
                // Return the appropriate icon component
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={MainStack} />
            <Tab.Screen name="My Pals" component={MyPalsStack} />
            <Tab.Screen name="Breedings" component={BreedingStack} />
            <Tab.Screen name="Drops" component={DropsView} />
          </Tab.Navigator>
        </NavigationContainer>
      </CapturedPalsProvider>
    </ThemeProvider>
  );
}
