import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScreenA from '../Pages/Auth/OnBoardingScreens/ScreenA';
import ScreenB from '../Pages/Auth/OnBoardingScreens/ScreenB';
import CreateAccount from '../Pages/Auth/AuthScreen/CreateAccount';
import LoginScreen from '../Pages/Auth/AuthScreen/Login';
import RegisterScreen from '../Pages/Auth/AuthScreen/CreateAccount';
import OTPConfirmationScreen from '../Pages/Auth/AuthScreen/OTPConfirmation';
import PasswordConfirmationScreen from '../Pages/Auth/AuthScreen/PasswordConfirmationScreen';
import ForgotPasswordScreen from '../Pages/Auth/AuthScreen/ForgotPassword';
import ResetPasswordOTPConfirmationScreen from '../Pages/Auth/AuthScreen/ResetPasswordOTPConfirmation';
import ResetPasswordScreen from '../Pages/Auth/AuthScreen/PasswordReset';
import SuccessScreen from '../Pages/Auth/AuthScreen/SuccessScreen';
import AccountSuccessScreen from '../Pages/Auth/AuthScreen/AccountSuccess';

type AuthStackParamList = {
  ScreenA: undefined;
  ScreenB: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  OTPConfirmationScreen: {email: string};
  PasswordConfirmationScreen: {otp: number};
  ForgotPasswordScreen: undefined;
  ResetPasswordOTPConfirmationScreen: undefined;
  ResetPasswordScreen: undefined;
  SuccessScreen: undefined;
  AccountSuccessScreen: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName="ScreenA">
      <AuthStack.Screen
        name="ScreenA"
        component={ScreenA}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ScreenB"
        component={ScreenB}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="OTPConfirmationScreen"
        component={OTPConfirmationScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="PasswordConfirmationScreen"
        component={PasswordConfirmationScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ResetPasswordOTPConfirmationScreen"
        component={ResetPasswordOTPConfirmationScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="AccountSuccessScreen"
        component={AccountSuccessScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
