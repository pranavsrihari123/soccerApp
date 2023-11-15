import AsyncStorage from '@react-native-async-storage/async-storage';
// or import { setGenericPassword, getGenericPassword } from 'react-native-keychain';
// or import SecureStorage from 'react-native-secure-storage';

const UUID_KEY = 'userUUID';

export const storeUUID = async (uuid) => {
  try {
    // Use the appropriate storage method based on your choice
    await AsyncStorage.setItem(UUID_KEY, uuid);
    // or await setGenericPassword(UUID_KEY, uuid);
    // or await SecureStorage.set(UUID_KEY, uuid);

    console.log('UUID stored successfully');
  } catch (error) {
    console.error('Error storing UUID:', error);
  }
};

export const getStoredUUID = async () => {

  try {
    // Use the appropriate retrieval method based on your choice
    const uuid = await AsyncStorage.getItem(UUID_KEY);
    // or const credentials = await getGenericPassword();
    // or const uuid = await SecureStorage.get(UUID_KEY);
    console.log(uuid);

    return uuid;
  } catch (error) {
    console.error('Error retrieving UUID:', error);
    return null;
  }
};
