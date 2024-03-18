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
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {register} from '../../../Redux/Auth/Auth';
import CustomHeader from '../../../constants/Headers';
import AuthTitleText from '../../../constants/AuthTitleText';
import Icon from 'react-native-remix-icon';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../context/ThemeProvidr';
import {Colors} from '../../../constants/Colors';

const RegisterScreen: React.FC = () => {
  const {isDarkModeEnabled, theme} = useTheme();
  const [formErrors, setFormErrors] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    email: '',
    first_name: '',
    last_name: '',
    company_name: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is required'),
    company_name: yup.string().required('Business Name is required'),
  });

  const navigation = useNavigation();

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const response = await dispatch(register(values));
      switch (response?.payload) {
        case 200:
          navigation.navigate('OTPConfirmationScreen', {email: values.email});
          break;
        case 400:
          setFormErrors('An account with this email already exists');
          break;
        default:
          setFormErrors('Network Error');
          break;
      }
    } catch (error) {
      console.log('Registration failed', error);
      setFormErrors('Registration failed. Please try again.');
    } finally {
      setLoading(false);
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
            text="Already have an Account?   Create an Account"
            title="Create Account"
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
                  onChangeText={text => {
                    handleChange('email')(text);
                    setFormErrors('');
                  }}
                  error={errors.email}
                  onBlur={handleBlur('email')}
                />
                <CustomTextInput
                  label="First Name"
                  placeholder="Enter your first name"
                  value={values.first_name}
                  onChangeText={text => {
                    handleChange('first_name')(text);
                    setFormErrors('');
                  }}
                  error={errors.first_name}
                  onBlur={handleBlur('first_name')}
                />
                <CustomTextInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={values.last_name}
                  onChangeText={text => {
                    handleChange('last_name')(text);
                    setFormErrors('');
                  }}
                  error={errors.last_name}
                  onBlur={handleBlur('last_name')}
                />
                <CustomTextInput
                  label="Business Name"
                  placeholder="Enter your business name"
                  value={values.company_name}
                  onChangeText={text => {
                    handleChange('company_name')(text);
                    setFormErrors('');
                  }}
                  error={errors.company_name}
                  onBlur={handleBlur('company_name')}
                />
                {formErrors ? (
                  <View style={{backgroundColor: '#Ff000014', padding: 12}}>
                    <Text style={{color: 'red'}}>{formErrors}</Text>
                  </View>
                ) : null}
                <View style={{width: '100%', marginVertical: 36}}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {backgroundColor: Colors.darkOrange},
                      loading && styles.disabledButton, // Apply disabledButton style when loading is true
                    ]}
                    onPress={() => handleSubmit()}
                    disabled={loading || isSubmitting} // Disable the button when loading or submitting
                  >
                    {loading ? ( // Render ActivityIndicator inside the button text when loading
                      <ActivityIndicator
                        style={styles.activityIndicator}
                        size="small"
                        color={Colors.white}
                      />
                    ) : (
                      <Text style={styles.buttonText}>Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>
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
    // paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 243,
    alignItems: 'center',
    marginVertical: 48,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
  activityIndicator: {
    //marginTop: 20,
  },
});

export default RegisterScreen;
