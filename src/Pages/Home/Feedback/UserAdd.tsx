import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  Modal,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Formik, FormikProps} from 'formik';
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import {Dropdown} from 'react-native-element-dropdown';
import CustomHeader from '../../../constants/Headers';
import {useTheme} from '../../../context/ThemeProvidr';
import {Colors} from '../../../constants/Colors';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import Department from './Departments';
import {createUser, getDepartments} from '../../../Redux/Profile/Profile';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  department_id: string;
  permission_type: string;
}

const NewUserForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [depts, setDepts] = useState<Department[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [err, setErr] = useState('');
  const [values, setValues] = useState([]);
  const {isDarkModeEnabled, theme} = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  const handleGetDepts = () => {
    dispatch(getDepartments())
      .then(response => {
        console.log('Departments fetched successfully:', response?.payload);
        setDepts(response?.payload);
      })
      .catch(error => {});
  };

  useEffect(() => {
    handleGetDepts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetDepts();
    }, []),
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkModeEnabled ? theme.background : Colors.white},
      ]}>
      <CustomHeader />
      <ScrollView>
        <View style={{padding: 12}}>
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              email: '',
              phone_number: '', // Added phone_number field
              department_id: '',
              permission_type: '',
            }}
            validate={values => {
              const errors: Partial<FormValues> = {};
              if (!values.first_name) {
                errors.first_name = 'First Name is required';
              }
              if (!values.last_name) {
                errors.last_name = 'Last Name is required';
              }
              if (!values.email) {
                errors.email = 'Email is required';
              } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              if (!values.phone_number) {
                errors.phone_number = 'Phone Number is required';
              }
              if (!values.department_id) {
                errors.department_id = 'Department is required';
              }
              if (!values.permission_type) {
                errors.permission_type = 'Permission Type is required';
              }
              return errors;
            }}
            onSubmit={values => {
              setLoading(true);
              setErr('');
              dispatch(createUser(values))
                .then(response => {
                  setLoading(false);
                  console.log(values, 'values');
                  setValues(values);
                  console.log('User created successfully:', response?.payload);
                  if (response?.payload === 200) {
                    setShowModal(true);
              
                  }
                  if (response?.payload === 400) {
                    setErr('Email Already in use');
                    //setShowModal(true);
                    // navigation.navigate('Users' as never);
                  }
                })
                .catch(error => {
                  setLoading(false);
                  console.error('Error creating user:', error);
                });
            }}>
            {(props: FormikProps<FormValues>) => (
              <>
                <Text style={styles.error}>{err}</Text>
                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  First Name
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('first_name')}
                  onBlur={props.handleBlur('first_name')}
                  value={props.values.first_name}
                  placeholder="Enter First Name"
                />
                <Text style={styles.error}>{props.errors.first_name}</Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Last Name
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('last_name')}
                  onBlur={props.handleBlur('last_name')}
                  value={props.values.last_name}
                  placeholder="Enter Last Name"
                />
                <Text style={styles.error}>{props.errors.last_name}</Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Email
                </Text>
                <CustomTextInput
                  onChangeText={text => {
                    props.handleChange('email')(text);
                    // Check for email validity and set error accordingly
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
                      setErr('Invalid email address');
                    } else {
                      setErr(''); // Clear the error if email is valid
                    }
                  }}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                  placeholder="Enter Email"
                />

                <Text style={styles.error}>{props.errors.email}</Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Phone Number
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('phone_number')}
                  onBlur={props.handleBlur('phone_number')}
                  value={props.values.phone_number}
                  placeholder="Enter Phone Number"
                />
                <Text style={styles.error}>{props.errors.phone_number}</Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Department
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      backgroundColor: isDarkModeEnabled
                        ? theme.background
                        : Colors.white,
                    },
                  ]}
                  selectedTextStyle={{
                    fontSize: 14,
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                    fontFamily: 'Plus Jakarta Sans Regular',
                  }}
                  itemTextStyle={{
                    fontSize: 14,
                    color: !isDarkModeEnabled ? '#121212' : '#808080',
                    fontFamily: 'Plus Jakarta Sans Regular',
                  }}
                  containerStyle={{
                    backgroundColor: isDarkModeEnabled
                      ? theme.background
                      : Colors.white,
                  }}
                  placeholderStyle={{
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}
                  labelField="label"
                  valueField="value"
                  value={props.values.department_id}
                  placeholder="Select Department"
                  data={depts.map(dept => ({
                    value: dept.id,
                    label: dept.name,
                  }))}
                  onChange={value =>
                    props.handleChange('department_id')(value?.value)
                  }
                />
                <Text style={styles.error}>{props.errors.department_id}</Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Permission Type
                </Text>
                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      backgroundColor: isDarkModeEnabled
                        ? theme.background
                        : Colors.white,
                    },
                  ]}
                  selectedTextStyle={{
                    fontSize: 14,
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                    fontFamily: 'Plus Jakarta Sans Regular',
                  }}
                  itemTextStyle={{
                    fontSize: 14,
                    color: !isDarkModeEnabled ? '#121212' : '#808080',
                    fontFamily: 'Plus Jakarta Sans Regular',
                  }}
                  containerStyle={{
                    backgroundColor: isDarkModeEnabled
                      ? theme.background
                      : Colors.white,
                  }}
                  placeholderStyle={{
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}
                  labelField="label"
                  valueField="value"
                  value={props.values.permission_type}
                  placeholder="Select Permission Type"
                  data={[
                    {value: 'support', label: 'Support'},
                    {value: 'manager', label: 'SE Manager'},
                    {value: 'executive', label: 'SE Executive'},
                  ]}
                  onChange={value =>
                    props.handleChange('permission_type')(value?.value)
                  }
                />
                <Text style={styles.error}>{props.errors.permission_type}</Text>

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
                          ? '#ffffff25'
                          : '#12121285',
                      },
                    ]}>
                    <View
                      style={[
                        styles.modalContent,
                        {
                          backgroundColor: !isDarkModeEnabled
                            ? '#ffffff'
                            : '#000000',
                        },
                      ]}>
                      <Image
                        source={require('../../../../assets/images/Email.png')}
                        style={styles.image}
                      />
                      <Text
                        style={[
                          styles.title,
                          {
                            color: isDarkModeEnabled ? '#ffffff' : '#121212',
                            textAlign: 'center',
                          },
                        ]}>
                        User{' '}
                        <Text style={{color: Colors.darkOrange}}>
                          {/* {values?.first_name} {values?.last_name}{' '} */}
                        </Text>
                        Created Successfully
                      </Text>
                      <Text
                        style={[
                          styles.subtitle,
                          {color: isDarkModeEnabled ? '#ffffff95' : '#121212'},
                        ]}>
                       New User have been created.
                      </Text>
                      <TouchableOpacity
                        style={[styles.buttons, {width: '100%'}]}
                        onPress={() => {
                          setShowModal(false);
                          navigation.navigate('Users' as never);
                        }}>
                        <Text style={[styles.buttonTexts]}>
                          Continue to All User
                        </Text>
                        <Icon
                          name="arrow-right-s-line"
                          size={24}
                          color="#fff"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>

                <Text style={styles.error}>{err}</Text>
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
                      marginBottom: 64,
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#ff6b00',
                    },
                  ]}
                  disabled={
                    !props.values.first_name ||
                    !props.values.last_name ||
                    !props.values.email ||
                    !props.values.phone_number ||
                    !props.values.department_id ||
                    !props.values.permission_type
                  }>
                  <Text style={styles.buttonText}>
                    {loading ? <ActivityIndicator color="#ff" /> : 'Submit'}
                  </Text>
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
    marginBottom: -32,
    marginTop: 24,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
  error: {
    color: Colors?.darkOrange,
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
  buttons: {
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
  buttonTexts: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
});

export default NewUserForm;
