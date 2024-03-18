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
import {Dropdown} from 'react-native-element-dropdown';
import {updateTicket} from '../../../Redux/Tickets/Tickets';
import CustomTextInput from '../../../components/TextInputs/CustomInput';

// const department = {
//   name: 'Test',
//   description: 'lol',
//   id: '0b951235-e10c-4d0a-8785-7aa79ad23e40',
// };

const FormComponentEdit: React.FC = () => {
  const route = useRoute();
  const {ticketId} = route.params;
  // console.log(ticketId);
  const {isDarkModeEnabled, theme} = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(ticketId?.customer?.name);
  const [email, setEmail] = useState(ticketId?.customer?.email);
  const [description, setDescription] = useState(ticketId?.description);
  const [sla_category, setSLA] = useState(ticketId?.sla_category);
  const [priority, setPriority] = useState(ticketId?.priority);
  const [emailError, setEmailError] = useState('');
  const [valuesName, setValuesName] = useState('');

  const handleSubmit = () => {
    setLoading(true);
    setEmailError('');
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email is valid
    if (!emailPattern.test(email)) {
      setEmailError('Please use a Valid email, example -  example@gmail.com');
      setLoading(false);
      return;
    }

    const values = {
      name: name,
      email: email,
      description: description,
      sla_category: sla_category,
      priority: priority,
    };

    dispatch(updateTicket({updateTicket: values, ticket_id: ticketId?.id}))
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
              Ticket
              <Text style={{color: Colors.darkOrange}}> {valuesName}</Text>
              Edited Successfully
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: isDarkModeEnabled ? '#ffffff95' : '#121212',
                  textAlign: 'center',
                },
              ]}>
              Your ticket with ID {ticketId?.reference} has been Edited
              Successfully.
            </Text>
            <TouchableOpacity
              style={[styles.buttons, {width: '100%'}]}
              onPress={() => {
                setShowModal(false);
                navigation.navigate('TicketSpecificScreen', {
                  ticketId: ticketId?.id as string,
                });
              }}>
              <Text style={[styles.buttonTexts]}>Continue to Ticket</Text>
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
            Edit Ticket {ticketId?.title}
          </Text>

          <View>
            <Text
              style={[
                styles.label,
                {
                  color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                },
              ]}>
              Stakeholders Name
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
          </View>

          <View>
            <Text
              style={[
                styles.label,
                {
                  color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  //marginBottom: -24,
                },
              ]}>
              Stakeholders Email
            </Text>
            <TextInput
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              value={email}
              placeholder="Enter Department Name"
              style={[
                styles.input,
                {color: isDarkModeEnabled ? '#fff' : '#121212', height: 48},
              ]}
            />
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                color: Colors?.darkOrange,
                marginTop: -8,
              }}>
              {emailError}
            </Text>
          </View>
          <View>
            <Text
              style={{
                marginBottom: -40,
                marginTop: 32,
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
              onChange={value => setSLA(value?.value)}
              value={sla_category}
              maxHeight={800}
              placeholder="SLA Category"
              data={[
                {value: 'standard', label: 'Standard'},
                {value: 'medium', label: 'Medium'},
                {value: 'complex', label: 'Complex'},
              ]}
              //onChange={value => handleChange('sla_category')(value?.value)}
            />

            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Plus Jakarta Sans SemiBold',
                marginBottom: -40,
                marginTop: 32,
                color: !isDarkModeEnabled ? '#121212' : Colors.white,
              }}>
              Choose an Priority
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
              onChange={value => setPriority(value?.value)}
              value={priority}
              maxHeight={800}
              placeholder="Priority"
              data={[
                {value: 'high', label: 'High'},
                {value: 'medium', label: 'Medium'},
                {value: 'low', label: 'Low'},
              ]}
              //onChange={value => handleChange('priority')(value?.value)}
            />
          </View>
          <View>
            <Text
              style={[
                styles.label,
                {
                  color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                },
              ]}>
              Department Description
            </Text>
            <TextInput
              onChangeText={text => setDescription(text)}
              value={description}
              placeholder="Enter Department Description"
              multiline={true}
              textAlignVertical="top"
              style={[
                styles.input,
                {color: isDarkModeEnabled ? '#fff' : '#121212'},
              ]}
            />
          </View>

          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans SemiBold',
              color: Colors?.darkOrange,
              marginTop: 24,
            }}>
            {emailError}
          </Text>

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
    minHeight: 43,
    maxHeight: 200,
    marginTop: 50,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default FormComponentEdit;
