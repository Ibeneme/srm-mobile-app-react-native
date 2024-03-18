import { useEffect } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const useInternetConnectivity = () => {
  useEffect(() => {
    const checkInternetConnectivity = () => {
      NetInfo.fetch().then((state) => {
        if (!state.isConnected) {
          Alert.alert(
            "No Internet Connection",
            "Please connect to the internet."
          );
        }
      });
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please connect to the internet."
        );
      }
    });

    checkInternetConnectivity();

    return () => {
      unsubscribe();
    };
  }, []);
};

export default useInternetConnectivity;
