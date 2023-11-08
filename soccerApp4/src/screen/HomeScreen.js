import React from 'react';
import { View, Text, ScrollView, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
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
        
        {/* Search button */}
        <TouchableOpacity style={styles.searchButton}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    fontSize: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

export default HomeScreen;