import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Linking,
} from 'react-native';
import CustomHeader from '../../../constants/Headers';
import {Colors} from '../../../constants/Colors';
import CustomerInfo from '../../../components/Flatlists/RandomColor';
import {useTheme} from '../../../context/ThemeProvidr';
import {useNavigation, useRoute} from '@react-navigation/native';
import FeedbackNotification from '../../../components/Flatlists/FeedbackNotification';
import Notification from '../../../components/Flatlists/TicketNotification';
import { formatTimestamp } from '../../../components/Flatlists/formatTime';

const StakeholdersDetails: React.FC = () => {
  const {fontScale} = useWindowDimensions();
  const route = useRoute();
  const {data} = route.params;
  const navigation = useNavigation();
  const handleSendEmail = () => {
    if (data?.email) {
      const emailUrl = `mailto:${data?.email}`;
      Linking.openURL(emailUrl);
      console.log(emailUrl);
    } else {
      // Handle case where email address is not available
      console.error('Email address not available');
    }
  };

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
          backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
        }}>
        <View
          style={{
            //margin: 12,
            //borderRadius: 24,
            backgroundColor: isDarkModeEnabled
              ? theme.background
              : Colors.white,

            padding: 16,
            height: '100%',
          }}>
          <View
            style={{
              alignItems: 'center',
              gap: 12,
            }}>
            <CustomerInfo
              firstName={data?.name?.split(' ')[0]}
              lastName={data?.name?.split(' ')[0]}
            />
            <View
              style={{
                backgroundColor: '#ff6b0025',
                padding: 12,
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
                User ID: {data?.reference}
              </Text>
            </View>
          </View>

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
              {data?.name}
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
              {data?.email}
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
            onPress={handleSendEmail}>
            <Text
              style={{
                fontFamily: 'Plus Jakarta Sans SemiBold',
                fontSize: 14,
                color: '#fff',
              }}>
              Send a Mail
            </Text>
          </TouchableOpacity>

          <View>
            {data?.feedback?.length !== 0 ? (
              <View>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    color: '#808080',
                    marginTop: 48,
                    fontSize: 14,
                  }}>
                  Feedback Sent by this Stakeholder
                </Text>
                {data.feedback.map((feedbackItem, index) => (
                  <View key={index}>
                    <FeedbackNotification
                      onPress={() => {
                        navigation.navigate('FeedbackDetails', {
                          data: feedbackItem,
                        });
                        console.log(feedbackItem, 'this feedback');
                      }}
                      senderName={feedbackItem?.subject}
                      message={formatTimestamp(feedbackItem?.created_at)}
                    />
                  </View>
                ))}
              </View>
            ) : null}

            {data?.tickets?.length !== 0 ? (
              <View>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Bold',
                    color: '#808080',
                    marginTop: 48,
                    fontSize: 14,
                  }}>
                  Tickets Created for this Stakeholder
                </Text>
                {data.tickets.map((ticketItem, index) => (
                  <View key={index}>
                    {/* Assuming Notification is a component */}
                    <Notification
                      onPress={() =>
                        navigation.navigate('TicketSpecificScreen', {
                          ticketId: ticketItem?.id as string,
                        })
                      }
                      senderName={ticketItem?.title}
                      message={formatTimestamp(ticketItem?.created_at)}
                    />
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StakeholdersDetails;
