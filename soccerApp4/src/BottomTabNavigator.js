import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen';
import GameSearchScreen from './screen/GameSearchScreen';
import LeaderBoardScreen from './screen/LeaderBoardScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide headers for all screens in the BottomTabNavigator
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Games" component={GameSearchScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderBoardScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;