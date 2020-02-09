import React from 'react';
import {View} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import LoginView from 'studsapp/containers/loginView/loginViewContainer';
import EventListView from 'studsapp/containers/eventListView/eventListViewContainer';
import EventView from 'studsapp/containers/eventView/eventViewContainer';
import GameView from 'studsapp/containers/gameView/gameViewContainer';
import HighscoresView from 'studsapp/containers/gameView/highscoresView/highscoresView';
import CheckInView from 'studsapp/containers/checkInView/checkInViewContainer';
import AuthenticationView from 'studsapp/containers/authenticationView/authenticationViewContainer';
import SettingsView from 'studsapp/containers/settingsView/settingsViewContainer';
import MemberListView from 'studsapp/containers/memberListView/memberListViewContainer';
import Icon from 'react-native-vector-icons/Ionicons';

const getIconName = routeName => {
    switch (routeName) {
        case 'Events':
            return 'ios-calendar';
        case 'Settings':
            return 'ios-settings';
        case 'Members':
            return 'ios-contacts';
        case 'Game':
            return 'logo-game-controller-b';
        default:
            throw new Error('Unpexpected routeName');
    }
};

const EventsNavigator = createStackNavigator(
    {
        EventList: EventListView,
        Event: EventView,
        CheckIn: CheckInView,
    },
    {
        initialRouteName: 'EventList',
        defaultNavigationOptions: {
            header: null,
        },
    },
);

const GameNavigator = createStackNavigator(
    {
        Game: GameView,
        Highscores: HighscoresView,
        Shop: HighscoresView,
    },
    {
        initialRouteName: 'Game',
        defaultNavigationOptions: {
            header: null,
        },
    },
);

const LoggedInNavigator = createBottomTabNavigator(
    {
        Events: EventsNavigator,
        Members: MemberListView,
        Game: GameNavigator,
        Settings: SettingsView,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({tintColor}) => {
                return (
                    <Icon
                        name={getIconName(navigation.state.routeName)}
                        size={35}
                        color={tintColor}
                    />
                );
            },
        }),
        tabBarOptions: {
            activeTintColor: '#387677',
            inactiveTintColor: '#76a5a7',
            style: {
                backgroundColor: '#8ad0d2',
            },
            showLabel: false,
        },
    },
);

export default createSwitchNavigator(
    {
        Authentication: AuthenticationView,
        Login: LoginView,
        LoggedIn: LoggedInNavigator,
    },
    {
        initialRouteName: 'Authentication',
    },
);
