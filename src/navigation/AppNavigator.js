import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';;

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import CountingActivityScreen from '../screens/CountingActivityScreen';
import ShapesActivityScreen from '../screens/ShapesActivityScreen';
import AdditionActivityScreen from '../screens/AdditionActivityScreen';
import MeasurementActivityScreen from '../screens/MeasurementActivityScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="MainMenu" component={MainMenuScreen} />
        <Stack.Screen name="CountingActivity" component={CountingActivityScreen} />
        <Stack.Screen name="ShapesActivity" component={ShapesActivityScreen} />
        <Stack.Screen name="AdditionActivity" component={AdditionActivityScreen} />
        <Stack.Screen name="MeasurementActivity" component={MeasurementActivityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

