import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

// Define the LoginScreen component
const LoginScreen = ({ navigation }) => {
  // State variables to hold the entered username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login process
  const handleLogin = async () => {
    try {
      // Send data to the backend for login verification
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      // Check if the login response status is 200 (successful)
      if (response.status === 200) {
        // Display a success message and navigate to the home screen
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Home'); // Navigate to the home screen
      } else {
        // Display an error message if the login was not successful
        Alert.alert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      // Display an error message if an error occurs during login
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // JSX code that defines the login screen UI
  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

// Export the LoginScreen component
export default LoginScreen;