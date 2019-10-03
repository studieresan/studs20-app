import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginView from 'studsapp/containers/loginView/loginViewContainer';
import EventListView from 'studsapp/containers/eventListView/eventListViewContainer';
import AuthenticationView from 'studsapp/containers/authenticationView/authenticationViewContainer';

//TODO: Styling of tabs
const LoggedInNavigator = createBottomTabNavigator(
    {
        EventList: EventListView
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