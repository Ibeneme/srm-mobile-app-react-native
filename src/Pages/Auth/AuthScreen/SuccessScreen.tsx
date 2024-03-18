import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../../../constants/Colors';
import Icon from 'react-native-remix-icon';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen: React.FC = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../../../assets/images/Email.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Password Reset Successful</Text>
        <Text style={styles.subtitle}>
          Your password has been successfully updated.
        </Text>

        <View style={{width: '100%', alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.button}
          onPress={()=>navigation.navigate('LoginScreen' as never)}>
            <>
              <Text style={styles.buttonText}>Proceed to Login</Text>
              <Icon name="arrow-right-s-line" size={24} color="#fff" />
            </>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: Colors.darkOrange,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 243,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 64,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans  Regular',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans SemiBold',
    color: Colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans Regular',
    color: Colors.darkGray,
    textAlign: 'center',
  },
});

export default SuccessScreen;
