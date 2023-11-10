import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './screen/firstScreen';
import LoginScreen from './screen/loginScreen';
import SignupScreen from './screen/signUpScreen';
import InputProfileScreen from './screen/InputProfile';
import BottomTabNavigation from './BottomTabNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Authentication">
        <Stack.Screen
          name="Authentication"
          component={FirstScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InputProfile"
          component={InputProfileScreen}
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
