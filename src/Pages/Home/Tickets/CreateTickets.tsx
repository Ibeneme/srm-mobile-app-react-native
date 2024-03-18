import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Modal,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import {Dropdown} from 'react-native-element-dropdown';
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import CustomHeader from '../../../constants/Headers';
import {Colors} from '../../../constants/Colors';
import {useTheme} from '../../../context/ThemeProvidr';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {getAllUsers} from '../../../Redux/Profile/Profile';
import {createTicket} from '../../../Redux/Tickets/Tickets';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';

interface FormValues {
  name: string;
  title: string;
  description: string;
  email: string;
  sla_category: string;
  priority: string;
  //assigned_to: string;
}

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

// const usersData: UserData[] = [
//   {
//     id: '0c156053-176a-491d-bd3b-5e3f77a400c3',
//     first_name: 'Alpha',
//     last_name: 'Dev',
//   },
//   {
//     id: 'd5a9a48a-b0a0-45aa-a29b-aac7caf46668',
//     first_name: 'Ibeneme',
//     last_name: 'Ikenna',
//   },
//   {
//     id: 'b9dacb1c-6385-4652-92cb-b70df4ecba38',
//     first_name: 'Unyime',
//     last_name: 'Etim',
//   },
//   {
//     id: '73606e12-6017-459b-ab22-6aea99a87d03',
//     first_name: 'Ibeneme',
//     last_name: 'Ikenna',
//   },
//   {
//     id: '7be0b8ff-1afb-43cb-ae60-8407f8f0050d',
//     first_name: 'Yeah Payload',
//     last_name: 'payload',
//   },
// ];

const FormComponent: React.FC = () => {
  const [usersData, setUsers] = useState<UserData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    dispatch(getAllUsers())
      .then(response => {
        setUsers(response?.payload);
        console.log(response?.payload, 'response?.payload');
      })
      .catch(error => {});
  };

  const {isDarkModeEnabled, theme} = useTheme();
  const [selectedUserDisplay, setSelectedUserDisplay] = useState<string | null>(
    null,
  );
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [err, setErr] = useState('');
  const handleAssign = (
    selectedUserData: {label: string; value: string} | null,
  ) => {
    setErr(' ');
    if (selectedUserData) {
      console.log('Selected User ID:', selectedUserData.value);
      setSelectedUserId(selectedUserData.label);
      setSelectedUserDisplay(selectedUserData.value);
    } else {
      setSelectedUserId(null);
      setErr('Please assign this ticket to a user');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
      }}>
      <CustomHeader />
      <ScrollView>
        <Formik
          initialValues={{
            name: '',
            title: '',
            description: '',
            email: '',
            sla_category: '',
            priority: '',
            //assigned_to: selectedUserId || '', // Set the initial value of assigned_to
          }}
          validate={(values: FormValues) => {
            const errors: Partial<FormValues> = {};
            if (!values?.name) {
              errors.name = 'Stakeholders Name is Required';
            }
            if (!values?.title) {
              errors.title = 'Ticket Title is Required';
            }
            if (!values?.description) {
              errors.description = 'Ticket Description is Required';
            }
            if (!values?.email) {
              errors.email = 'Stakeholders Email address is Required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values?.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values?.sla_category) {
              errors.sla_category = 'SLA catagory is Required';
            }
            if (!values?.priority) {
              errors.priority = 'Ticket Priority is Required';
            }

            return errors;
          }}
          onSubmit={(values: FormValues) => {
            setLoading(true); // Set loading to true when submitting
            const updatedValues = {...values, handler_id: selectedUserDisplay};
            console.log(updatedValues, 'updatedValues');
            if (selectedUserId === null) {
              setErr('Pls Assign this Ticket to someone');
              setLoading(false);
            } else {
              dispatch(createTicket(updatedValues))
                .then(response => {
                  console.log(
                    'Tickets fetched successfully:',
                    response?.payload,
                  );
                  if (response?.payload === 201) {
                    setShowModal(true);
                  }
                  setLoading(false);
                })
                .catch(error => {
                  setLoading(false); // Set loading to false if there's an error
                });
            }
          }}>
          {({handleChange, handleSubmit, values, errors}) => (
            <View style={[styles.formContainer, {paddingBottom: 64}]}>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontSize: 18,
                  color: !isDarkModeEnabled ? '#121212' : Colors.white,
                }}>
                Create a Ticket
              </Text>
              <CustomTextInput
                label="Stakeholder's Name"
                onChangeText={handleChange('name')}
                //onBlur={handleBlur('name')}
                value={values?.name}
                error={errors.name}
                placeholder="Enter Stakeholder's Name"
              />
              <CustomTextInput
                label="Stakeholder's Email"
                onChangeText={handleChange('email')}
                //onBlur={handleBlur('email')}
                value={values?.email}
                error={errors.email}
                placeholder="Enter Stakeholders Email Address"
              />
              <CustomTextInput
                label="Ticket Title"
                onChangeText={handleChange('title')}
                //onBlur={handleBlur('title')}
                value={values?.title}
                error={errors.title}
                placeholder="Enter Ticket Title"
              />
              <CustomTextInput
                label="Ticket Description"
                onChangeText={handleChange('description')}
                //onBlur={handleBlur('description')}
                value={values?.description}
                error={errors.description}
                placeholder="Enter Ticket Description"
                multiline
                //height={150}
              />
              <Text
                style={{
                  marginTop: 24,
                  fontSize: 14,
                  fontFamily: 'Plus Jakarta Sans SemiBold',

                  color: !isDarkModeEnabled ? '#121212' : Colors.white,
                }}>
                Choose an SLA Category
              </Text>
              <Dropdown
                style={[
                  styles.input,
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
                value={values?.sla_category}
                maxHeight={800}
                placeholder="SLA Category"
                data={[
                  {value: 'standard', label: 'Standard'},
                  {value: 'medium', label: 'Medium'},
                  {value: 'complex', label: 'Complex'},
                ]}
                onChange={value => handleChange('sla_category')(value?.value)}
              />
              <Text
                style={{
                  color: Colors?.darkOrange,
                  fontSize: 14,
                  fontFamily: 'Plus Jakarta Sans SemiBold',

                  marginBottom: 44,
                  marginTop: -40,
                }}>
                {errors.sla_category}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Plus Jakarta Sans SemiBold',

                  color: !isDarkModeEnabled ? '#121212' : Colors.white,
                }}>
                Choose an Priority
              </Text>

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
                        {color: isDarkModeEnabled ? '#ffffff' : '#121212'},
                      ]}>
                      Ticket Created Successfully
                    </Text>
                    <Text
                      style={[
                        styles.subtitle,
                        {color: isDarkModeEnabled ? '#ffffff95' : '#121212'},
                      ]}>
                      Your Ticket has been created.
                    </Text>
                    <TouchableOpacity
                      style={[styles.button, {width: '100%'}]}
                      onPress={() => {
                        setShowModal(false);
                        navigation.navigate('Tickets' as never);
                      }}>
                      <Text style={[styles.buttonText]}>
                        Proceed to Tickets
                      </Text>
                      <Icon name="arrow-right-s-line" size={24} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Dropdown
                style={[
                  styles.input,
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
                value={values?.priority}
                maxHeight={800}
                placeholder="Priority"
                data={[
                  {value: 'high', label: 'High'},
                  {value: 'medium', label: 'Medium'},
                  {value: 'low', label: 'Low'},
                ]}
                onChange={value => handleChange('priority')(value?.value)}
              />
              <Text
                style={{
                  color: Colors?.darkOrange,
                  fontSize: 14,
                  fontFamily: 'Plus Jakarta Sans SemiBold',

                  marginBottom: 44,
                  marginTop: -40,
                }}>
                {errors.priority}
              </Text>

              <Text
                style={{
                  color: !isDarkModeEnabled ? '#121212' : Colors.white,
                }}>
                Assign Ticket to
              </Text>
              <View>
                <Dropdown
                  style={[
                    styles.input,
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
                  data={usersData?.map(user => ({
                    label: `${user?.first_name} ${user?.last_name}`,
                    value: user?.id,
                  }))}
                  placeholder="Select User"
                  onChange={(
                    selectedUserData: {
                      label: string;
                      value: string;
                    } | null,
                  ) => handleAssign(selectedUserData)}
                  labelField="label"
                  valueField="value"
                  value={selectedUserDisplay}
                />
              </View>

              {err ? (
                <Text
                  style={{
                    color: Colors?.darkOrange,
                    fontSize: 14,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    marginBottom: 44,
                    marginTop: -40,
                  }}>
                  {err}
                </Text>
              ) : null}

              <Pressable
                onPress={() => handleSubmit()}
                style={{
                  backgroundColor: Colors.darkOrange,
                  padding: 18,
                  borderRadius: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {loading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <Text
                    style={{
                      color: '#Fff',
                      fontFamily: 'Plus Jakarta Sans SemiBold',
                      fontSize: 14,
                    }}>
                    {' '}
                    Create Ticket{' '}
                  </Text>
                )}
              </Pressable>

              <View style={{marginTop: 120}}></View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 44,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    minHeight: 50,
    borderColor: '#80808075',
    marginTop: 10,
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

export default FormComponent;
