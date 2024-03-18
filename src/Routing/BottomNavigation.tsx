import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-remix-icon';
import {Text} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import Home from '../Pages/Home/Home';
import Tickets from '../Pages/Home/Tickets';
import {useTheme} from '../context/ThemeProvidr';
import {Colors} from '../constants/Colors';
import FeedBack from '../Pages/Home/FeedBack';
import Stakeholders from '../Pages/Home/Stakeholders';
import Settings from '../Pages/Home/Settings';

type TabParamList = {
  Home: undefined;
  Tickets: undefined;
  Feedback: undefined;
  Stakeholders: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type BottomTabNavigationProp = RouteProp<TabParamList, keyof TabParamList>;

const BottomTabNavigator = () => {
  const {isDarkModeEnabled, theme} = useTheme();
  const activeColor = isDarkModeEnabled ? '#666' : Colors.darkOrange;
  const iconColor = isDarkModeEnabled ? '#fff' : '#666';
  const labelColor = isDarkModeEnabled ? '#fff' : '#666'; // Set active label color to darkOrange when focused

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontFamily: 'Plus Jakarta Sans Regular',
          fontSize: 10,
          marginTop: 4,
          color: iconColor,
        },
        tabBarStyle: {
          backgroundColor: isDarkModeEnabled ? theme.background : '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="home-line"
              size={size}
              color={focused ? Colors.darkOrange : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.darkOrange : labelColor,
                fontSize: 12,
              }}>
              Home
            </Text> // Apply activeColor when focused
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={Tickets}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="coupon-line"
              size={size}
              color={focused ? Colors.darkOrange : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.darkOrange : labelColor,
                fontSize: 12,
              }}>
              Tickets
            </Text> // Apply activeColor when focused
          ),
        }}
      />

      <Tab.Screen
        name="Feedback"
        component={FeedBack}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="survey-line"
              size={size}
              color={focused ? Colors.darkOrange : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.darkOrange : labelColor,
                fontSize: 12,
              }}>
              Feedback
            </Text> // Apply activeColor when focused
          ),
        }}
      />

      <Tab.Screen
        name="Stakeholders"
        component={Stakeholders}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="user-line"
              size={size}
              color={focused ? Colors.darkOrange : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.darkOrange : labelColor,
                fontSize: 12,
              }}>
              Stakeholders
            </Text> // Apply activeColor when focused
          ),
        }}
      />
      {/* <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false, // Hide the header
          tabBarIcon: ({color, size, focused}) => (
            <Icon
              style={{marginTop: 12}}
              name="settings-line"
              size={size}
              color={focused ? Colors.darkOrange : iconColor} // Apply activeColor when focused
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <Text
              style={{
                color: focused ? Colors.darkOrange : labelColor,
                fontSize: 12,
              }}>
              Settings
            </Text> // Apply activeColor when focused
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export {BottomTabNavigator};
