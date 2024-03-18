import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Modal,
} from 'react-native';
import CustomHeader from '../../../constants/Headers';
import {Colors} from '../../../constants/Colors';
import Icon from 'react-native-remix-icon';
import CustomerInfo from '../../../components/Flatlists/RandomColor';
import {useTheme} from '../../../context/ThemeProvidr';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Ticket} from '../../Types/Ticket';
import {AppDispatch} from '../../../Redux/Store';
import {useDispatch} from 'react-redux';
import {
  getTicketsByID,
  setHandler,
  updateTicket,
} from '../../../Redux/Tickets/Tickets';
import {UserData} from './CreateTickets';
import {getAllUsers, getProfile} from '../../../Redux/Profile/Profile';
import ErrorComponent from '../../../components/Err';
import LoadingComponent from '../../../components/Loading';

const TicketSpecificScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {fontScale} = useWindowDimensions();
  const {isDarkModeEnabled, theme} = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const {ticketId} = route.params;
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [ticketDetails, setTickets] = useState<Ticket[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [usersData, setUsers] = useState<UserData[]>([]);
  const [err, setErr] = useState('');
  const [dispatchErr, setDispatchErr] = useState(false);

  const [usersDataSingle, setUsersSingle] = useState<UserData[]>([]);
  useEffect(() => {
    fetchUsers();
    singleUser();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    setLoadingPage(true);
    setDispatchErr(false);
    dispatch(getAllUsers())
      .then(response => {
        setUsers(response?.payload);
        setLoading(false);
        setLoadingPage(false);
        // console.log(response?.payload, 'response?.payload');
      })
      .catch(error => {
        setLoading(false);
        setDispatchErr(true);
        setLoadingPage(false);
      });
  };

  const singleUser = () => {
    setLoading(true);
    setDispatchErr(false);
    setLoadingPage(true);
    dispatch(getProfile())
      .then(response => {
        setLoading(false);
        setLoadingPage(false);
        setUsersSingle(response?.payload);
        //console.log(response?.payload, 'responeeese?.payload');
      })
      .catch(error => {
        setLoading(false);
        setDispatchErr(true);
        setLoadingPage(false);
      });
  };

  const handlePress = () => {
    setLoading(true);
    setDispatchErr(false);
    dispatch(setHandler({user_id: selectedUserId, ticket_id: ticketId}))
      .then(response => {
        handleGetTickets();
        setLoading(false);
        setShowModal(false);
        ////console.log('Dispatch successful:', response);
      })
      .catch(error => {
        setLoading(false);
        setDispatchErr(true);
        setErr('An erro Occurred');
        //console.error('Dispatch error:', error);
      });
  };

  const handleGetTickets = () => {
    setDispatchErr(false);
    dispatch(getTicketsByID({ticket_id: ticketId}))
      .then(response => {
        console.log('Tickets fetched successfully:', response?.payload);
        setTickets(response?.payload);
      })
      .catch(error => {});
  };

  useEffect(() => {
    handleGetTickets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetTickets();
      singleUser();
    }, []),
  );

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleResolveTicket = async () => {
    setLoading(true);
    try {
      // console.log('Resolving ticket with ID:', ticketDetails?.id);

      dispatch(
        updateTicket({
          updateTicket: {
            status: 'resolved',
          },
          ticket_id: ticketDetails?.id,
        }),
      )
        .then(response => {
          setLoading(false);
          setModalVisible(false);
          switch (response?.payload) {
            case 200:
              setModalVisible(false);
              handleGetTickets();
              break;
            case 400:
              break;
            default:
              break;
          }
        })
        .catch(() => {
          setLoading(false);
          setModalVisible(false);
        })
        .finally(() => {
          setLoading(false);
          setModalVisible(false);
        });
    } catch (error) {
      setModalVisible(false);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    //console.log(userId, 'userId');
  };

  //console.log(usersDataSingle, 'usersDataSingle');
  console.log(loadingPage, 'loadingPage');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
      }}>
      <CustomHeader />
      {loadingPage ? (
        <LoadingComponent />
      ) : (
        <>
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
                      fontSize: 18,

                      color: isDarkModeEnabled ? '#fff' : '#121212',
                      fontFamily: 'Plus Jakarta Sans Bold',
                    },
                  ]}>
                  Resolve this ticket
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
                  Are you sure you want to Resolve this ticket
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
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
                    onPress={handleResolveTicket}>
                    <Text
                      style={[
                        styles.buttonText,
                        {fontFamily: 'Plus Jakarta Sans Regular'},
                      ]}>
                      Proceed
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
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
                    onPress={handleCancel}>
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
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

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
                    backgroundColor: !isDarkModeEnabled ? '#ffffff' : '#000000',
                  },
                ]}>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.darkOrange,
                    padding: 8,
                    borderRadius: 122,
                  }}
                  onPress={() => setShowModal(false)}>
                  <Icon name="close-line" size={14} color={Colors.white} />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.title,
                    {
                      color: isDarkModeEnabled ? '#ffffff' : '#121212',
                      marginTop: 32,
                    },
                  ]}>
                  Choose a User to re-assign tickets to
                </Text>
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color: isDarkModeEnabled ? '#ffffff95' : '#121212',
                      marginBottom: 48,
                    },
                  ]}>
                  Select a User to re-assign tickets to
                </Text>

                <ScrollView>
                  {usersData?.map(user => (
                    <TouchableOpacity
                      key={user?.id}
                      style={[
                        styles.userContainer,
                        {
                          backgroundColor:
                            selectedUserId !== user?.id
                              ? 'transparent'
                              : Colors.darkOrange,
                          borderColor:
                            selectedUserId !== user?.id
                              ? Colors.darkOrange
                              : 'transparent',
                          width: '100%',
                        },
                      ]}
                      onPress={() => handleSelectUser(user?.id)}>
                      <View style={{width: '85%'}}>
                        <Text
                          style={[
                            styles.userName,
                            {
                              fontSize: 14,
                              color:
                                selectedUserId === user?.id
                                  ? '#fff'
                                  : isDarkModeEnabled
                                  ? '#fff'
                                  : '#121212',
                              opacity: selectedUserId === user?.id ? 1 : 1,
                            },
                          ]}>
                          {user?.first_name} {user?.last_name}
                        </Text>
                        <Text
                          style={[
                            styles.subtitle,
                            {
                              fontSize: 12,
                              textAlign: 'left',
                              color:
                                selectedUserId === user?.id
                                  ? '#fff'
                                  : isDarkModeEnabled
                                  ? '#fff'
                                  : '#121212',
                              opacity: selectedUserId === user?.id ? 1 : 0.75,
                            },
                          ]}>
                          {user?.email}
                        </Text>
                      </View>
                      {selectedUserId === user?.id ? (
                        <View
                          style={{
                            backgroundColor: '#ffffff45',
                            padding: 8,
                            borderRadius: 25,
                          }}>
                          <Icon
                            name="check-line"
                            size={14}
                            color={Colors.white}
                          />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={[styles.buttonM, {width: '100%'}]}
                  onPress={handlePress}>
                  {loading ? (
                    <ActivityIndicator color={Colors.white} />
                  ) : (
                    <Text style={[styles.buttonText]}>Re-assign Ticket</Text>
                  )}
                  <Icon name="arrow-right-s-line" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <ScrollView
            style={{
              backgroundColor: isDarkModeEnabled ? theme.background : '#f4f4f4',
            }}>
            <View
              style={{
                margin: 12,
                borderRadius: 24,
                backgroundColor: isDarkModeEnabled
                  ? theme.background
                  : Colors.white,

                padding: 16,
                paddingVertical: 32,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                {ticketDetails.status !== 'resolved' &&
                  usersDataSingle !== 'support' && (
                    <View
                      style={{
                        backgroundColor: isDarkModeEnabled
                          ? theme.background
                          : Colors.white,
                        paddingVertical: 36,
                        width: '100%',
                        paddingTop: -48,
                      }}>
                      <Text
                        onPress={() =>
                          navigation.navigate('FormComponentEdit', {
                            ticketId: ticketDetails,
                          })
                        }
                        style={{
                          color: Colors?.darkOrange,
                          fontSize: 14,
                          fontFamily: 'Plus Jakarta Sans SemiBold',
                          textAlign: 'right',
                        }}>
                        Edit Ticket
                      </Text>
                    </View>
                  )}

                <View
                  style={{
                    backgroundColor: '#ff6b0025',
                    padding: 16,
                    borderRadius: 63,
                    marginBottom: 24,
                    width: 220,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: Colors?.darkOrange,
                      fontFamily: 'Plus Jakarta Sans',
                      fontSize: 14 * fontScale,
                    }}>
                    Ticket ID: {ticketDetails?.reference}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Bold',
                  fontSize: 18 * fontScale,
                  textAlign: 'center',
                  color: !isDarkModeEnabled ? '#121212' : Colors.white,
                }}>
                Ticket Title: {ticketDetails?.title}
              </Text>
              <View style={{marginVertical: 48}}>
                <Text
                  style={{
                    //   marginTop: 36,
                    fontFamily: 'Plus Jakarta Sans Regular',
                    color: '#808080',
                  }}>
                  Stakeholders Name
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    marginBottom: 32,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {ticketDetails?.customer?.name}
                </Text>

                <Text
                  style={{
                    //   marginTop: 36,
                    fontFamily: 'Plus Jakarta Sans Regular',
                    color: '#808080',
                  }}>
                  Stakeholders Email Address
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    marginBottom: 32,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {ticketDetails?.customer?.email}
                </Text>

                <Text
                  style={{
                    //   marginTop: 36,
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
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {new Date(ticketDetails?.created_at)?.toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    },
                  )}
                </Text>

                <Text
                  style={{
                    //   marginTop: 36,
                    fontFamily: 'Plus Jakarta Sans Regular',
                    color: '#808080',
                  }}>
                  SLA Category:
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    marginBottom: 32,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {ticketDetails?.sla_category?.charAt(0)?.toUpperCase() +
                    ticketDetails?.sla_category?.slice(1)?.toLowerCase()}
                </Text>
                <Text
                  style={{
                    //   marginTop: 36,
                    fontFamily: 'Plus Jakarta Sans Regular',
                    color: '#808080',
                  }}>
                  Status
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    marginBottom: 32,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {ticketDetails?.status?.charAt(0)?.toUpperCase() +
                    ticketDetails?.status?.slice(1)?.toLowerCase()}
                </Text>

                <Text
                  style={{
                    //   marginTop: 36,
                    fontFamily: 'Plus Jakarta Sans Regular',
                    color: '#808080',
                  }}>
                  Last Updated:
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    marginBottom: 32,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {new Date(ticketDetails?.updated_at).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    },
                  )}
                </Text>
                <Text
                  style={{
                    //   marginTop: 36,
                    fontFamily: 'Plus Jakarta Sans Regular',
                    color: '#808080',
                  }}>
                  Priority:
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    marginBottom: 32,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {ticketDetails?.priority?.charAt(0)?.toUpperCase() +
                    ticketDetails?.priority?.slice(1)?.toLowerCase()}
                </Text>

                <Text
                  style={{
                    //   marginTop: 36,
                    fontFamily: 'Plus Jakarta Sans Regular',
                    color: '#808080',
                  }}>
                  Description:
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    marginBottom: -36,
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    textAlign: 'left',
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {ticketDetails?.description}
                </Text>
              </View>
              {ticketDetails?.status !== 'resolved' &&
              usersDataSingle?.permission_type !== 'support' ? (
                <TouchableOpacity
                  style={{
                    borderColor: '#ff6b00',
                    borderWidth: 1,
                    padding: 16,
                    marginTop: 24,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ff6b00',
                    opacity: loading ? 0.5 : 1, // Disable button when loading
                  }}
                  onPress={() => setModalVisible(true)}
                  disabled={loading} // Disable button when loading
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" /> // Show activity indicator when loading
                  ) : (
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans SemiBold',
                        fontSize: 14,
                        color: '#fff',
                      }}>
                      Resolve Ticket
                    </Text>
                  )}
                </TouchableOpacity>
              ) : null}
            </View>

            <View
              style={{
                margin: 12,
                borderRadius: 24,
                backgroundColor: isDarkModeEnabled
                  ? theme.background
                  : Colors.white,
                padding: 16,
                paddingVertical: 24,
                marginTop: 0,
              }}>
              <Text
                style={{
                  marginTop: 20,
                  fontFamily: 'Plus Jakarta Sans Regular',
                  fontSize: 14 * fontScale,
                  color: '#808080',
                }}>
                Ticket Assigned to
              </Text>
              <View>
                <CustomerInfo
                  firstName={ticketDetails?.handler?.first_name?.split(' ')[0]}
                  lastName={ticketDetails?.handler?.last_name?.split(' ')[0]}
                />

                <Text
                  style={{
                    marginTop: 0,
                    fontFamily: 'Plus Jakarta Sans Bold',
                    fontSize: 16 * fontScale,
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {ticketDetails?.handler?.first_name}{' '}
                  {ticketDetails?.handler?.last_name}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontFamily: 'Plus Jakarta Sans Regular',
                    fontSize: 14 * fontScale,
                    color: '#808080',
                    marginBottom: 16,
                  }}>
                  {ticketDetails?.handler?.email}
                </Text>

                {ticketDetails?.status !== 'resolved' &&
                usersDataSingle?.permission_type !== 'support' ? (
                  <TouchableOpacity
                    style={{
                      borderColor: '#808080',
                      borderWidth: 1,
                      padding: 16,
                      marginTop: 24,
                      borderRadius: 12,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setShowModal(true)}>
                    <Text
                      style={{
                        fontFamily: 'Plus Jakarta Sans',
                        fontSize: 14,
                        color: !isDarkModeEnabled ? '#121212' : Colors.white,
                      }}>
                      Re-assign Ticket
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>

            <View
              style={{
                margin: 12,
                borderRadius: 24,
                backgroundColor: isDarkModeEnabled
                  ? theme.background
                  : Colors.white,
                padding: 16,
                paddingVertical: 24,
                marginTop: 0,
              }}>
              <Text
                style={{
                  marginTop: 20,
                  fontFamily: 'Plus Jakarta Sans Regular',
                  fontSize: 14 * fontScale,
                  color: '#808080',
                }}>
                Ticket Activity:
              </Text>
              {ticketDetails?.ticket_activity?.map(activity => (
                <View key={activity?.id}>
                  <Text
                    style={{
                      color: !isDarkModeEnabled ? '#121212' : Colors.white,
                      marginTop: 24,
                      fontFamily: 'Plus Jakarta Sans Bold',
                    }}>
                    Ticket{' '}
                    {activity?.type?.charAt(0)?.toUpperCase() +
                      activity?.type?.slice(1)?.toLowerCase()}
                  </Text>
                  <Text
                    style={{
                      marginTop: 6,
                      fontSize: 14,
                      color: '#808080',
                      fontFamily: 'Plus Jakarta Sans',
                    }}>
                    {activity?.text}
                  </Text>
                  <View
                    style={{
                      marginTop: 12,
                      backgroundColor: '#ff6b0025',
                      borderRadius: 32,
                      padding: 12,
                      paddingHorizontal: 24,
                      marginBottom: 12,
                      alignSelf: 'flex-start', // Adjusts width to fit content
                    }}>
                    <Text
                      style={{
                        color: '#ff6b00',
                        fontFamily: 'Plus Jakarta Sans',
                      }}>
                      {new Date(activity?.created_at)?.toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        },
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
      {dispatchErr ? <ErrorComponent /> : null}
    </SafeAreaView>
  );
};

export default TicketSpecificScreen;
const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.darkOrange,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonM: {
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
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
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
    maxHeight: '80%',
  },
});
