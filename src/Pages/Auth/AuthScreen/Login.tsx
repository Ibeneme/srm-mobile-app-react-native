import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../Redux/Store';
import {login} from '../../../Redux/Auth/Auth';
import {Colors} from '../../../constants/Colors';
import CustomHeader from '../../../constants/Headers';
import AuthTitleText from '../../../constants/AuthTitleText';
import Icon from 'react-native-remix-icon';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../context/ThemeProvidr';
import {useFocusEffect} from '@react-navigation/native';

interface FormData {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState<string>('');
  const [reload, SetReload] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user.access_token);

  useEffect(() => {
    if (reload) {
      navigation.navigate('Main' as never);
      console.log('User:', user);
    }
  }, [reload, user]);

  const initialValues: FormData = {
    email: '',
    password: '',
  };

  console.log('UserUserUser:', user);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();

      // Cleanup function
      return () => {
        // Perform any cleanup if needed
      };
    }, [dispatch]), // Dependency array with dispatch as a dependency
  );

  // Log the user state
  console.log('User:', user);

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const navigation = useNavigation();
  const handleLogin = (
    values: FormData,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void},
  ) => {
    dispatch(login(values))
      .then(response => {
        console.log('Registration successful', response);
        console.log('User:', user);
        switch (response?.payload?.status) {
          case 200:
            SetReload(true);
            break;
          case 422:
            setFormErrors('Please fill your email and password correctly');
            break;
          case 401:
            setFormErrors('Your email or password is incorrect.');
            break;
          default:
            setFormErrors('Network Error');
            break;
        }
      })
      .catch(error => {
        console.log('Registration failed', error);
        setFormErrors('Network Error');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  const {isDarkModeEnabled, theme} = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
        },
      ]}>
      <CustomHeader />
      <ScrollView>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <AuthTitleText
            text={`Don't have an Account?  Create an Account`}
            title="Login Existing Account"
            icon={<Icon name="user-fill" size={20} color={Colors.white} />}
            marginTop={24}
            onPress={() => navigation.navigate('RegisterScreen' as never)}
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isSubmitting,
            }) => (
              <View style={{width: '100%', padding: 16}}>
                <CustomTextInput
                  label="Email Address"
                  placeholder="Enter your email address"
                  value={values.email}
                  onChangeText={text => {
                    handleChange('email')(text);
                    setFormErrors('');
                  }}
                  error={errors.email}
                  onBlur={handleBlur('email')}
                />

                <CustomTextInput
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={text => {
                    handleChange('password')(text);
                    setFormErrors('');
                  }}
                  error={errors.password}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />

                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={
                    () => navigation.navigate('ForgotPasswordScreen' as never)
                    //         navigation.navigate('ForgotPasswordScreen' as never)
                  }>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                <View style={{width: '100%', alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                      <View style={{width: '100%', justifyContent: 'center'}}>
                        <ActivityIndicator color="#fff" size="small" />
                      </View>
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Submit</Text>

                        <Icon
                          name="arrow-right-s-line"
                          size={24}
                          color={`#fff`} // Corrected color assignment
                        />
                      </>
                    )}
                  </TouchableOpacity>
                </View>

                {formErrors ? (
                  <View
                    style={{
                      backgroundColor: '#Ff000014',
                      marginVertical: 24,
                      padding: 12,
                    }}>
                    <Text style={styles.errorText}>{formErrors}</Text>
                  </View>
                ) : null}
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: Colors.darkOrange,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  button: {
    backgroundColor: Colors.darkOrange,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 243,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 170,
    marginTop: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default LoginScreen;
