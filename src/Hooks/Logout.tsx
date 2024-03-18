import AsyncStorage from "@react-native-async-storage/async-storage";

// Define handleTokenClearing function with handleTokenCleared as an argument
export const handleTokenClearing = async (handleTokenCleared: () => void) => {
  try {
    // Clear token from AsyncStorage
    await AsyncStorage.removeItem('srm_access_token');

    // Call handleTokenCleared function passed as an argument
    handleTokenCleared();
  } catch (error) {
    console.error('Error clearing token:', error);
  }
};
