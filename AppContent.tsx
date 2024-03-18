// AppContent.tsx
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './src/Redux/Store';
import { AuthStackNavigator, SignedInUserStackNavigator } from './src/Routing';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContent: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

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

  useEffect(() => {
    checkInternetConnectivity();
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please connect to the internet."
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('srm_access_token');
        setToken(storedToken);
      } catch (error) {}
    };

    getToken();
  }, []);

  return (
    <>
      {Array.isArray(user) && user.length === 0 ? (
        <AuthStackNavigator />
      ) : (
        <>
          {user && user.access_token ? (
            <SignedInUserStackNavigator />
          ) : (
            <AuthStackNavigator />
          )}
        </>
      )}
    </>
  );
};

export default AppContent;
