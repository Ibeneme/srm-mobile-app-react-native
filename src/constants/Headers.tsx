import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {useTheme} from '../context/ThemeProvidr';
import {Colors} from './Colors';

type CustomHeaderProps = {
  title?: string;
  hideCart?: boolean;
  goBackTwice?: boolean;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  goBackTwice,
  hideCart,
}) => {
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme, toggleTheme} = useTheme();

  const handleBackPress = () => {
    navigation.goBack();
  };


  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      padding: 12,
      paddingRight: 18,
      borderBottomWidth: 1,
      borderBottomColor: isDarkModeEnabled? Colors?.darkOrange: '#12121245',
      width: '100%',
      justifyContent: 'space-between', // Align the toggle icon to the right
    },
    toggleIcon: {
      padding: 4, // Adjust padding as needed
    },
  });

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: isDarkModeEnabled ? theme.background : '#fff',
        },
        {
          // // borderBottomColor: !isDarkModeEnabled
          // //   ? theme.backgroundDark
          // //   : '#12121224',
        },
      ]}>
      {goBackTwice ? null : (
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-left-s-line" size={24} color={theme.text} />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={toggleTheme} style={styles.toggleIcon}>
        <Icon
          name={!isDarkModeEnabled ? 'ri-moon-fill' : 'sun-line'}
          size={24}
          color={isDarkModeEnabled ? Colors?.darkOrange : '#121212'}
        />
      </TouchableOpacity>
    </View>
  );
};



export default CustomHeader;
