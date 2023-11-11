import React from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View>
      <Calendar
        // Add any calendar props as needed
        markedDates={{
          [getCurrentDate()]: { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
    </View>
  );
};

export default CalendarScreen;

// Helper function to get the current date in 'YYYY-MM-DD' format
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
