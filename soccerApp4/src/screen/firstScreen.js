/* First sceen of app, shows logo and sign up/login options
*/


import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FirstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the SoccerApp</Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Log In"
          onPress={() => navigation.navigate('Login')}
          color="#007AFF" // Set button color
        />
        <View style={styles.separator} />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('InputProfile1')}
          color="#34C759" // Set button color
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF', // Set background color
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold', // Make the title bold
  },
  buttonsContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 10, // Add space between buttons
  },
});

export default FirstScreen;
