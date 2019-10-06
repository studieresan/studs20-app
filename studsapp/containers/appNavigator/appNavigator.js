import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginView from 'studsapp/containers/loginView/loginViewContainer';
import EventListView from 'studsapp/containers/eventListView/eventListViewContainer';
import EventView from 'studsapp/containers/eventView/eventViewContainer';
import AuthenticationView from 'studsapp/containers/authenticationView/authenticationViewContainer';
import SettingsView from 'studsapp/containers/settingsView/settingsViewContainer';
import MemberListView from 'studsapp/containers/memberListView/memberListViewContainer';
import Icon from 'react-native-vector-icons/Ionicons';

const EventsNavigator = createStackNavigator(
    {
        EventList: EventListView,
        Event: EventView
    },
    {
        initialRouteName: 'EventList',
        defaultNavigationOptions: {
            header: null
        }
    }
);

const LoggedInNavigator = createBottomTabNavigator(
    {
        Events: EventsNavigator,
        Members: MemberListView,
        Settings: SettingsView
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Events') {
                    iconName = 'ios-calendar';
                } else if (routeName === 'Settings') {
                    iconName = 'ios-settings';
                } else if (routeName === 'Members') {
                    iconName = 'ios-contacts';
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={35} color={tintColor} />;
            }
        }),
        tabBarOptions: {
            activeTintColor: '#011660',
            inactiveTintColor: '#c4a57a',
            style: {
                backgroundColor: '#fac882',
                borderTopWidth: 2,
                borderColor: '#c4a57a'
            },
            showLabel: false
        }
    }
);

export default createSwitchNavigator (
    {
        Authentication: AuthenticationView, 
        Login: LoginView,
        LoggedIn: LoggedInNavigator
    },
    {
        initialRouteName: 'Authentication'
    }
);