import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../../constants/Colors';
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {forgotPassword} from '../../../Redux/Auth/Auth';
import CustomHeader from '../../../constants/Headers';
import AuthTitleText from '../../../constants/AuthTitleText';
import Icon from 'react-native-remix-icon';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../context/ThemeProvidr';

const ForgotPasswordScreen: React.FC = () => {
  const [formErrors, setFormErrors] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage loading
  const {isDarkModeEnabled, theme} = useTheme();

  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    email: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const navigation = useNavigation();

  const handleSubmit = async (values: any, {setSubmitting}: any) => {
    setIsLoading(true); // Start loading when submitting form
    try {
      const response = await dispatch(forgotPassword(values));
      switch (response?.payload) {
        case 200:
          navigation.navigate('ResetPasswordOTPConfirmationScreen', {
            email: values.email,
          });
          break;
        case 422:
          setFormErrors('Please enter a valid email address');
          break;
        case 401:
          setFormErrors('Your email or password is incorrect.');
          break;
        default:
          setFormErrors('Network Error');
          break;
      }
    } catch (error) {
      setFormErrors('Network Error');
      console.log('Forgot Password failed', error);
    } finally {
      setIsLoading(false); // Stop loading when submission is done
      setSubmitting(false);
    }
  };

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
            text="Already have an Account?   Login"
            title="Forgot Password"
            icon={<Icon name="user-fill" size={20} color={Colors.white} />}
            marginTop={24}
            onPress={() => navigation.navigate('LoginScreen' as never)}
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isSubmitting,
            }) => (
              <View style={{padding: 16}}>
                <CustomTextInput
                  label="Email Address"
                  placeholder="Enter your email address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                  onBlur={handleBlur('email')}
                  keyboardType="email-address"
                />

                {formErrors ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{formErrors}</Text>
                  </View>
                ) : null}
                {formSuccess ? (
                  <View style={styles.successContainer}>
                    <Text style={styles.successText}>{formSuccess}</Text>
                  </View>
                ) : null}

                {/* Conditionally render ActivityIndicator if loading */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  disabled={isSubmitting || isLoading}>
                  {isLoading ? (
                    <ActivityIndicator color={Colors.white} />
                  ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                  )}
                </TouchableOpacity>
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
    borderRadius: 243,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
  errorContainer: {
    backgroundColor: '#Ff000014',
    padding: 12,
    marginVertical: 24,
  },
  errorText: {
    color: 'red',
  },
  successContainer: {
    backgroundColor: '#00FF0014',
    padding: 12,
    marginVertical: 24,
  },
  successText: {
    color: 'green',
  },
});

export default ForgotPasswordScreen;
