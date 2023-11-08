import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screen/HomeScreen';
import GameSearchScreen from './screen/GameSearchScreen';
import LeaderBoardScreen from './screen/LeaderBoardScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide headers for all screens in the BottomTabNavigator
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Games"
        component={GameSearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="sports-soccer" size={size} color={color} /> // Use "sports-soccer" as the icon name
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderBoardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="leaderboard" size={size} color={color} /> // Use "leaderboard" as the icon name
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;