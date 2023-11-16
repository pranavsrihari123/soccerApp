import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import JoinTeams from './joinTeamsScreen';

const Stack = createStackNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="HomeContent">
      <Stack.Screen
        name="HomeContent"
        component={HomeScreenContent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TeamList"
        component={JoinTeams}
        options={{
          title: 'Available Teams',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('HomeContent')}
              style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
            >
              <Icon name="chevron-left" size={30} color="#000" />
              <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>
                Back
              </Text>
            </TouchableOpacity>
          ),
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeScreenContent = () => {
  const navigation = useNavigation();

  const handleJoinATeam = () => {
    // Navigate to the TeamList screen
    navigation.navigate('TeamList');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Search bar with logo and default text */}
      <View style={styles.searchBar}>
        {/* Search Icon */}
        <Icon name="search" style={styles.logo} />
        
        {/* Search input */}
        <TextInput
          style={styles.input}
          placeholder="Search for a team, game, member, etc." 
        />
      </View>

      {/* Button to join as a free agent */}
      <TouchableOpacity style={styles.button} onPress={handleJoinATeam}>
        <View style={styles.iconContainer}>
          <Icon name="person-add" style={styles.icon} />
        </View>
        <Text style={styles.buttonText}>Join a Team</Text>
        <View style={styles.iconContainer}>
          <Icon name="chevron-right" style={styles.icon} />
        </View>
      </TouchableOpacity>

      {/* Button to create a team */}
      <TouchableOpacity style={styles.button} onPress={() => console.log("Create a Team clicked")}>
        <View style={styles.iconContainer}>
          <Icon name="group-add" style={styles.icon} />
        </View>
        <Text style={styles.buttonText}>Create a Team</Text>
        <View style={styles.iconContainer}>
          <Icon name="chevron-right" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  logo: {
    fontSize: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#000',
    marginRight: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
