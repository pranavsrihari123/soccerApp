import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import { storeUUID } from '../uuidStorage';

const InputProfile2Screen = ({ route, navigation }) => {
  const { username, password, email } = route.params;
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [gender, setGender] = useState('male'); // Default value
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [skill_level, setSkillLevel] = useState('beginner'); // Default value

  const handleSignUp = async () => {
    // Calculate rating based on skill level
    const rating = skill_level === 'beginner' ? 1000 : skill_level === 'intermediate' ? 1200 : 1400;

    // Prepare data for the POST request
    const userData = {
      username,
      password,
      email,
      user_role: 'player',
      first_name,
      last_name,
      date_of_birth: selectedDate.toISOString().split('T')[0], // Format the date
      skill_level,
      rating,
      teamId: 0,
      gender,
    };

    console.log('userData:', userData);

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:3000/user/signup', userData);

      if (response.status === 201) {
        // If the request is successful, navigate to HomeScreen
        console.log(response);
        await storeUUID(response.data.user.user_id);
        navigation.navigate('SportStar');
      } else {
        // Handle other response statuses or errors
        console.error('Sign up failed:', response.data);
      }
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  const handleDateChange = (newDate) => {
    setShowDatePicker(false);
    setSelectedDate(newDate);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.largeText}>Almost done</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={first_name}
          onChangeText={(text) => setFirstName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={last_name}
          onChangeText={(text) => setLastName(text)}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableWithoutFeedback onPress={() => setGender('male')}>
            <View style={[styles.genderOption, gender === 'male' && styles.selectedGender]}>
              <Text>Male</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setGender('female')}>
            <View style={[styles.genderOption, gender === 'female' && styles.selectedGender]}>
              <Text>Female</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableWithoutFeedback onPress={() => setShowDatePicker(true)}>
          <View style={styles.datePickerContainer}>
            <Text>{selectedDate.toDateString()}</Text>
          </View>
        </TouchableWithoutFeedback>
        {showDatePicker && (
          <DatePicker
            date={selectedDate}
            onDateChange={handleDateChange}
            mode="date"
            textColor="#333" // Customize text color as needed
          />
        )}

        <Text style={styles.label}>Skill Level</Text>
        <View style={styles.skillLevelContainer}>
          <TouchableWithoutFeedback onPress={() => setSkillLevel('beginner')}>
            <View style={[styles.skillLevelOption, skill_level === 'beginner' && styles.selectedSkillLevel]}>
              <Text>Beginner</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSkillLevel('intermediate')}>
            <View style={[styles.skillLevelOption, skill_level === 'intermediate' && styles.selectedSkillLevel]}>
              <Text>Intermediate</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSkillLevel('advanced')}>
            <View style={[styles.skillLevelOption, skill_level === 'advanced' && styles.selectedSkillLevel]}>
              <Text>Advanced</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <Button title="Sign Up" onPress={handleSignUp} />
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
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  genderOption: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGender: {
    backgroundColor: 'lightblue',
  },
  datePickerContainer: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  skillLevelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skillLevelOption: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSkillLevel: {
    backgroundColor: 'lightblue',
  },
});

export default InputProfile2Screen;
