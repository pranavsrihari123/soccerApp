// src/screen/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import BottomTabNavigation from '../BottomTabNavigation'; // Import the BottomTabNavigation component

const HomeScreen = () => {
    return (
      <View>
        <Text>Welcome to the Home Screen</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;