import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Notification from '../../components/Flatlists/TicketNotification';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../constants/Colors';
import FilterButton from './Tickets/FilterButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeProvidr';
import {Ticket} from '../Types/Ticket';
import {getAllTickets} from '../../Redux/Tickets/Tickets';
import {AppDispatch} from '../../Redux/Store';
import {useDispatch} from 'react-redux';
import useUserPermission from './Hook/useCheckPermssion';

const Tickets = () => {
  const {fontScale, width} = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();
  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };
  const usersDataSingle = useUserPermission();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    handleGetTickets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetTickets();
    }, []),
  );

  const handleGetTickets = () => {
    dispatch(getAllTickets())
      .then(response => {
        //console.log('Tickets fetched successfully:', response?.payload);
        setTickets(response?.payload);
      })
      .catch(error => {
        //console.log('Error fetching tickets:', error);
      });
  };
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
            {filteredTickets?.map((ticket: Ticket) => (
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
  const handleSearchSubmit = () => {
    console.log('Search submitted');
  };
  const {isDarkModeEnabled, theme} = useTheme();
  const navigation = useNavigation();
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
      style={[
        styles.container,
        {
          backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
        },
      ]}>
      <View style={styles.content}>
        {showScrollTop ? (
          <TouchableOpacity
            style={styles.scrollTopButton}
            onPress={scrollToTop}>
            <Icon name="arrow-up-s-line" size={24} color="#fff" />
          </TouchableOpacity>
        ) : null}
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
                  fontSize: 18 * fontScale,
                  fontFamily: 'Plus Jakarta Sans Bold',
                  color: isDarkModeEnabled ? '#fff' : '#121212',
                }}>
                All Tickets
              </Text>
              {usersDataSingle === 'support'? null : (
                <Text
                  style={{fontSize: 16 * fontScale, color: Colors?.darkOrange}}
                  onPress={() => navigation.navigate('FormComponent' as never)}>
                  Create a Ticket
                </Text>
              )}
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
    </SafeAreaView>
  );
};

export default Tickets;

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
