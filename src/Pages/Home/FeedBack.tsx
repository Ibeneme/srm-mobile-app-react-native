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
import FeedbackNotification from '../../components/Flatlists/FeedbackNotification';
import {useTheme} from '../../context/ThemeProvidr';
import {Ticket} from '../Types/Ticket';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store';
import {getAllTickets} from '../../Redux/Tickets/Tickets';
import {getAllFeedbacks} from '../../Redux/Feedback/Feedback';

interface FeedbackMedia {
  id: string;
  created_at: string;
  updated_at: string;
  reference: string;
  location: string;
}

interface Customer {
  id: string;
  created_at: string;
  updated_at: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
}

interface Feedback {
  id: string;
  created_at: string;
  updated_at: string;
  reference: string;
  customer: Customer;
  subject: string;
  message: string;
  feedback_media: FeedbackMedia[];
  project_name: string;
}

const FeedBack = () => {
  const {fontScale, width} = useWindowDimensions();
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<string>('All Tickets');
  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    handleGetTickets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetTickets();
    }, []),
  );

  const handleGetTickets = () => {
    dispatch(getAllFeedbacks())
      .then(response => {
        setTickets(response?.payload);
      })
      .catch(error => {});
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  console.log(tickets, 'kkk');
  const renderNotifications = () => {
    let filteredTickets = tickets;

    if (searchQuery?.trim() !== '') {
      filteredTickets = filteredTickets?.filter(ticket => {
        const customer = ticket?.customer;
        return (
          customer?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
          customer?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
      });
    }
    switch (selectedFilter) {
      case 'All Feedback':
        return (
          <>
            {filteredTickets?.map((ticket: Feedback) => (
              <FeedbackNotification
                onPress={() => {
                  navigation.navigate('FeedbackDetails', {
                    data: ticket,
                  });
                  console.log(ticket, 'this ticket');
                }}
                key={ticket?.id}
                senderName={ticket?.customer?.name}
                message={ticket?.message}
              />
            ))}
          </>
        );
      case 'Acadaboo':
        return (
          <>
            {tickets
              ?.filter((ticket: Feedback) => ticket?.project_name === 'Acadaboo')
              .map((ticket: Feedback) => (
                <FeedbackNotification
                  onPress={() => {
                    navigation.navigate('FeedbackDetails', {
                      data: ticket,
                    });
                    console.log(ticket, 'this ticket');
                  }}
                  key={ticket?.id}
                  senderName={ticket?.customer?.name}
                  message={ticket?.message}
                />
              ))}
          </>
        );
      case 'Oberon':
        return (
          <>
            {tickets
              ?.filter((ticket: Feedback) => ticket?.project_name === 'Oberon')
              .map((ticket: Feedback) => (
                <FeedbackNotification
                  onPress={() => {
                    navigation.navigate('FeedbackDetails', {
                      data: ticket,
                    });
                    console.log(ticket, 'this ticket');
                  }}
                  key={ticket?.id}
                  senderName={ticket?.customer?.name}
                  message={ticket?.message}
                />
              ))}
          </>
        );
      case 'Antigravity Site':
        return (
          <>
            {tickets
              ?.filter(
                (ticket: Feedback) =>
                  ticket?.project_name === 'Antigravity Site',
              )
              .map((ticket: Feedback) => (
                <FeedbackNotification
                  onPress={() => {
                    navigation.navigate('FeedbackDetails', {
                      data: ticket,
                    });
                    console.log(ticket, 'this ticket');
                  }}
                  key={ticket?.id}
                  senderName={ticket?.customer?.name}
                  message={ticket?.message}
                />
              ))}
          </>
        );
      default:
        return null;
    }
  };

  const handleSearchSubmit = () => {
    console.log('Search submitted');
    Alert.alert('Search submitted');
  };

  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const offsetY = event?.nativeEvent?.contentOffset?.y;
    setShowScrollTop(offsetY > 100); 
  };


  const scrollToTop = () => {
    if (scrollViewRef?.current) {
      scrollViewRef?.current?.scrollTo({y: 0, animated: true});
    }
  };

  const {isDarkModeEnabled, theme} = useTheme();

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
            <Text
              style={{
                fontSize: 18 * fontScale,
                fontFamily: 'Plus Jakarta Sans Bold',
                marginVertical: 16,
                color: isDarkModeEnabled ? '#fff' : '#121212',
              }}>
              All Feedback
            </Text>
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
                placeholder="Search for feedback by name or email"
                placeholderTextColor="#808080"
                style={[styles.searchInput, {}]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearchSubmit}
              />
            </View>
          </View>
          <View>
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScrollView}>
                <FilterButton
                  filter="All Feedback"
                  selected={selectedFilter === 'All Feedback'}
                  onPress={handleFilterPress}
                />
                <FilterButton
                  filter="Acadaboo"
                  selected={selectedFilter === 'Acadaboo'}
                  onPress={handleFilterPress}
                />
                <FilterButton
                  filter="Antigravity Site"
                  selected={selectedFilter === 'Antigravity Site'}
                  onPress={handleFilterPress}
                />
                <FilterButton
                  filter="Oberon"
                  selected={selectedFilter === 'Oberon'}
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

export default FeedBack;

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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#808080',
    padding: 12,
    height: 40,
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 30,
    zIndex: 2
  },
});
