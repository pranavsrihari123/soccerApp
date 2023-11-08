import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
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
        {/* You can add more comments here if needed */}
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
});

export default HomeScreen;
