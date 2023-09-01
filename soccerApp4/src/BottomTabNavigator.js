// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen'; // Import your HomeScreen component
import Screen1 from './screen/Screen1'; // Import other screen components
import Screen2 from './screen/Screen2';
//import Screen3 from './src/screen/Screen3';
//import Screen4 from './src/screen/Screen4';
//import Screen5 from './src/screen/Screen5';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;