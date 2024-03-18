import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import CustomHeader from '../../constants/Headers';
import Icon from 'react-native-remix-icon';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeProvidr';
import {Colors} from '../../constants/Colors';
import {handleTokenClearing} from '../../Hooks/Logout';
import {StackActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../Redux/Store';
import {logout, logoutUs} from '../../Redux/Auth/Auth';
import useUserPermission from './Hook/useCheckPermssion';

type MenuItemProps = {
  title: string;
  description: string;
  onPress?: () => void;
  textColor: any;
};

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  description,
  onPress,
  textColor,
}) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
      }}
      onPress={onPress}>
      <View>
        <Text
          style={{
            fontFamily: 'Plus Jakarta Sans SemiBold',
            fontSize: 16,
            color: textColor,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontFamily: 'Plus Jakarta Sans Regular',
            fontSize: 14,
            color: '#808080',
          }}>
          {description}
        </Text>
      </View>
      {onPress ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#ff6b0045',
            padding: 12,
            borderRadius: 12,
          }}>
          <Icon name="send-plane-2-fill" size={16} color="#ff6b00" />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      console.log(user);
    } else {
      console.log(user);
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    if (loading) {
      if (user) {
        console.log(user);
      } else {
        console.log(user);
      }
    }
  }, [loading]);

  const handleProceed = async () => {
    dispatch(logoutUs());
    await AsyncStorage.clear();
    setModalVisible(false);
    setLoading(true);
  };
  const usersDataSingle = useUserPermission();
  const handleCancel = () => {
    setModalVisible(false);
  };

  const menuItems = [
    usersDataSingle !== 'support'
      ? {
          title: 'Your Tickets',
          description: 'View all Tickets Assigned to you',
          onPress: () => navigation.navigate('ProfileDetailsYour' as never),
        }
      : null,
    {
      title: 'Profile',
      description: 'View your Profile',
      onPress: () => navigation.navigate('ProfileDetails' as never),
    },
    {
      title: 'Organization Profile',
      description: 'View your Organization',
      onPress: () => navigation.navigate('ProfileDetailsOrg' as never),
    },

    usersDataSingle !== 'support'
      ? {
          title: 'Departments',
          description: 'View all Departments',
          onPress: () => navigation.navigate('Department' as never),
        }
      : null,
    usersDataSingle !== 'support'
      ? {
          title: 'Users',
          description: 'View all users in your organisation',
          onPress: () => navigation.navigate('Users' as never),
        }
      : null,

    {
      title: 'Log out',
      description: 'Log out account',
      onPress: handleLogout,
    },
  ];

  const filteredMenuItems = menuItems?.filter(item => item !== null);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkModeEnabled ? theme.background : '#fff',
        flex: 1,
      }}>
      <CustomHeader />
      {filteredMenuItems?.map((item, index) => (
        <MenuItem
          textColor={isDarkModeEnabled ? '#fff' : '#121212'}
          key={index}
          title={item?.title}
          description={item?.description}
          onPress={item?.onPress}
        />
      ))}
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
                backgroundColor: isDarkModeEnabled ? theme.background : '#fff',
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
              Confirm Logout
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
              Are you sure you want to log out?
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
                onPress={handleProceed}>
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
                    {color: '#ff6b00', fontFamily: 'Plus Jakarta Sans Regular'},
                  ]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
