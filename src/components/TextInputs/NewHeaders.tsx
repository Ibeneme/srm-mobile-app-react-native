import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import {Colors} from '../../constants/Colors';
import {useTheme} from '../../context/ThemeProvidr';

type NewHeadersProps = {
  title?: string;
  hideCart?: boolean;
  goBackTwice?: boolean;
};

const NewHeaders: React.FC<NewHeadersProps> = ({
  title,
  goBackTwice,
  hideCart,
}) => {
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme, toggleTheme} = useTheme();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.header,
        {backgroundColor: isDarkModeEnabled ? theme.background : '#fff'},
        {
          borderBottomColor: !isDarkModeEnabled
            ? theme.backgroundDark
            : '#fffFFF24',
        },
      ]}>
      {goBackTwice ? null : (
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-left-s-line" size={0} color={theme.text} />
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 12,
    paddingRight: 18,
    borderBottomWidth: 1,
    //borderBottomColor: '#e0e0e0',
    width: '100%',
    position: 'fixed',
    top: 0,
    justifyContent: 'space-between', // Align the toggle icon to the right
  },
  toggleIcon: {
    padding: 4, // Adjust padding as needed
  },
});

export default NewHeaders;
