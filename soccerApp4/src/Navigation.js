import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './screen/firstScreen';
import LoginScreen from './screen/loginScreen';
import SignupScreen from './screen/signUpScreen';
import InputProfile1Screen from './screen/InputProfile1Screen';
import InputProfile2Screen from './screen/InputProfile2Screen';
import BottomTabNavigation from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InputProfile1"
          component={InputProfile1Screen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="InputProfile2Screen"
          component={InputProfile2Screen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          name="SportStar"
          component={CustomTabNavigation}
          options={{ headerShown: false }} // Hide the header for the BottomTabNavigation
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const CustomTabNavigation = ({ navigation }) => {
  return (
    <BottomTabNavigation />
  );
};

export default Navigation;
