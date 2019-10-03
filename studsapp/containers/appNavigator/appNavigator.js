import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginView from 'studsapp/containers/loginView/loginViewContainer';
import EventListView from 'studsapp/containers/eventListView/eventListViewContainer';
import AuthenticationView from 'studsapp/containers/authenticationView/authenticationViewContainer';
import SettingsView from 'studsapp/containers/settingsView/settingsViewContainer';
import Icon from 'react-native-vector-icons/Ionicons';

//TODO: Styling of tabs
const LoggedInNavigator = createBottomTabNavigator(
    {
        Events: EventListView,
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