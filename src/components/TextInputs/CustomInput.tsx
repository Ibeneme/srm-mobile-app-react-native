import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import {useTheme} from '../../context/ThemeProvidr';
import {Colors} from '../../constants/Colors';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  secureTextEntry,
  ...props
}) => {
  const {isDarkModeEnabled, theme} = useTheme();
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, {color: theme.text}]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: isDarkModeEnabled ? '#ffffff45' : '#12121245',
          },
        ]}>
        <TextInput
          placeholderTextColor={!isDarkModeEnabled ? '#12121245' : '#ffffff45'}
          style={[
            styles.input,
            {
              color: isDarkModeEnabled ? '#fff' : '#121212',
            },
            //  {placeholderTextColor: isDarkModeEnabled ? '#121212' : '#ffffff'},
          ]}
          secureTextEntry={secureTextEntry && hidePassword}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}>
            <Icon
              name={hidePassword ? 'eye-2-line' : 'eye-2-fill'}
              size={20}
              color={!isDarkModeEnabled ? Colors.black : Colors.white}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.errorText, {color: Colors.darkOrange}]}>
        {error}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: 'Plus Jakarta Sans Regular',
  },

  eyeIcon: {
    padding: 10,
  },
  errorText: {
    fontSize: 14,
    marginTop: 3,
    marginBottom: 8,
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
});

export default CustomTextInput;
