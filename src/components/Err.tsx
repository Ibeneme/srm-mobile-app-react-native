import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-remix-icon';
import NetInfo from '@react-native-community/netinfo';

interface ErrorComponentProps {
  // Define props here if any
}

const ErrorComponent: React.FC<ErrorComponentProps> = () => {
  const [network, setNetwork] = useState(false);

  const checkInternetConnectivity = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setNetwork(true);
      } else {
        setNetwork(false);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setNetwork(true);
      } else {
        setNetwork(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleReload = () => {
    checkInternetConnectivity();
  };

  return (
    <>
      {network && (
        <View style={styles.container}>
          <View style={styles.errorBox}>
            <ActivityIndicator color="#fff" />
            <Icon name="signal-wifi-error-fill" size={24} color="#fff" />
            <Text style={styles.errorText}>No Internet</Text>
            <TouchableOpacity onPress={handleReload}>
              <Text>Reload</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  errorBox: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 48,
    flexDirection: 'row',
    gap: 12,
  },
  errorText: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});

export default ErrorComponent;
