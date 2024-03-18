import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {Colors} from '../../../constants/Colors';
import CustomHeader from '../../../constants/Headers';
import Icon from 'react-native-remix-icon';
import {Formik} from 'formik';
import * as yup from 'yup';
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import {useRoute, useNavigation} from '@react-navigation/native';
import AuthTitleText from '../../../constants/AuthTitleText';
import {setPassword} from '../../../Redux/Auth/Auth';
import {useTheme} from '../../../context/ThemeProvidr'; // Assuming you have a ThemeProvider context

interface FormData {
  password: string;
  confirmPassword: string;
}

const PasswordConfirmationScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formErrors, setFormErrors] = useState<string>('');
  const route = useRoute();
  const navigation = useNavigation(); // Get navigation object
  const [showModal, setShowModal] = useState(false);
  const {otp} = route.params as {otp: string};
  console.log(otp);
  const initialValues: FormData = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must contain at least 8 characters, including uppercase, lowercase, and numbers',
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Use ThemeContext to access the current theme mode
  const {isDarkModeEnabled, theme} = useTheme();

  const handlePasswordConfirmation = (
    values: FormData,
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void},
  ) => {
    if (!otp) {
      setFormErrors('OTP parameter not found');
      return;
    } else {
      dispatch(setPassword({otp: otp, password: values.password}))
        .then(response => {
          console.log('Registration successful', response?.payload);
          switch (response?.payload) {
            case 200:
              console.log('success');
              setShowModal(true);
              // Navigate to success screen
              navigation.navigate('AccountSuccessScreen' as never); // Navigate to SuccessScreen
              break;
            case 400:
              setFormErrors('Network Error');
              break;
            case 422:
              setFormErrors('An Error Occurred');
              break;
            default:
              console.log(response?.payload, 'lo');
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
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkModeEnabled ? theme.background : Colors.white},
      ]}>
      <ScrollView>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <CustomHeader />

          <AuthTitleText
            text="Already have an Account?   Login"
            title="Create Password"
            icon={<Icon name="lock-fill" size={20} color={Colors.white} />}
            marginTop={24}
            onPress={() => navigation.navigate('LoginScreen' as never)}
          />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handlePasswordConfirmation}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isSubmitting,
            }) => (
              <View style={{width: '100%', padding: 16}}>
                <View
                  style={{
                    backgroundColor: isDarkModeEnabled
                      ? '#ff6b0012'
                      : '#ff6b0012', // Adjust color for dark mode
                    padding: 16,
                    borderColor: Colors?.darkOrange,
                    borderLeftWidth: 5,
                    marginVertical: 12,
                  }}>
                  <Text style={styles.hintText}>
                    Passwords must match and contain at least 8 characters,
                    including uppercase, lowercase, and numbers
                  </Text>
                </View>
                <CustomTextInput
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  error={errors.password}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                />

                <CustomTextInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  error={errors.confirmPassword}
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry
                />

                <View style={{width: '100%', alignItems: 'flex-end'}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}>
                    {isSubmitting ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Submit</Text>
                        <Icon
                          name="arrow-right-s-line"
                          size={24}
                          color="#fff"
                        />
                      </>
                    )}
                  </TouchableOpacity>
                </View>

                {formErrors ? (
                  <View
                    style={{
                      backgroundColor: isDarkModeEnabled
                        ? '#Ff000014'
                        : '#Ff000014', // Adjust color for dark mode
                      marginVertical: 24,
                      padding: 12,
                    }}>
                    <Text style={styles.errorText}>{formErrors}</Text>
                  </View>
                ) : null}
              </View>
            )}
          </Formik>

          <Modal
            visible={showModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowModal(false)}>
            <View
              style={[
                styles.modalContainer,
                {
                  backgroundColor: isDarkModeEnabled
                    ? '#12121212'
                    : '#12121285',
                },
              ]}>
              <View
                style={[
                  styles.modalContent,
                  {backgroundColor: !isDarkModeEnabled ? '#ffffff' : '#000000'},
                ]}>
                <Image
                  source={require('../../../../assets/images/Email.png')}
                  style={styles.image}
                />
                <Text
                  style={[
                    styles.title,
                    {color: isDarkModeEnabled ? '#ffffff' : '#121212'},
                  ]}>
                  Account Created Successful
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    {color: isDarkModeEnabled ? '#ffffff95' : '#121212'},
                  ]}>
                  Your account has been successfully created.
                </Text>
                <TouchableOpacity
                  style={[styles.button, {width: '100%'}]}
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate('LoginScreen' as never);
                  }}>
                  <Text style={[styles.buttonText]}>Proceed to Login</Text>
                  <Icon name="arrow-right-s-line" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
  hintText: {
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
  //   title: {
  //     color: 'white',
  //     fontSize: 14,
  //     fontFamily: 'Plus Jakarta Sans Bold',
  //   },
  errorText: {
    color: 'red',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
  subtitle: {
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default PasswordConfirmationScreen;
