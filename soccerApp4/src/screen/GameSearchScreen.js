import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const GameSearchScreen = () => {
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    // Fetch the current location of the device
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {initialRegion ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          showsUserLocation
        >
          <Marker coordinate={{ latitude: initialRegion.latitude, longitude: initialRegion.longitude }} />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default GameSearchScreen;
