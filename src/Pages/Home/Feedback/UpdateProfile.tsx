import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Formik, FormikProps} from 'formik';
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import CustomHeader from '../../../constants/Headers';
import {useTheme} from '../../../context/ThemeProvidr';
import {Colors} from '../../../constants/Colors';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {updatePersonalProfile} from '../../../Redux/Profile/Profile';

interface FormValues {
  first_name: string;
  last_name: string;
}

const UpdateProfilePage = () => {
  const {isDarkModeEnabled, theme} = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateProfile = async (values: FormValues) => {
    setIsLoading(true);
    setSuccess(' ');
    dispatch(updatePersonalProfile(values))
      .then(response => {
        console.log(response?.payload, 'pp');
        if (response?.payload === 200) {
          setSuccess('Profile Updated Successfully');
        }
        setIsLoading(false);
      })
      .catch(error => {
        setSuccess('An error occurred');
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkModeEnabled ? theme.background : Colors.white},
      ]}>
      <CustomHeader />
      <ScrollView>
        <Text
          style={{
            fontFamily: 'Plus Jakarta Sans SemiBold',
            fontSize: 16,
            padding: 12,
            color: !isDarkModeEnabled ? '#121212' : Colors.white,
          }}>
          Update your Profile
        </Text>
        <View style={{padding: 12, marginTop: 24}}>
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
            }}
            validate={values => {
              const errors: Partial<FormValues> = {};
              if (!values.first_name && !values.last_name) {
                errors.first_name = 'Please enter your first name';
                errors.last_name = 'Please enter your last name';
              }
              return errors;
            }}
            onSubmit={handleUpdateProfile}>
            {(props: FormikProps<FormValues>) => (
              <>
                <Text
                  style={[
                    styles.label,
                    {
                      color: !isDarkModeEnabled ? '#121212' : Colors.white,
                      marginTop: 12,
                    },
                  ]}>
                  First Name
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('first_name')}
                  onBlur={props.handleBlur('first_name')}
                  value={props.values.first_name}
                  placeholder="Enter your first name"
                />
                {/* <Text style={styles.error}>{props.errors.first_name}</Text> */}

                <Text
                  style={[
                    styles.label,
                    {
                      color: !isDarkModeEnabled ? '#121212' : Colors.white,
                      marginTop: 24,
                    },
                  ]}>
                  Last Name
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('last_name')}
                  onBlur={props.handleBlur('last_name')}
                  value={props.values.last_name}
                  placeholder="Enter your last name"
                />
                {/* <Text style={styles.error}>{props.errors.last_name}</Text> */}

                <Text
                  style={{
                    color: Colors.darkOrange,
                    fontSize: 14,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                  }}>
                  {success}
                </Text>
                <Pressable
                  onPress={() => props.handleSubmit()}
                  style={({pressed}) => [
                    styles.button,
                    {
                      opacity: pressed ? 0.5 : 1,
                      borderColor: '#ff6b00',
                      borderWidth: 1,
                      padding: 16,
                      marginTop: 32,
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ff6b00',
                    },
                  ]}
                  disabled={
                    !props.values.first_name && !props.values.last_name
                  }>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Update Profile</Text>
                  )}
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: -28,
    marginTop: -16,
  },
  error: {
    marginBottom: 48,
    marginTop: -18,
    fontFamily: 'Plus Jakarta Sans Regular',
    color: Colors.darkOrange,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 48,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default UpdateProfilePage;
