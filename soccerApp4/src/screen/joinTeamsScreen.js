import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Appbar, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';

const JoinTeams = () => {
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);
    const [selectedGender, setSelectedGender] = useState('All');
    const [selectedIntensity, setSelectedIntensity] = useState('All');
    const [selectedSport, setSelectedSport] = useState('All');
    const [menuVisible, setMenuVisible] = useState(false);
  
    // Added state variables to store last selected values
    const [lastSelectedGender, setLastSelectedGender] = useState('All');
    const [lastSelectedIntensity, setLastSelectedIntensity] = useState('All');
    const [lastSelectedSport, setLastSelectedSport] = useState('All');
  
    const navigation = useNavigation();
  
    useEffect(() => {
      const fetchTeams = async () => {
        try {
          const response = await axios.get('http://localhost:3000/team/teamList');
          console.log(response.data.teams);
          setTeams(response.data.teams);
          setFilteredTeams(response.data.teams); // Initialize filteredTeams with all teams
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      };
  
      fetchTeams();
    }, []);
  
    // Set initial values of pickers when the component mounts
    useEffect(() => {
      setSelectedGender(lastSelectedGender);
      setSelectedIntensity(lastSelectedIntensity);
      setSelectedSport(lastSelectedSport);
    }, [lastSelectedGender, lastSelectedIntensity, lastSelectedSport]);
  
    const handleTeamClick = (team) => {
      console.log('Clicked on team:', team);
    };
  
    const renderTeamItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleTeamClick(item)}>
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text>{item.team_name}</Text>
            <Text>Number of Players: {item.number_of_players}</Text>
            <Text>Max Number of Players: {item.max_number_of_players}</Text>
          </View>
          <View>
            <Text>{item.number_of_players}/{item.max_number_of_players}</Text>
            <Text>Team Rating: {item.team_rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  
    const filterTeams = () => {
      let filtered = teams;
  
      if (selectedGender !== 'All') {
        filtered = filtered.filter((team) => team.gender === selectedGender);
      }
  
      if (selectedIntensity !== 'All') {
        filtered = filtered.filter((team) => team.intensity === selectedIntensity);
      }
  
      if (selectedSport !== 'All') {
        filtered = filtered.filter((team) => team.type_of_sport === selectedSport);
      }
  
      setFilteredTeams(filtered);
    };
  
    useEffect(() => {
      filterTeams();
    }, [selectedGender, selectedIntensity, selectedSport]);
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('blur', () => {
        const drawerNavigator = navigation.getParent('Drawer');
        if (drawerNavigator) {
          drawerNavigator.setOptions({ headerShown: true });
        }
      });
  
      return unsubscribe;
    }, [navigation]);
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        const drawerNavigator = navigation.getParent('Drawer');
        if (drawerNavigator) {
          drawerNavigator.setOptions({ headerShown: false });
        }
      });
  
      return unsubscribe;
    }, [navigation]);
  
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
  
    return (
      <Provider>
        <View>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon={() => <Icon name="filter-list" size={24} />} onPress={openMenu} />}
          >
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Select Gender</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{ label: 'Select Gender', value: 'All' }}
                items={[
                  { label: 'Men', value: 'men' },
                  { label: 'Women', value: 'women' },
                  { label: 'Co-Ed', value: 'co-ed' },
                ]}
                onValueChange={(value) => {
                  setSelectedGender(value);
                  setLastSelectedGender(value);
                }}
                value={selectedGender} // Set the value to remember the last selection
              />
            </View>
            <Divider />
  
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Select Intensity</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{ label: 'Select Intensity', value: 'All' }}
                items={[
                  { label: 'Casual', value: 'casual' },
                  { label: 'Competitive', value: 'competitive' },
                ]}
                onValueChange={(value) => {
                  setSelectedIntensity(value);
                  setLastSelectedIntensity(value);
                }}
                value={selectedIntensity} // Set the value to remember the last selection
              />
            </View>
            <Divider />
  
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Select Sport</Text>
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{ label: 'Select Sport', value: 'All' }}
                items={[
                  { label: 'Basketball', value: 'basketball' },
                  { label: 'Soccer', value: 'soccer' },
                  { label: 'Football', value: 'football' },
                ]}
                onValueChange={(value) => {
                  setSelectedSport(value);
                  setLastSelectedSport(value);
                }}
                value={selectedSport} // Set the value to remember the last selection
              />
            </View>
            <Divider />
          </Menu>
          {/* Display filtered teams */}
          <FlatList
            data={filteredTeams}
            renderItem={renderTeamItem}
            keyExtractor={(item) => item.team_id.toString()}
          />
        </View>
      </Provider>
    );
  };
  
  const styles = StyleSheet.create({
    pickerContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    pickerLabel: {
      fontSize: 16,
      marginBottom: 8,
    },
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  
  export default JoinTeams;
  