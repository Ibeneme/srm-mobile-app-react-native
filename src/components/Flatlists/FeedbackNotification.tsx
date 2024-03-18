import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useWindowDimensions} from 'react-native';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../context/ThemeProvidr';

interface FeedbackNotificationProps {
  senderName: string;
  message: string;
  onPress:  () => void;
}

const FeedbackNotification: React.FC<FeedbackNotificationProps> = ({
  senderName,
  message,
  onPress
}) => {
  const {width, fontScale} = useWindowDimensions();
  const initials = senderName
    ?.split(' ')
    ?.map(word => word?.charAt(0)?.toUpperCase())
    ?.join('')
    ?.substring(0, 2);

  const initialColors: {[key: string]: string} = {};
  const [assignedColor, setAssignedColor] = useState<string>();

  if (!initialColors[initials]) {
    const colors = [
      'orange',
      '#16B4A1',
      '#1962EF',
      '#B45816',
      '#DE4D93',
      'brown',
      '#7B4DDE',
      '#4D64DE',
      'orangered',
    ];
    initialColors[initials] = colors[Math?.floor(Math?.random() * colors?.length)];
  }

  if (!assignedColor) {
    setAssignedColor(initialColors[initials]);
  }

  const trimmedMessage =
    message?.length > 33 ? message?.substring(0, 33) + '...' : message;
  const navigation = useNavigation();

  const handleNotificationPress = () => {
    navigation.navigate('FeedbackDetails' as never);
    //navigation.navigate('TicketSpecific', {ticket});
  };

  const {isDarkModeEnabled, theme} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: width - 24,
          backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}>
      <View
        style={[styles.initialsContainer, {backgroundColor: assignedColor}]}>
        <Text
          style={[
            styles.initialsText,
            {color: isDarkModeEnabled ? '#fff' : Colors.white},
          ]}>
          {initials}
        </Text>
      </View>
      <View style={styles.messageContainer}>
        <Text
          style={[
            styles.senderName,
            {
              fontSize: 16 * fontScale,
              color: isDarkModeEnabled ? '#ffffff' : '#121212',
            },
          ]}>
          {senderName}
        </Text>
        <Text
          style={[
            styles.message,
            {
              fontSize: 14,
              color: isDarkModeEnabled ? '#ffffff75' : '#808080',
            },
          ]}>
          {trimmedMessage}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#ff6b0025',
          padding: 12,
          borderRadius: 12,
        }}>
        <Icon
          name="send-plane-2-fill"
          size={16}
          color={Colors?.darkOrange}
         // onPress={onPress}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 12,
  },
  initialsContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
  },
  initialsText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Plus Jakarta Sans Bold',
  },
  messageContainer: {
    marginLeft: 12,
    flex: 1,
  },
  senderName: {
    color: '#121212',
    fontFamily: 'Plus Jakarta Sans SemiBold',
    marginBottom: 4,
  },
  message: {
    color: '#12121275',
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default FeedbackNotification;
