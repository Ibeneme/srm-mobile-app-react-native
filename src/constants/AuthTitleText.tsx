import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from './Colors';
import {useTheme} from '../context/ThemeProvidr';

interface AuthTitleTextProps {
  text: string;
  title: string;
  marginTop?: number;
  icon: React.ReactNode;
  onPress?: () => void;
}

const AuthTitleText: React.FC<AuthTitleTextProps> = ({
  text,
  marginTop,
  title,
  icon,
  onPress,
}) => {
  const {isDarkModeEnabled, theme} = useTheme(); // Use the useTheme hook

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {marginTop: marginTop}]}>
        <View style={styles.iconTextContainer}>
          <View
            style={{
              backgroundColor: isDarkModeEnabled
                ? Colors.darkOrange
                : Colors.darkOrange, // Change background color based on theme
              padding: 8,
              borderRadius: 444,
              marginTop: -6,
            }}>
            {icon}
          </View>
          <View style={[styles.titleContainer, {color: theme.text}]}>
            <Text style={[styles.titleText, {color: theme.text}]}>{title}</Text>
          </View>
        </View>
        <Text style={[styles.text, {color: theme.text}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 16,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 12,
    marginVertical: 12,
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Plus Jakarta Sans Bold',
  },
  titleContainer: {
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 14,
    flexShrink: 1,
    fontFamily: 'Plus Jakarta Sans Regular',
  },
});

export default AuthTitleText;
