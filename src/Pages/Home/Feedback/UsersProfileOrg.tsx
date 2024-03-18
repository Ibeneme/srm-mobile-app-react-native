import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import CustomHeader from '../../../constants/Headers';
import {Colors} from '../../../constants/Colors';
import CustomerInfo from '../../../components/Flatlists/RandomColor';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../context/ThemeProvidr';
import {
  getOrganizationProfile,
  getProfile,
} from '../../../Redux/Profile/Profile';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';

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

const OrgProfileDetails = () => {
  const {fontScale} = useWindowDimensions();

  const [loading, setLoading] = useState(false);
  const [data, setUser] = useState<UserData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [orgData, setOrg] = useState<UserData[]>([]);
  const handleGetTickets = () => {
    dispatch(getProfile())
      .then(response => {
        console.log('Tickets fetched successfully:', response?.payload);
        setUser(response?.payload);
      })
      .catch(error => {});
    dispatch(getOrganizationProfile())
      .then(response => {
        console.log('Tickets fetched successfully:', response?.payload);
        setOrg(response?.payload);
      })
      .catch(error => {});
  };

  useEffect(() => {
    handleGetTickets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetTickets();
    }, []),
  );

  // const data = {
  //   id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //   created_at: '2024-02-29T18:13:12.152Z',
  //   updated_at: '2024-02-29T18:13:12.152Z',
  //   reference: 'string',
  //   name: 'Ibeneme Ikenna',
  //   email: 'Ibenemeikenna2021@gmail.com',
  //   department: 'Tech',
  //   permission: 'Support',
  // };

  // const orgData = {
  //   id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //   created_at: '2024-02-29T18:13:12.152Z',
  //   updated_at: '2024-02-29T18:13:12.152Z',
  //   reference: 'string',
  //   name: 'Ibeneme Industries',
  //   email: 'Ibenemeikenna2021@gmail.com',
  //   country: 'Nigeria',
  //   StaffCount: '10',
  // };

  const navigation = useNavigation();
  const {isDarkModeEnabled, theme} = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
      }}>
      <CustomHeader />
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
          <Text
            style={{
              color: Colors?.darkOrange,
              fontSize: 14,
              fontFamily: 'Plus Jakarta Sans SemiBold',
              textAlign: 'right',
            }}> 
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

          <View style={{marginVertical: 48}}>
            <Text
              style={{
                //   marginTop: 36,
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
              {data.first_name}
              {''} {data.last_name}
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
              {data.email}
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
              {new Date(data.created_at).toLocaleDateString('en-US', {
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
                marginBottom: 24,
                marginTop: -64,
                width: 140,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors?.darkOrange,
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: 14 * fontScale,
                }}>
                {data?.permission_type}
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
            onPress={() => navigation.navigate('UpdateProfilePage' as never)}>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontSize: 14,
                color: '#fff',
              }}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 12,
            borderRadius: 24,
            backgroundColor: isDarkModeEnabled
              ? theme.background
              : Colors.white,

            padding: 16,
            paddingVertical: 32,
          }}>
          <Text
            style={{
              color: '#121212',
              fontSize: 14,
              fontFamily: 'Plus Jakarta Sans SemiBold',
              textAlign: 'left',
            }}>
            Organisation Profile
          </Text>

          <View style={{marginVertical: 48}}>
            <Text
              style={{
                //   marginTop: 36,
                fontFamily: 'Plus Jakarta Sans Regular',
                color: !isDarkModeEnabled ? '#121212' : '#ffffff75',
              }}>
              Name of Organisation
            </Text>
            <Text
              style={{
                marginTop: 6,
                marginBottom: 32,
                fontFamily: 'Plus Jakarta Sans SemiBold',

                color: !isDarkModeEnabled ? '#121212' : '#ffffff',
              }}>
              {orgData.name}
            </Text>

            <Text
              style={{
                //   marginTop: 36,
                fontFamily: 'Plus Jakarta Sans Regular',
                color: !isDarkModeEnabled ? '#121212' : '#ffffff75',
              }}>
              Email Address of Organisation
            </Text>
            <Text
              style={{
                marginTop: 6,
                marginBottom: 32,
                fontFamily: 'Plus Jakarta Sans SemiBold',

                color: !isDarkModeEnabled ? '#121212' : '#ffffff',
              }}>
              {orgData.email}
            </Text>

            <Text
              style={{
                //   marginTop: 36,
                fontFamily: 'Plus Jakarta Sans Regular',
                color: !isDarkModeEnabled ? '#121212' : '#ffffff75',
              }}>
              Country of Operation
            </Text>
            <Text
              style={{
                marginTop: 6,
                marginBottom: 32,
                fontFamily: 'Plus Jakarta Sans SemiBold',

                color: !isDarkModeEnabled ? '#121212' : '#ffffff',
              }}>
              {orgData.country}
            </Text>

            <Text
              style={{
                //   marginTop: 36,
                fontFamily: 'Plus Jakarta Sans Regular',
                color: !isDarkModeEnabled ? '#121212' : '#ffffff75',
              }}>
              Staff Count
            </Text>
            <Text
              style={{
                marginTop: 6,
                marginBottom: 32,
                fontFamily: 'Plus Jakarta Sans SemiBold',

                color: !isDarkModeEnabled ? '#121212' : '#ffffff',
              }}>
              {orgData.staff_count}
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
              {new Date(orgData.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </Text>
          </View>
          {/* <TouchableOpacity
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
            onPress={() => navigation.navigate('UpdateOrg' as never)}>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontSize: 14,
                color: '#fff',
              }}>
              Update Organization
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrgProfileDetails;
