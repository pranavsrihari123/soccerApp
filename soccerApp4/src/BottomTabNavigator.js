import React from 'react';
//import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/HomeScreen';
import GameSearchScreen from './screen/GameSearchScreen';
import LeaderBoardScreen from './screen/LeaderBoardScreen';
import CalendarScreen from './screen/Calendar';
import TeamScreen from './screen/Teams';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
//const Stack = createStackNavigator();

const BottomTabNavigation = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Games"
        component={GameSearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="sports-soccer" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderBoardScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="leaderboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-view-week" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Team"
        component={TeamScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="groups" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator id='Drawer' screenOptions={{ headerShown: true, headerTitle: 'SportStar' }}>
        <Drawer.Screen
          name="SportStar"
          component={BottomTabNavigation}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Icon
                name="account-circle"
                size={30}
                style={{ marginLeft: 10 }}
                onPress={() => navigation.openDrawer()} // Open the drawer on click
              />
            ),
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
