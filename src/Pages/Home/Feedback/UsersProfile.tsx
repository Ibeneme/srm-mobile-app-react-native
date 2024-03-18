import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import CustomHeader from '../../../constants/Headers';
import {Colors} from '../../../constants/Colors';
import CustomerInfo from '../../../components/Flatlists/RandomColor';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useTheme} from '../../../context/ThemeProvidr';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {deleteStaff} from '../../../Redux/Profile/Profile';
import {getUsersTickets} from '../../../Redux/Tickets/Tickets';
import {Ticket} from '../../Types/Ticket';
import Notification from '../../../components/Flatlists/TicketNotification';
import {formatTimestamp} from '../../../components/Flatlists/formatTime';

const ProfileDetailsUsers = () => {
  const {fontScale} = useWindowDimensions();
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme} = useTheme();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  // Extracting user data from the route params
  const {user} = route.params;
  const [tickets, setTickets] = useState<Ticket[]>([]);
  console.log(user, 'lll');
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteConfirm = () => {
    setLoading(true);
    dispatch(deleteStaff(user.id))
      .then(response => {
        setLoading(false);
        console.log('Departments fetched successfully:', response?.payload);
        if (response.payload === 200) {
          navigation.navigate('Users' as never);
          setModalVisible(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });

    //setModalVisible(false); // Close modal
  };

  const handleGetDepts = () => {
    dispatch(getUsersTickets({user_id: user.id}))
      .then(response => {
        console.log('tickes:', response?.payload);
        setTickets(response?.payload);
        setModalVisible(false);
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
      style={{
        flex: 1,
        backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
      }}>
      <CustomHeader />
      <ScrollView
        style={{
          backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
        }}>
        <View
          style={{
            margin: 12,
            borderRadius: 24,
            backgroundColor: isDarkModeEnabled
              ? theme.background
              : Colors.white,
            // padding: 16,
            paddingVertical: 32,
          }}>
          <View
            style={{
              alignItems: 'center',
              gap: 12,
            }}>
            <CustomerInfo
              firstName={user?.first_name?.split(' ')[0]}
              lastName={user?.last_name?.split(' ')[0]}
            />
          </View>

          <View style={{marginVertical: 48}}>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Regular',
                color: !isDarkModeEnabled ? '#121212' : Colors.white,
              }}>
              Name
            </Text>
            <Text
              style={{
                marginTop: 6,
                marginBottom: 32,
                fontFamily: 'Plus Jakarta Sans SemiBold',
                color: isDarkModeEnabled ? '#fff' : '#121212',
              }}>
              {user?.first_name} {user?.last_name}
            </Text>

            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Regular',
                color: '#808080',
              }}>
              Email Address
            </Text>
            <Text
              style={{
                marginTop: 6,
                marginBottom: 32,
                fontFamily: 'Plus Jakarta Sans SemiBold',
                color: isDarkModeEnabled ? '#fff' : '#121212',
              }}>
              {user.email}
            </Text>

            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans Regular',
                color: '#808080',
              }}>
              Date Created
            </Text>
            <Text
              style={{
                marginTop: 6,
                marginBottom: 32,
                fontFamily: 'Plus Jakarta Sans SemiBold',
                color: isDarkModeEnabled ? '#fff' : '#121212',
              }}>
              {new Date(user.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 32,
            }}>
            <View
              style={{
                backgroundColor: '#ff6b0025',
                padding: 16,
                borderRadius: 63,
                marginBottom: 32,
                marginTop: -64,
                width: 200,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors?.darkOrange,
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 14 * fontScale,
                }}>
                Permission:{' '}
                {user?.permission_type.charAt(0).toUpperCase() +
                  user?.permission_type.slice(1)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              borderColor: '#ff6b00',
              borderWidth: 1,
              padding: 16,
              marginTop: -32,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ff6b00',
            }}
            onPress={() => setModalVisible(true)}>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontSize: 14,
                color: '#fff',
              }}>
              Delete User
            </Text>
          </TouchableOpacity>
          {user.email_verified === 'False' ? (
            <TouchableOpacity
              style={{
                borderColor: '#ff6b00',
                borderWidth: 1,
                padding: 16,
                marginTop: 16,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                //backgroundColor: '#ff6b00',
              }}
              
              onPress={ () => {
                console.log('resned');
              }}>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  fontSize: 14,
                  color: '#ff6b00',
                }}>
                Resend Token
              </Text>
            </TouchableOpacity>
          ) : null}

          {tickets?.length !== 0 ? (
            <View>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Bold',
                  color: '#808080',
                  marginTop: 48,
                  fontSize: 14,
                }}>
                Tickets Assigned to {user?.first_name} {user?.last_name}
              </Text>
              {tickets.map((ticketItem, index) => (
                <View key={index}>
                  {/* Assuming Notification is a component */}
                  <Notification
                    onPress={() =>
                      navigation.navigate('TicketSpecificScreen', {
                        ticketId: ticketItem?.id as string,
                      })
                    }
                    senderName={ticketItem?.title}
                    message={formatTimestamp(ticketItem?.created_at)}
                  />
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View
              style={[
                styles.modalView,
                {
                  backgroundColor: isDarkModeEnabled
                    ? theme.background
                    : '#fff',
                  borderColor: Colors?.darkOrange,
                  borderWidth: 1,
                  paddingVertical: 32,
                  margin: 24,
                },
              ]}>
              <Text
                style={[
                  {
                    fontSize: 18 * fontScale,

                    color: isDarkModeEnabled ? '#fff' : '#121212',
                    fontFamily: 'Plus Jakarta Sans Bold',
                    textAlign: 'center',
                  },
                ]}>
                <Text style={{color: Colors.darkOrange}}>
                  {' '}
                  {user?.first_name} {user?.last_name}{' '}
                </Text>
                will be Deleted
              </Text>
              <Text
                style={[
                  styles.modalText,
                  {
                    fontSize: 14,
                    color: isDarkModeEnabled ? '#fff' : '#121212',
                    fontFamily: 'Plus Jakarta Sans Regular',
                    marginVertical: 10,
                  },
                ]}>
                Are you sure you want to Delete this User?
              </Text>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[
                    {
                      backgroundColor: '#ff6b00',
                      padding: 12,
                      height: 55,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '50%',
                      borderRadius: 12,
                    },
                  ]}
                  onPress={handleDeleteConfirm}>
                  <Text
                    style={[
                      styles.buttonText,
                      {fontFamily: 'Plus Jakarta Sans Regular'},
                    ]}>
                    {loading ? <ActivityIndicator color="#fff" /> : 'Proceed'}
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    {
                      borderColor: '#ff6b00',
                      borderWidth: 1,
                      padding: 12,
                      height: 55,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '50%',
                      borderRadius: 12,
                    },
                  ]}
                  onPress={() => setModalVisible(false)}>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: '#ff6b00',
                        fontFamily: 'Plus Jakarta Sans Regular',
                      },
                    ]}>
                    Cancel
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileDetailsUsers;
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
