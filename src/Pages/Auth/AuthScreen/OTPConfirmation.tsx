import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Colors} from '../../../constants/Colors';
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {otpVerification, resendOTP} from '../../../Redux/Auth/Auth';
import CustomHeader from '../../../constants/Headers';
import AuthTitleText from '../../../constants/AuthTitleText';
import Icon from 'react-native-remix-icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '../../../context/ThemeProvidr';

// Define the OTPConfirmationScreen component
const OTPConfirmationScreen: React.FC = () => {
  // Use ThemeContext to access the current theme mode
  const {isDarkModeEnabled, theme} = useTheme();

  // Define state variables and dispatch function
  const [formErrors, setFormErrors] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  // Define initial form values and validation schema
  const initialValues = {
    OTP: '',
  };

  const validationSchema = yup.object().shape({
    OTP: yup
      .string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('OTP is required'),
  });

  // Define handleSubmit function to handle form submission
  const handleSubmit = async (values: any, {setSubmitting}: any) => {
    try {
      const response = await dispatch(otpVerification({otp: values.OTP}));
      if (response?.payload === true) {
        const otp = values.OTP;
        navigation.navigate('PasswordConfirmationScreen', {otp: otp as number});
      } else {
        setFormErrors('Your token is either expired or invalid.');
      }
    } catch (error) {
      setFormErrors('Network Error');
      console.log('OTP Verification failed', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Get navigation object and route parameters
  const navigation = useNavigation();
  const route = useRoute();

  const {email} = route.params as {email: string};
  //const { email } = route.params as { email: string };

  // Define handleResendOTP function to handle OTP resend
  const handleResendOTP = async () => {
    try {
      const response = await dispatch(resendOTP({email: email}));
      switch (response?.payload) {
        case 200:
          setFormSuccess('A new OTP sent successfully');
          break;
        case 400:
          setFormErrors('An account with this email does not exist');
          break;
        default:
          setFormErrors('Network Error');
          break;
      }
    } catch (error) {
      setFormErrors('Network Error');
      console.log('Resend OTP failed', error);
    }
  };

  // Define handleChangeOTP function to handle OTP input change
  const handleChangeOTP = (handleChange: any) => (newValue: string) => {
    setFormSuccess('');
    setFormErrors('');
    handleChange('OTP')(newValue);
  };

  // Render the component UI
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkModeEnabled ? theme.background : Colors.white},
      ]}>
      {' '}
      <ScrollView>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <CustomHeader />
          <AuthTitleText
            text="Already have an Account?   Login"
            title="OTP Confirmation"
            icon={<Icon name="user-fill" size={20} color={Colors.white} />}
            marginTop={24}
            onPress={() => navigation.navigate('LoginScreen' as never)}
          />
          <Formik
            initialValues={{...initialValues, email}}
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
                  label="OTP"
                  placeholder="Enter OTP"
                  value={values.OTP}
                  onChangeText={handleChangeOTP(handleChange)}
                  error={errors.OTP}
                  onBlur={handleBlur('OTP')}
                  keyboardType="numeric"
                  // style={{ backgroundColor: isDarkModeEnabled ? Colors.darkGray : 'transparent' }} // Update style based on theme
                />

                {formErrors ? (
                  <View
                    style={{
                      backgroundColor: isDarkModeEnabled
                        ? '#Ff000014'
                        : '#Ff000014', // Change color for dark mode
                      padding: 12,
                      marginVertical: 24,
                    }}>
                    <Text style={{color: 'red'}}>{formErrors}</Text>
                  </View>
                ) : null}
                {formSuccess ? (
                  <View
                    style={{
                      backgroundColor: isDarkModeEnabled
                        ? '#00FF0014'
                        : '#00FF0014', // Change color for dark mode
                      padding: 12,
                      marginVertical: 24,
                    }}>
                    <Text style={{color: 'green'}}>{formSuccess}</Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => handleResendOTP()}>
                  <Text style={styles.forgotPasswordText}>Resend OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: isDarkModeEnabled
                        ? Colors.darkOrange
                        : Colors.darkOrange,
                    },
                  ]} // Change background color based on theme
                  onPress={handleSubmit}
                  disabled={isSubmitting}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>{' '}
      </ScrollView>
    </SafeAreaView>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
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
    paddingVertical: 16,
    borderRadius: 243,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
  otpText: {
    color: Colors.darkOrange,
    marginTop: 12,
    textAlign: 'center',
  },
});

// Export the OTPConfirmationScreen component
export default OTPConfirmationScreen;
