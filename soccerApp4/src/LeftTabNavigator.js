import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const LeftTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="TabScreen1"
      tabBarPosition="left" // Position tabs on the left side
      tabBarOptions={{
        labelStyle: {
          fontSize: 16,
        },
        tabStyle: {
          width: 100, // Adjust tab width as needed
        },
        style: {
          backgroundColor: 'lightgray',
        },
      }}
    >
      <Tab.Screen name="TabScreen1" component={TabScreen1} />
      <Tab.Screen name="TabScreen2" component={TabScreen2} />
    </Tab.Navigator>
  );
};

export default LeftTabNavigator;