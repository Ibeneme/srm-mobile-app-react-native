import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../constants/Colors';
import Icon from 'react-native-remix-icon';

const ScreenA = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('LoginScreen' as never);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/Team.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View
          style={{
           // backgroundColor: '#000',
            width: '100%',
            paddingVertical: 24,
            marginVertical: 32,
            borderRadius: 24,
            //paddingHorizontal: 8,
            // borderColor: '#ECFDFF45',
            // borderWidth: 6,
          }}>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Get Started with SRM</Text>
            <Text style={styles.loremText}>
              Our integrated Stakeholder Relationship Management - (SRM)
              solution is designed to streamline and enhance stakeholder
              interactions and experience.
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Get Started</Text>
            <Icon name="arrow-right-s-line" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000085',
    padding: 6,
  },
  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 16,
  },
  welcomeText: {
    fontFamily: 'Plus Jakarta Sans Bold',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  loremText: {
    fontFamily: 'Plus Jakarta Sans Regular',
    fontSize: 14,
    color: 'white',
  },
  button: {
    backgroundColor: Colors?.darkOrange,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 243,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 170,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
});

export default ScreenA;
