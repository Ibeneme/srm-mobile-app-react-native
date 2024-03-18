import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Test from '../Pages/Test';
import {BottomTabNavigator} from './BottomNavigation';
import DashboardScreen from '../Pages/Home/Home';
import TicketSpecificScreen from '../Pages/Home/Tickets/TicketSpecifc';
import FeedbackDetails from '../Pages/Home/Feedback/FeedBackSpecific';
import StakeholdersDetails from '../Pages/Home/Feedback/StakeholderSpecific';
import FormComponent from '../Pages/Home/Tickets/CreateTickets';
import ProfileDetails from '../Pages/Home/Feedback/ProfileSpecific';
import UpdateProfilePage from '../Pages/Home/Feedback/UpdateProfile';
import UpdateOrg from '../Pages/Home/Feedback/UpdateOrg';
import Department from '../Pages/Home/Feedback/Departments';
import Users from '../Pages/Home/Feedback/Users';
import ProfileDetailsUsers from '../Pages/Home/Feedback/UsersProfile';
import NewUserForm from '../Pages/Home/Feedback/UserAdd';
import DepartmentAdd from '../Pages/Home/Feedback/DepartmentsAdd';
import Settings from '../Pages/Home/Settings';
import OrgProfileDetails from '../Pages/Home/Feedback/UsersProfileOrg';
import DepartmentEdit from '../Pages/Home/Feedback/DepartmentEdit';
import ProfileDetailsOrg from '../Pages/Home/Feedback/Org';
import ProfileDetailsYour from '../Pages/Home/Feedback/YourTickets';
import FormComponentEdit from '../Pages/Home/Tickets/EditTickets';

type SignedInUserStackParamList = {
  Main: undefined;
  DashboardScreen: undefined;
  TicketSpecificScreen: {ticketId: String};
  FeedbackDetails: undefined;
  StakeholdersDetails: undefined;
  FormComponent: undefined;
  ProfileDetails: undefined;
  UpdateProfilePage: undefined;
  UpdateOrg: undefined;
  Department: undefined;
  Users: undefined;
  ProfileDetailsUsers: undefined;
  NewUserForm: undefined;
  DepartmentAdd: undefined;
  DepartmentEdit: undefined;
  Settings: undefined;
  OrgProfileDetails: undefined;
  ProfileDetailsOrg: undefined;
  ProfileDetailsYour: undefined;
  FormComponentEdit: undefined;
};

const SignedInUserStack = createStackNavigator<SignedInUserStackParamList>();

const SignedInUserStackNavigator: React.FC = () => {
  return (
    <SignedInUserStack.Navigator initialRouteName="Main">
      <SignedInUserStack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="TicketSpecificScreen"
        component={TicketSpecificScreen}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="FeedbackDetails"
        component={FeedbackDetails}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="StakeholdersDetails"
        component={StakeholdersDetails}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="FormComponent"
        component={FormComponent}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="UpdateProfilePage"
        component={UpdateProfilePage}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="UpdateOrg"
        component={UpdateOrg}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="Department"
        component={Department}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="Users"
        component={Users}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ProfileDetailsUsers"
        component={ProfileDetailsUsers}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="NewUserForm"
        component={NewUserForm}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="DepartmentAdd"
        component={DepartmentAdd}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="OrgProfileDetails"
        component={OrgProfileDetails}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="DepartmentEdit"
        component={DepartmentEdit}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ProfileDetailsOrg"
        component={ProfileDetailsOrg}
        options={{headerShown: false}}
      />
      <SignedInUserStack.Screen
        name="ProfileDetailsYour"
        component={ProfileDetailsYour}
        options={{headerShown: false}}
      />
        <SignedInUserStack.Screen
        name="FormComponentEdit"
        component={FormComponentEdit}
        options={{headerShown: false}}
      />
    </SignedInUserStack.Navigator>
  );
};

export default SignedInUserStackNavigator;
