import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TeamChatsTab = () => (
  <View>
    <Text>Team Chats</Text>
    {/* Add your Team Chats content here */}
  </View>
);

const DMsTab = () => (
  <View>
    <Text>DMs</Text>
    {/* Add your DMs content here */}
  </View>
);

const Tab = createMaterialTopTabNavigator();

const TeamScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Team Chats" component={TeamChatsTab} />
      <Tab.Screen name="DMs" component={DMsTab} />
    </Tab.Navigator>
  );
};

export default TeamScreen;
