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
import {resendOTP, validateOTP} from '../../../Redux/Auth/Auth';
import CustomHeader from '../../../constants/Headers';
import AuthTitleText from '../../../constants/AuthTitleText';
import Icon from 'react-native-remix-icon';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '../../../context/ThemeProvidr'; // Update the path based on your actual context location

const ResetPasswordOTPConfirmationScreen: React.FC = () => {
  const [formErrors, setFormErrors] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [newErrors, setNewErrors] = useState<any>({});

  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    OTP: '',
  };

  const validationSchema = yup.object().shape({
    OTP: yup
      .string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('OTP is required'),
  });

  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params as {email: string};
  email;
  const {isDarkModeEnabled, theme} = useTheme(); // Accessing theme mode and colors

  const handleSubmit = async (values: any, {setSubmitting}: any) => {
    try {
      setLoading(true);
      setNewErrors(prevErrors => ({...prevErrors, OTP: ''}));
      const response = await dispatch(validateOTP({otp: values.OTP}));
      setLoading(false);
      console.log('sosos',response);
      switch (response?.payload) {
        case true:
          navigation.navigate('ResetPasswordScreen', {otp: values.OTP});
          break;
        default:
          setFormErrors('Your token is either expired or invalid.');
          break;
      }
    } catch (error) {
      setLoading(false);
      console.log('Registration failed', error);
    }
  };

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

  const handleChangeOTP = (handleChange: any) => (newValue: string) => {
    setFormSuccess('');
    setFormErrors('');
    handleChange('OTP')(newValue);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkModeEnabled ? theme.background : Colors.white},
      ]}>
          <CustomHeader />
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView>
        
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
                  error={newErrors.OTP || errors.OTP || formErrors}
                  onBlur={handleBlur('OTP')}
                  keyboardType="numeric"
                />

                {formSuccess ? (
                  <View style={styles.successContainer}>
                    <Text style={styles.successText}>{formSuccess}</Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={handleResendOTP}>
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
                  ]} // Update button background color
                  onPress={handleSubmit}
                  disabled={isSubmitting}>
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans SemiBold',
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

export default ResetPasswordOTPConfirmationScreen;
