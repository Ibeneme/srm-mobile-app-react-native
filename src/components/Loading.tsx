import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-remix-icon';
import { Colors } from '../constants/Colors';
interface LoadingComponentProps {
  // Define props here if any
}

const LoadingComponent: React.FC<LoadingComponentProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.errorBox}>
        <ActivityIndicator color="#fff" />
        <Text style={styles.errorText}>Loading...</Text>
      </View>
    </View>
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
    backgroundColor: Colors?.darkOrange,
    padding: 12,
    width: '1000%',
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

export default LoadingComponent;
