import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Formik, FormikProps} from 'formik';
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import CustomHeader from '../../../constants/Headers';
import {Dropdown} from 'react-native-element-dropdown';
import {useTheme} from '../../../context/ThemeProvidr';
import {Colors} from '../../../constants/Colors';

interface FormValues {
  name: string;
  email: string;
  nature_of_business: string;
  country: string;
  staffcount: string;
}

const UpdateOrg = () => {
  const {isDarkModeEnabled, theme} = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkModeEnabled ? theme.background : Colors.white},
      ]}>
      <CustomHeader />
      <ScrollView>
        <Text
          style={[
            styles.title,
            {color: !isDarkModeEnabled ? '#121212' : Colors.white},
          ]}>
          Update your Organisation
        </Text>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              nature_of_business: '',
              country: '',
              staffcount: '',
            }}
            validate={values => {
              const errors: Partial<FormValues> = {};
              if (!values.name) {
                errors.name = 'Please enter your Organization Name';
              }
              if (!values.email) {
                errors.email = 'Please enter your email';
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              if (!values.nature_of_business) {
                errors.nature_of_business = 'Please enter nature of business';
              }
              if (!values.country) {
                errors.country = 'Please select country';
              }
              if (!values.staffcount) {
                errors.staffcount = 'Please select staff count';
              }
              return errors;
            }}
            onSubmit={values => {
              // Handle submission here
              console.log(values);
            }}>
            {(props: FormikProps<FormValues>) => (
              <>
                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Organization Name
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                  placeholder="Enter your Organization Name"
                />
                <Text style={styles.error}>{props.errors.name}</Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Email
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
                <Text style={styles.error}>{props.errors.email}</Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Nature of Business
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('nature_of_business')}
                  onBlur={props.handleBlur('nature_of_business')}
                  value={props.values.nature_of_business}
                  placeholder="Enter nature of business"
                />
                <Text style={styles.error}>
                  {props.errors.nature_of_business}
                </Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Country
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      backgroundColor: isDarkModeEnabled
                        ? theme.background
                        : '#ffffff',
                      borderColor: isDarkModeEnabled ? '#80808075' : '#808080',
                    },
                  ]}
                  labelField="label"
                  valueField="value"
                  value={props.values.country}
                  placeholder="Select country"
                  data={[
                    {value: 'Nigeria', label: 'Nigeria'},
                    {value: 'Ghana', label: 'Ghana'},
                  ]}
                  onChange={value =>
                    props.handleChange('country')(value?.value)
                  }
                />
                <Text style={styles.error}>{props.errors.country}</Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Staff Count
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      backgroundColor: isDarkModeEnabled
                        ? theme.background
                        : '#ffffff',
                      borderColor: isDarkModeEnabled ? '#80808075' : '#808080',
                    },
                  ]}
                  labelField="label"
                  valueField="value"
                  value={props.values.staffcount}
                  placeholder="Select staff count"
                  data={[
                    {value: '0-9', label: '0-9'},
                    {value: '10-49', label: '10-49'},
                    {value: '50-99', label: '50-99'},
                    {value: '100-499', label: '100-499'},
                    {value: '500 and above', label: '500 and above'},
                  ]}
                  onChange={value =>
                    props.handleChange('staffcount')(value?.value)
                  }
                />
                <Text style={styles.error}>{props.errors.staffcount}</Text>

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
                    !props.values.name ||
                    !props.values.email ||
                    !props.values.nature_of_business ||
                    !props.values.country ||
                    !props.values.staffcount
                  }>
                  <Text style={styles.buttonText}>Update Profile</Text>
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
  title: {
    fontFamily: 'Plus Jakarta Sans SemiBold',
    fontSize: 16,
    padding: 12,
  },
  formContainer: {
    padding: 12,
    marginTop: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: -32,
    marginTop: 24,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  error: {
    color: 'red',
    marginBottom: 16,
    fontFamily: 'Plus Jakarta Sans Regular',
    marginTop: -18,
  },
  dropdown: {
    marginTop: 44,
    borderColor: '#80808075',
    borderWidth: 0.5,
    padding: 12,
    borderRadius: 5,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UpdateOrg;
