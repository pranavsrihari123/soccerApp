import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const InputProfile1Screen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleContinue = () => {
    // Reset previous errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    // Validate inputs
    let isValid = true;
    if (!username.trim()) {
      setUsernameError('Username is invalid');
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError('Email is invalid');
      isValid = false;
    }
    if (!password.trim() || password.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    // If all inputs are valid, navigate to the next screen
    if (isValid) {
      navigation.navigate('InputProfile2Screen', { username, email, password });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.largeText}>Welcome</Text>
        <Text style={styles.smallText}>Let's create your account</Text>

        <TextInput
          style={[styles.input, usernameError && styles.error]}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

        <TextInput
          style={[styles.input, emailError && styles.error]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={[styles.input, passwordError && styles.error]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <Button title="Continue" onPress={handleContinue} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  largeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  smallText: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default InputProfile1Screen;
