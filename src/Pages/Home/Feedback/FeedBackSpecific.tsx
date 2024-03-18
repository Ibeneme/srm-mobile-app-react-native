import React from 'react';
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
import {useTheme} from '../../../context/ThemeProvidr';
import {useNavigation, useRoute} from '@react-navigation/native';
import useUserPermission from '../Hook/useCheckPermssion';

const FeedbackDetails = () => {
  const {fontScale} = useWindowDimensions();
  const {isDarkModeEnabled, theme} = useTheme();

  const route = useRoute();
  const { data } = route.params;
  const navigation = useNavigation();

  const usersDataSingle = useUserPermission();
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
            padding: 16,
            paddingVertical: 32,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
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
                Feedback ID: {data?.reference}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'Plus Jakarta Sans SemiBold',
              fontSize: 18 * fontScale,
              textAlign: 'center',
              color: isDarkModeEnabled ? '#fff' : '#121212',
            }}>
            Feedback Title: {data?.subject}
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
                color: isDarkModeEnabled ? '#fff' : '#121212',
              }}>
              {data?.customer.name}
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
                color: isDarkModeEnabled ? '#fff' : '#121212',
              }}>
              {data?.customer.email}
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
                color: isDarkModeEnabled ? '#fff' : '#121212',
              }}>
              {new Date(data?.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
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
                color: isDarkModeEnabled ? '#fff' : '#121212',
              }}>
              {data?.message}
            </Text>
          </View>
          {usersDataSingle ? null : (
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
              }}
              onPress={() => navigation.navigate('FormComponent' as never)}>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans SemiBold',
                  fontSize: 14,
                  color: '#fff',
                }}>
                Create a Ticket
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FeedbackDetails;
