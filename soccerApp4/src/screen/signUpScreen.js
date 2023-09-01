import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      // Send data to backend
      const response = await axios.post('http://localhost:3000/signup', {
        username,
        password,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Home'); // Navigate to the home screen
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error); // Log the error object
      Alert.alert('Error', 'Different error, Something went wrong. Please try again.');
    }
  };

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
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignupScreen;