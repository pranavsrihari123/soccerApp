import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getStoredUUID } from '../uuidStorage';
import GroupChatScreen from './GroupChatScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TeamChatsTab = () => {
  const [teamsData, setTeamsData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Wait for getStoredUUID to return before continuing
        const userId = await getStoredUUID();
        console.log(userId);

        // Fetch teams data from the API using Axios
        const response = await axios.post('http://localhost:3000/user/getTeams', { userId });

        // Assuming the API returns an object with a 'teams' property
        console.log(response.data);
        setTeamsData(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
      }}
      onPress={() => {
        // Handle team item click
        console.log(`Team ${item.team_name} clicked`);
        // Navigate to the GroupChatScreen with the team name as a parameter
        navigation.navigate('GroupChat', { teamName: item.team_name });
      }}
    >
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
        {item.team_name}
      </Text>
      <Icon name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={teamsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.team_id}
      />
    </View>
  );
};

const DMsTab = () => (
  <View>
    <Text>DMs</Text>
    {/* Add your DMs content here */}
  </View>
);

const TeamChatsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TeamChats" component={TeamChatsTab} options={{ headerShown: false }}/>
      <Stack.Screen name="GroupChat" component={GroupChatScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const DMsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DMsTab" component={DMsTab} options={{ headerShown: false }}/>
      <Stack.Screen name="GroupChat" component={GroupChatScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const TeamScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Team Chats" component={TeamChatsStack} />
      <Tab.Screen name="DMs" component={DMsStack} />
    </Tab.Navigator>
  );
};

export default TeamScreen;
