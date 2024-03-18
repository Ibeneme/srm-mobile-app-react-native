import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-remix-icon'; // Import the Remix Icon component
import {Colors} from '../../constants/Colors';
import Notification from '../../components/Flatlists/TicketNotification';
import CustomerInfo from '../../components/Flatlists/RandomColor';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeProvidr';
import {getAllTickets} from '../../Redux/Tickets/Tickets';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../Redux/Store';
import {Profile, Ticket} from '../Types/Ticket';
import {getProfile} from '../../Redux/Profile/Profile';
import useUserPermission from './Hook/useCheckPermssion';
import ErrorComponent from '../../components/Err';
import LoadingComponent from '../../components/Loading';

const DashboardScreen: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const {fontScale, width} = useWindowDimensions();
  const {isDarkModeEnabled, theme} = useTheme();
  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    let greetingMessage = '';

    switch (true) {
      case hours >= 5 && hours < 12:
        greetingMessage = 'Good morning';
        break;
      case hours >= 12 && hours < 18:
        greetingMessage = 'Good afternoon';
        break;
      default:
        greetingMessage = 'Good evening';
        break;
    }

    setGreeting(`${greetingMessage}`);
  }, []);

  const first_name = 'ibeneme';
  const last_name = 'ikenna';
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [profile, setProfile] = useState<Profile[]>([]);
  const [dispatchErr, setDispatchErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleGetTickets = () => {
    let overdue = 0;
    let due = 0;

    tickets?.forEach(ticket => {
      if (ticket?.status === 'overdue') {
        overdue++;
      } else if (ticket?.status === 'due') {
        due++;
      }
    });

    setOverdueCount(overdue);
    setDueCount(due);
    setDispatchErr(false);
    setLoading(true);
    dispatch(getAllTickets())
      .then(response => {
        setLoading(false);
        setTickets(response?.payload || []);
      })
      .catch(error => {
        setLoading(false);
        setDispatchErr(true);
        if (error.response && error.response.status === 401) {
          console.log(401); // Log 401 status code
        }
        //console.log('Error fetching tickets:', error);
        setTickets([]);
      });
  };

  useEffect(() => {
    handleGetTickets();
  }, []);

  const handleProfile = () => {
    setDispatchErr(false);
    setLoading(true);
    dispatch(getProfile())
      .then(response => {
        setLoading(false);
        setProfile(response?.payload);
      })
      .catch(error => {
        setLoading(false);
        setDispatchErr(true);
      });
  };

  useEffect(() => {
    handleGetTickets();
    handleProfile();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetTickets();
      handleProfile();
    }, []),
  );

  const [overdueCount, setOverdueCount] = useState<number>(0);
  const [dueCount, setDueCount] = useState<number>(0);

  useEffect(() => {}, [tickets]);

  const usersDataSingle = useUserPermission();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
        },
      ]}>
      <View style={styles.content}>
        <ScrollView
          style={{height: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'space-between',
              width: '100%',
              flexDirection: 'row',
            }}>
            <View>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 18 * fontScale,
                    textAlign: 'left',
                    color: isDarkModeEnabled ? '#fff' : theme.backgroundColor,
                  },
                ]}>
                Hi {profile?.first_name} {''}
                {profile?.last_name}
              </Text>
              <Text
                style={[
                  {
                    fontSize: 14 * fontScale,
                    color: '#808080',
                    textAlign: 'left',
                  },
                ]}>
                {greeting}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings' as never)}>
                <CustomerInfo
                  firstName={profile?.first_name?.split(' ')[0]}
                  lastName={profile?.last_name?.split(' ')[0]}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.scrollViewContent}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/overdue.png')}
                style={[
                  styles.image,
                  {width: width / 1.2, height: 105, borderRadius: 16},
                ]} // Adjust width and height as needed
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.text}>Overdue Tickets</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Tickets' as never)}>
                    <Text style={styles.buttonText}>View all</Text>
                    <Icon
                      name="arrow-right-line"
                      size={14}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.stats, {fontSize: 40 * fontScale}]}>
                    {overdueCount > 999 ? '999+' : overdueCount}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/due.png')}
                style={[
                  styles.image,
                  {width: width / 1.2, height: 105, borderRadius: 16},
                ]} // Adjust width and height as needed
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <Text style={styles.text}>Due Tickets</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Tickets' as never)}>
                    <Text style={styles.buttonText}>View all</Text>
                    <Icon
                      name="arrow-right-line"
                      size={14}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.stats, {fontSize: 40 * fontScale}]}>
                    {dueCount > 999 ? '999+' : dueCount}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {tickets?.map((ticket: Ticket) => (
            <>
              {usersDataSingle !== 'support' ? (
                <Notification
                  onPress={() =>
                    navigation.navigate('TicketSpecificScreen', {
                      ticketId: ticket?.id as string,
                    })
                  }
                  key={ticket.id}
                  senderName={`${ticket?.handler?.first_name} ${ticket?.handler?.last_name}`} // Concatenate first and last name
                  message={ticket.description}
                />
              ) : (
                <Notification
                  onPress={() =>
                    navigation.navigate('TicketSpecificScreen', {
                      ticketId: ticket?.id as string,
                    })
                  }
                  key={ticket.id}
                  senderName={ticket?.customer?.name} // Concatenate first and last name
                  message={ticket.description}
                />
              )}
            </>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
    marginTop: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
    justifyContent: 'space-between',
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
    textAlign: 'right',
    fontFamily: 'Plus Jakarta Sans Bold',
    color: '#fff',
  },
});

export default DashboardScreen;
