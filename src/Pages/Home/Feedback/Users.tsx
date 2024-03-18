import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import CustomHeader from '../../../constants/Headers';
import {Colors} from '../../../constants/Colors';
import {useTheme} from '../../../context/ThemeProvidr';
import {UserData} from '../Tickets/CreateTickets';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {getAllUsers} from '../../../Redux/Profile/Profile';
import LoadingComponent from '../../../components/Loading';
import ErrorComponent from '../../../components/Err';
type Props = {};

const Users = (props: Props) => {
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme} = useTheme();

  const dispatch = useDispatch<AppDispatch>();
  const [users, setUsers] = useState<UserData[]>([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [network, setNetwork] = useState(false);

  const handleGetDepts = () => {
    setPageLoading(true);
    dispatch(getAllUsers())
      .then(response => {
        setPageLoading(false);
        if (response?.payload?.message === 'Network Error') {
          setPageLoading(true);
          setNetwork(true);
        } else if (response?.payload?.message) {
          setNetwork(true);
          setPageLoading(true);
        } else {
          console.log('Departments fetched successfully:', response?.payload);
          setUsers(response?.payload);
        }
        // setModalVisible(false);
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
        backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
        flex: 1,
      }}>
      <CustomHeader />

      {pageLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Pressable
            onPress={() => navigation.navigate('NewUserForm' as never)}
            style={[
              {
                //opacity: pressed ? 0.5 : 1,
                borderColor: '#ff6b00',
                borderWidth: 1,
                padding: 16,
                marginTop: 24,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ff6b00',
                margin: 12,
                width: 180,
              },
            ]}>
            <Text
              style={{fontFamily: 'Plus Jakarta Sans SemiBold', color: '#fff'}}>
              Add a User +
            </Text>
          </Pressable>
          {users?.map((user, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProfileDetailsUsers', {user} as never)
              }
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 16,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 16,
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {user?.first_name} {user?.last_name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Regular',
                    fontSize: 14,
                    color: '#808080',
                  }}>
                  {user?.email}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ff6b0025',
                  padding: 12,
                  borderRadius: 12,
                }}>
                <Icon
                  name="send-plane-2-fill"
                  size={16}
                  color={Colors?.darkOrange}
                  //onPress={handleNotificationPress}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </>
      )}
      {network ? <ErrorComponent /> : null}
    </SafeAreaView>
  );
};

export default Users;

const styles = StyleSheet.create({});
