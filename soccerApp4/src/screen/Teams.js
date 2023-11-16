import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getStoredUUID } from '../uuidStorage';
import GroupChatScreen from './GroupChatScreen';
import DMChatScreen from './DMChatScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TeamChatsTab = () => {
  const [teamsData, setTeamsData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getStoredUUID();
        const response = await axios.post('http://localhost:3000/user/getTeams', { userId });
        setTeamsData(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

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
        // Navigate to the GroupChatScreen with the team name as a parameter
        navigation.navigate('GroupChatStack', { teamName: item.team_name });
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

const DMsTab = () => {
  const [friendsData, setFriendsData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getStoredUUID();
        const response = await axios.post('http://localhost:3000/user/getFriends', { userId });
        setFriendsData(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

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
        // Navigate to the DMChatScreen with the friend name as a parameter
        navigation.navigate('DMChatStack', { chatName: `${item.first_name} ${item.last_name}` });
      }}
    >
      <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
        {`${item.first_name} ${item.last_name}`}
      </Text>
      <Icon name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={friendsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.user_id}
      />
    </View>
  );
};

const GroupChatStack = ({ route, navigation }) => {
  const { teamName } = route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GroupChat"
        component={GroupChatScreen}
        options={{
          title: teamName,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const DMChatStack = ({ route, navigation }) => {
  const { chatName } = route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DMChat"
        component={DMChatScreen}
        options={{
          title: chatName,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TeamChatsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TeamChats" component={TeamChatsTab} options={{ headerShown: false }} />
      <Stack.Screen name="GroupChat" component={GroupChatStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const DMsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DMsTab" component={DMsTab} options={{ headerShown: false }} />
      <Stack.Screen name="DMChatStack" component={DMChatStack} options={{ headerShown: false }} />
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
