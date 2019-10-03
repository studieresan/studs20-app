import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginView from 'studsapp/containers/loginView/loginViewContainer';
import EventListView from 'studsapp/containers/eventListView/eventListViewContainer';
import AuthenticationView from 'studsapp/containers/authenticationView/authenticationViewContainer';
import SettingsView from 'studsapp/containers/settingsView/settingsViewContainer';

//TODO: Styling of tabs
const LoggedInNavigator = createBottomTabNavigator(
    {
        EventList: EventListView,
        Settings: SettingsView
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