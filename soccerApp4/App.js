import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/Navigation';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    // Request location permission here
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) // For iOS
      .then((result) => {
        if (result === RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      })
      .catch((error) => {
        console.error('Error requesting location permission:', error);
      });
  }, []);

  return (
    <Navigation />
  );
}

export default App;
