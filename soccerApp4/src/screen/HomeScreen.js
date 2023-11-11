import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
      </View>

      {/* Button to join as a free agent */}
      <TouchableOpacity style={styles.button} onPress={() => console.log("Join as a Free Agent clicked")}>
        <View style={styles.iconContainer}>
          <Icon name="person-add" style={styles.icon} />
        </View>
        <Text style={styles.buttonText}>Join as a Free Agent</Text>
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
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20, // Add some margin at the bottom of the search bar
    width: '100%', // Make the search bar occupy the whole width
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
    justifyContent: 'space-between', // Center the text and move icon to the right
    backgroundColor: 'transparent', // Colorless background
    padding: 0,
    borderRadius: 10,
    width: '100%', // Make the button occupy the whole width
    marginBottom: 10, // Decreased margin between buttons
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: '#000', // Icon color
    marginRight: 10,
  },
  buttonText: {
    color: '#000', // Text color
    fontSize: 16,
    fontWeight: 'bold', // Bold text
  },
});

export default HomeScreen;
