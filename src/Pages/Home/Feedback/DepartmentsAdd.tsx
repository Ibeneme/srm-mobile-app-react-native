import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Formik, FormikProps} from 'formik';
import CustomTextInput from '../../../components/TextInputs/CustomInput';
import CustomHeader from '../../../constants/Headers';
import {useTheme} from '../../../context/ThemeProvidr';
import {Colors} from '../../../constants/Colors';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {createDepartment} from '../../../Redux/Profile/Profile';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';

interface FormValues {
  name: string;
  description: string;
}

const DepartmentAdd: React.FC = () => {
  const {isDarkModeEnabled, theme} = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [valuesName, setValuesName] = useState('');

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkModeEnabled ? theme.background : Colors.white},
      ]}>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: isDarkModeEnabled ? '#ffffff25' : '#12121285',
            },
          ]}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: !isDarkModeEnabled ? '#ffffff' : '#000000',
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
              Department{' '}
              <Text style={{color: Colors.darkOrange}}> {valuesName}</Text>{' '}
              Created Successfully
            </Text>
            <Text
              style={[
                styles.subtitle,
                {color: isDarkModeEnabled ? '#ffffff95' : '#121212'},
              ]}>
              Your Department has been created.
            </Text>
            <TouchableOpacity
              style={[styles.buttons, {width: '100%'}]}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('Department' as never);
              }}>
              <Text style={[styles.buttonTexts]}>Continue to Departments</Text>
              <Icon name="arrow-right-s-line" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CustomHeader />
      <ScrollView>
        <View style={{padding: 12}}>
          <Formik
            initialValues={{
              name: '',
              description: '',
            }}
            validate={values => {
              const errors: Partial<FormValues> = {};
              if (!values.name) {
                errors.name = 'Department name is required';
              }
              if (!values.description) {
                errors.description = 'Department description is required';
              }
              return errors;
            }}
            onSubmit={values => {
              // Handle submission here
              console.log(values);
              setLoading(true);
              setValuesName(values.name);
              dispatch(createDepartment(values))
                .then(response => {
                  setLoading(false);
                  console.log(
                    'Tickets fetched successfully:',
                    response?.payload,
                  );
                  if (response?.payload === 200) {
                    setShowModal(true);
                    setLoading(false);
                  }
                  setLoading(false);
                })
                .catch(error => {
                  setLoading(false); // Set loading to false if there's an error
                });
            }}>
            {(props: FormikProps<FormValues>) => (
              <>
                <Text
                  style={[
                    {
                      color: !isDarkModeEnabled ? '#121212' : Colors.white,
                      fontSize: 18,
                      marginVertical: 24,
                      fontFamily: 'Plus Jakarta Sans Bold',
                    },
                  ]}>
                  Create a Department
                </Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Department Name
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  value={props.values.name}
                  placeholder="Enter Department Name"
                />
                <Text style={styles.error}>{props.errors.name}</Text>

                <Text
                  style={[
                    styles.label,
                    {color: !isDarkModeEnabled ? '#121212' : Colors.white},
                  ]}>
                  Department Description
                </Text>
                <CustomTextInput
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                  value={props.values.description}
                  placeholder="Enter Department Description"
                  style={{minHeight: 50}}
                />
                <Text style={styles.error}>{props.errors.description}</Text>

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
                  disabled={!props.values.name || !props.values.description}>
                  <Text style={styles.buttonText}>
                    {loading ? <ActivityIndicator color="#fff" /> : 'Submit'}{' '}
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
    color: Colors.darkOrange,
    marginBottom: 16,
    fontFamily: 'Plus Jakarta Sans Regular',
    marginTop: -18,
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

export default DepartmentAdd;
