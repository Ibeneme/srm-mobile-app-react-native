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
  TextInput,
} from 'react-native';
import CustomHeader from '../../../constants/Headers';
import {useTheme} from '../../../context/ThemeProvidr';
import {Colors} from '../../../constants/Colors';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {createDepartment, editDepartment} from '../../../Redux/Profile/Profile';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';

// const department = {
//   name: 'Test',
//   description: 'lol',
//   id: '0b951235-e10c-4d0a-8785-7aa79ad23e40',
// };

const DepartmentEdit: React.FC = () => {
  const route = useRoute();
  const {department} = route.params;
console.log(department)
  const {isDarkModeEnabled, theme} = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(department?.name);
  const [description, setDescription] = useState(department?.description);
  const [valuesName, setValuesName] = useState('');

  const handleSubmit = () => {
    setLoading(true);
    const values = {name, description};

    const payload = {
      editDepartment: {
        name: values?.name,
        description: values?.description,
      },
      department: department?.id,
    };

    dispatch(editDepartment(payload))
      .then(response => {
        setLoading(false);
        console.log('Tickets fetched successfully:', response?.payload);
        if (response?.payload === 200) {
          setShowModal(true);
        }
      })
      .catch(error => {
        setLoading(false); // Set loading to false if there's an error
      });
  };

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
              Department
              <Text style={{color: Colors.darkOrange}}> {valuesName}</Text>
              Edited Successfully
            </Text>
            <Text
              style={[
                styles.subtitle,
                {color: isDarkModeEnabled ? '#ffffff95' : '#121212'},
              ]}>
              Your Department has been Edited Successfully.
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
          <Text
            style={[
              {
                color: !isDarkModeEnabled ? '#121212' : Colors.white,
                fontSize: 18,
                marginVertical: 24,
                fontFamily: 'Plus Jakarta Sans Bold',
              },
            ]}>
            Edit Department {department?.name}
          </Text>

          <Text
            style={[
              styles.label,
              {color: !isDarkModeEnabled ? '#121212' : Colors.white},
            ]}>
            Department Name
          </Text>
          <TextInput
            onChangeText={text => setName(text)}
            value={name}
            placeholder="Enter Department Name"
            style={[
              styles.input,
              {color: isDarkModeEnabled ? '#fff' : '#121212'},
            ]}
          />

          <Text
            style={[
              styles.label,
              {color: !isDarkModeEnabled ? '#121212' : Colors.white},
            ]}>
            Department Description
          </Text>
          <TextInput
            onChangeText={text => setDescription(text)}
            value={description}
            placeholder="Enter Department Description"
            style={[
              styles.input,
              {color: isDarkModeEnabled ? '#fff' : '#121212'},
            ]}
          />

          <Pressable
            onPress={handleSubmit}
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
            disabled={!name || !description}>
            <Text style={styles.buttonText}>
              {loading ? <ActivityIndicator color="#fff" /> : 'Submit'}{' '}
            </Text>
          </Pressable>
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
    fontSize: 14,
    marginBottom: -36,
    marginTop: 24,
    fontFamily: 'Plus Jakarta Sans Regular',
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
  input: {
    borderColor: '#80808075',
    borderWidth: 1,
    borderRadius: 5,
    padding: 12,
    marginBottom: 12,
    minHeight: 50,
    marginTop: 50,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default DepartmentEdit;
