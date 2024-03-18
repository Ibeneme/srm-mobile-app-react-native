import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  TextInput,
} from 'react-native';
import CustomHeader from '../../../constants/Headers';
import {Colors} from '../../../constants/Colors';
import CustomerInfo from '../../../components/Flatlists/RandomColor';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../context/ThemeProvidr';
import Icon from 'react-native-remix-icon';
import {
  getOrganizationProfile,
  getProfile,
} from '../../../Redux/Profile/Profile';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import LoadingComponent from '../../../components/Loading';
import ErrorComponent from '../../../components/Err';
import {getUsersTickets} from '../../../Redux/Tickets/Tickets';
import {Ticket} from '../../Types/Ticket';
import Notification from '../../../components/Flatlists/TicketNotification';
import {formatTimestamp} from '../../../components/Flatlists/formatTime';
import FilterButton from '../Tickets/FilterButton';
import useUserPermission from '../Hook/useCheckPermssion';

type UserData = {
  id: string;
  created_at: string;
  updated_at: string;
  reference: string;
  name: string;
  email: string;
  department: string;
  permission: string;
};

type OrganizationData = {
  id: string;
  created_at: string;
  updated_at: string;
  reference: string;
  name: string;
  email: string;
  country: string;
  staffCount: string;
};

const ProfileDetailsYour = () => {
  const {fontScale} = useWindowDimensions();

  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState(false);
  const [data, setUser] = useState<UserData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [orgData, setOrg] = useState<UserData[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const handleGetTickets = () => {
    setLoading(true);
    setNetwork(false);
    dispatch(getProfile())
      .then(response => {
        setNetwork(false);
        if (response?.payload?.message === 'Network Error') {
          setLoading(true);
        } else if (response?.payload?.message) {
          setNetwork(true);
        } else {
          setLoading(false);
          console.log('Tickets fetched successfully:', response?.payload);
          setUser(response?.payload);

          dispatch(getUsersTickets({user_id: response?.payload?.id}))
            .then(response => {
              console.log('tickes:', response?.payload !== 500);
              setTickets(response?.payload);
              //setModalVisible(false);
            })
            .catch(error => {});
        }
      })
      .catch(error => {
        setLoading(false);
      });
    dispatch(getOrganizationProfile())
      .then(response => {
        console.log(response?.payload, 'hh');
        setNetwork(false);
        if (response?.payload?.message === 'Network Error') {
          setLoading(true);
        } else if (response?.payload?.message) {
          setNetwork(true);
        } else {
          console.log('Tickets fetched successfully:', response?.payload);
          setOrg(response?.payload);
          setLoading(false);
        }
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const handleGetDepts = () => {
    dispatch(getUsersTickets({user_id: data?.id}))
      .then(response => {
        console.log('tickes:', response?.payload !== 500);
        setTickets(response?.payload);
        //setModalVisible(false);
      })
      .catch(error => {});
  };
  const usersDataSingle = useUserPermission();

  useEffect(() => {
    setNetwork(false);
    handleGetTickets();
    handleGetDepts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetTickets();
      handleGetDepts();
    }, []),
  );

  const navigation = useNavigation();
  const {isDarkModeEnabled, theme} = useTheme();

  const [selectedFilter, setSelectedFilter] = useState<string>('All Tickets');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Function to render the appropriate number of Notification components based on the selected filter
  const renderNotifications = () => {
    let filteredTickets = tickets;

    if (searchQuery.trim() !== '') {
      filteredTickets = filteredTickets?.filter(ticket => {
        const customer = ticket?.customer;
        return (
          customer?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          customer?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
      });
    }

    switch (selectedFilter) {
      case 'All Tickets':
        return (
          <>
            {filteredTickets &&
              filteredTickets.length > 0 &&
              filteredTickets.map((ticket: Ticket) => (
                <Notification
                  onPress={() =>
                    navigation.navigate('TicketSpecificScreen', {
                      ticketId: ticket?.id as string,
                    })
                  }
                  key={ticket?.id}
                  senderName={
                    usersDataSingle === 'XXX'
                      ? `${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`
                      : ticket?.customer?.name
                  }
                  message={ticket?.description}
                />
              ))}
          </>
        );
      case 'Overdue tickets':
        return (
          <>
            {tickets
              ?.filter((ticket: Ticket) => ticket?.status === 'overdue') // Filter tickets with status 'overdue'
              .map((ticket: Ticket) => (
                <>
                  {usersDataSingle !== 'support' ? (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={`${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  ) : (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={ticket?.customer?.name} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  )}
                </>
              ))}

            {/* <Notification
                senderName="Ibeneme Ikenna"
                message="I Have OTP Resend Issues on Acadaboo"
              />
              <Notification
                senderName="Nengi Tams"
                message="I Have OTP Resend Issues on Acadaboo"
              />
              <Notification
                senderName="Jimoh Solomon"
                message="I Have OTP Resend Issues on Acadaboo"
              /> */}
          </>
        );

      case 'Due tickets':
        return (
          <>
            {tickets
              ?.filter((ticket: Ticket) => ticket?.status === 'due') // Filter tickets with status 'overdue'
              .map((ticket: Ticket) => (
                <>
                  {usersDataSingle !== 'support' ? (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={`${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  ) : (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={ticket?.customer?.name} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  )}
                </>
              ))}

            {/* <Notification
              senderName="Ibeneme Ikenna"
              message="I Have OTP Resend Issues on Acadaboo"
            />
            <Notification
              senderName="Nengi Tams"
              message="I Have OTP Resend Issues on Acadaboo"
            />
            <Notification
              senderName="Jimoh Solomon"
              message="I Have OTP Resend Issues on Acadaboo"
            /> */}
          </>
        );
      case 'Resolve tickets':
        return (
          <>
            {tickets
              ?.filter((ticket: Ticket) => ticket?.status === 'resolved') // Filter tickets with status 'overdue'
              .map((ticket: Ticket) => (
                <>
                  {usersDataSingle !== 'support' ? (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={`${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  ) : (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={ticket?.customer?.name} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  )}
                </>
              ))}
          </>
        );

      case 'Open tickets':
        return (
          <>
            {tickets
              ?.filter((ticket: Ticket) => ticket?.status === 'open') // Filter tickets with status 'overdue'
              .map((ticket: Ticket) => (
                <>
                  {usersDataSingle !== 'support' ? (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={`${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  ) : (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={ticket?.customer?.name} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  )}
                </>
              ))}
          </>
        );

      case 'High Prority tickets':
        return (
          <>
            {tickets
              ?.filter((ticket: Ticket) => ticket.priority === 'high') // Filter tickets with status 'overdue'
              .map((ticket: Ticket) => (
                <>
                  {usersDataSingle !== 'support' ? (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={`${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  ) : (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={ticket?.customer?.name} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  )}
                </>
              ))}
          </>
        );

      case 'Medium Prority tickets':
        return (
          <>
            {tickets
              ?.filter((ticket: Ticket) => ticket.priority === 'medium') // Filter tickets with status 'overdue'
              .map((ticket: Ticket) => (
                <>
                  {usersDataSingle !== 'support' ? (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={`${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  ) : (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={ticket?.customer?.name} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  )}
                </>
              ))}
          </>
        );

      case 'Low Prority tickets':
        return (
          <>
            {tickets
              ?.filter((ticket: Ticket) => ticket.priority === 'low') // Filter tickets with status 'overdue'
              .map((ticket: Ticket) => (
                <>
                  {usersDataSingle !== 'support' ? (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={`${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  ) : (
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticket?.id as string,
                        })
                      }
                      key={ticket?.id}
                      senderName={ticket?.customer?.name} // Concatenate first and last name
                      message={ticket?.description}
                    />
                  )}
                </>
              ))}
          </>
        );

      default:
        return null;
    }
  };
  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearchSubmit = () => {
    console.log('Search submitted');
  };
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 100); // Show scroll to top button if user scrolls down more than 100 pixels
  };

  // Function to scroll to top
  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
      }}>
      <CustomHeader />
      {loading ? (
        <LoadingComponent />
      ) : (
        <ScrollView
          style={{
            backgroundColor: isDarkModeEnabled ? theme.background : '#f4f4f4',
          }}>
          {/* <View
            style={{
              backgroundColor: isDarkModeEnabled
                ? theme.background
                : Colors.white,

              padding: 16,
              paddingVertical: 12,
            }}>
            <Text
              onPress={() => navigation.navigate('UpdateProfilePage' as never)}
              style={{
                color: Colors?.darkOrange,
                fontSize: 14,
                fontFamily: 'Plus Jakarta Sans SemiBold',
                textAlign: 'right',
              }}>
              Edit Profile
            </Text>
            <View
              style={{
                alignItems: 'center',
                gap: 12,
              }}>
              <CustomerInfo
                firstName={data?.first_name?.split(' ')[0]}
                lastName={data?.last_name?.split(' ')[0]}
              />
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
                  marginBottom: 24,
                  marginTop: 0,
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
                  {data?.permission_type?.charAt(0)?.toUpperCase() +
                    data?.permission_type?.slice(1)}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans Regular',
                  color: !isDarkModeEnabled ? '#121212' : '#ffffff75',
                }}>
                Name
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  marginBottom: 32,
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  color: !isDarkModeEnabled ? '#121212' : '#ffffff',
                }}>
                {data?.first_name}
                {''} {data?.last_name}
              </Text>

              <Text
                style={{
                  //   marginTop: 36,
                  fontFamily: 'Plus Jakarta Sans Regular',
                  color: !isDarkModeEnabled ? '#121212' : '#ffffff75',
                }}>
                Email Address
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  marginBottom: 32,
                  fontFamily: 'Plus Jakarta Sans SemiBold',

                  color: !isDarkModeEnabled ? '#121212' : '#ffffff',
                }}>
                {data?.email}
              </Text>

              <Text
                style={{
                  //   marginTop: 36,
                  fontFamily: 'Plus Jakarta Sans Regular',
                  color: !isDarkModeEnabled ? '#121212' : '#ffffff75',
                }}>
                Date Created
              </Text>
              <Text
                style={{
                  marginTop: 6,
                  marginBottom: 32,
                  fontFamily: 'Plus Jakarta Sans SemiBold',

                  color: !isDarkModeEnabled ? '#121212' : '#ffffff',
                }}>
                {new Date(data?.created_at)?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </Text>
            </View>
       
          </View> */}

          <View
            style={{
              backgroundColor: isDarkModeEnabled
                ? theme.background
                : Colors.white,

              padding: 12,
              // paddingVertical: 32,
            }}>
            <ScrollView
              ref={scrollViewRef}
              style={{height: '100%'}}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}>
              <View style={{marginTop: 24}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 16,
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16 * fontScale,
                      fontFamily: 'Plus Jakarta Sans Bold',
                      color: isDarkModeEnabled ? '#fff' : '#121212',
                    }}>
                    All Tickets Assigned To You - {tickets?.length}
                  </Text>
                </View>
                <View
                  style={[
                    styles.searchContainer,
                    {
                      borderColor: isDarkModeEnabled ? '#ffffff15' : '#fff',
                      borderWidth: 1,
                      backgroundColor: isDarkModeEnabled
                        ? '#ffffff15'
                        : '#80808025',
                    },
                  ]}>
                  <Icon
                    name="search-line"
                    size="20"
                    color="#808080"
                    style={styles.searchIcon}
                  />
                  <TextInput
                    placeholder="Search for tickets by name or email"
                    placeholderTextColor="#808080"
                    style={[styles.searchInput, {}]}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearchSubmit}
                  />
                </View>
              </View>
              <View>
                <View
                //style={styles.content}
                >
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScrollView}>
                    <FilterButton
                      filter="All Tickets"
                      selected={selectedFilter === 'All Tickets'}
                      onPress={handleFilterPress}
                    />
                    <FilterButton
                      filter="Overdue tickets"
                      selected={selectedFilter === 'Overdue tickets'}
                      onPress={handleFilterPress}
                    />
                    <FilterButton
                      filter="Due tickets"
                      selected={selectedFilter === 'Due tickets'}
                      onPress={handleFilterPress}
                    />
                    <FilterButton
                      filter="Open tickets"
                      selected={selectedFilter === 'Open tickets'}
                      onPress={handleFilterPress}
                    />
                    <FilterButton
                      filter="Resolve tickets"
                      selected={selectedFilter === 'Resolve tickets'}
                      onPress={handleFilterPress}
                    />
                    <FilterButton
                      filter="High Prority tickets"
                      selected={selectedFilter === 'High Prority tickets'}
                      onPress={handleFilterPress}
                    />
                    <FilterButton
                      filter="Medium Prority tickets"
                      selected={selectedFilter === 'Medium Prority tickets'}
                      onPress={handleFilterPress}
                    />
                    <FilterButton
                      filter="Low Prority tickets"
                      selected={selectedFilter === 'Low Prority tickets'}
                      onPress={handleFilterPress}
                    />
                  </ScrollView>

                  {renderNotifications()}
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      )}
      {network ? <ErrorComponent /> : null}
    </SafeAreaView>
  );
};

export default ProfileDetailsYour;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Plus Jakarta Sans Bold',
    marginTop: 24,
  },
  scrollViewContent: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
    marginVertical: 24,
  },
  image: {},
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 16,
    width: '100%',
    height: 200,
  },
  icon: {
    marginBottom: 5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Plus Jakarta Sans SemiBold',
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 92,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  horizontalScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  button: {
    backgroundColor: '#ffffff45',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 64,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Plus Jakarta Sans Semibold',
    color: '#fff',
    marginRight: 12,
  },
  stats: {
    fontSize: 24,
    textAlign: 'right',
    fontFamily: 'Plus Jakarta Sans Bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 30,
    zIndex: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#808080',
    padding: 12,
    height: 40,
  },
});
