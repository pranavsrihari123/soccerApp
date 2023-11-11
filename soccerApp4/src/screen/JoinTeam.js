import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Mock data for teams
const mockTeams = [
  {
    team_id: 1,
    team_name: 'Team A',
    team_rating: 4.5,
    number_of_players: 5,
    max_number_of_players: 10,
    type_of_sport: 'basketball',
    intensity: 'competitive',
    gender: 'men',
  },
  {
    team_id: 2,
    team_name: 'Team B',
    team_rating: 3.8,
    number_of_players: 8,
    max_number_of_players: 15,
    type_of_sport: 'soccer',
    intensity: 'casual',
    gender: 'co-ed',
  },
  // Add more teams as needed
];

const TeamListScreen = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch teams from the database or API and update the state
    setTeams(mockTeams);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.teamItem}>
      <Text style={styles.teamName}>{item.team_name}</Text>
      <Text>Rating: {item.team_rating}</Text>
      <Text>Players: {item.number_of_players}/{item.max_number_of_players}</Text>
      <Text>Sport: {item.type_of_sport}</Text>
      <Text>Intensity: {item.intensity}</Text>
      <Text>Gender: {item.gender}</Text>
    </View>
  );

  return (
    <FlatList
      data={teams}
      renderItem={renderItem}
      keyExtractor={(item) => item.team_id.toString()}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  teamItem: {
    marginBottom: 16,
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 8,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TeamListScreen;
