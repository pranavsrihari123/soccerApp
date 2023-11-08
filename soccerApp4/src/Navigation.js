// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './screen/firstScreen';
import LoginScreen from './screen/loginScreen';
import SignupScreen from './screen/signUpScreen';
import InputProfileScreen from './screen/InputProfile';
import BottomTabNavigation from './BottomTabNavigator'; // Import the BottomTabNavigation component

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Authentication" component={FirstScreen} />
        <Stack.Screen name="InputProfile" component={InputProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="SportStar" component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;