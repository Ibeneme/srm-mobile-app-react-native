import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import StakeholdersNotification from '../../components/Flatlists/StakeHolderNotification';
import {useTheme} from '../../context/ThemeProvidr';
import {Colors} from '../../constants/Colors';
import {AppDispatch} from '../../Redux/Store';
import {useDispatch} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getCustomers} from '../../Redux/Profile/Profile';

interface MyType {
  id: string;
  created_at: string;
  updated_at: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
}

const Stakeholders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {fontScale, width} = useWindowDimensions();
  const {isDarkModeEnabled, theme} = useTheme();
  const navigation = useNavigation();
  const [tickets, setTickets] = useState<MyType[]>([]);
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
    dispatch(getCustomers())
      .unwrap()
      .then(response => {
        setTickets(response);
        console.log(response, 'response')
      })
      .catch(error => {
        console.log('Error fetching tickets:', error);
      });
  };
  
  const filteredTickets = tickets?.filter(
    ticket =>
      ticket?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      ticket?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()),
  );
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
      <View style={[styles.content]}>
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
              Stakeholder's Database
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
                placeholder="Search for tickets by name or email"
                placeholderTextColor="#808080"
                style={[styles.searchInput, {}]}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
          {filteredTickets.map((ticket: MyType) => (
            <StakeholdersNotification
              key={ticket.id}
              senderName={ticket.name}
              message={ticket.email}
              onPress={() =>
                navigation.navigate('StakeholdersDetails', {
                  data: ticket,
                }) as never
              }
            />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 24,
    marginVertical: 8,
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

export default Stakeholders;
