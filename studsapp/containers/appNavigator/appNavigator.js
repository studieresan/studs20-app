import { createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginView from 'studsapp/containers/loginView/loginViewContainer';
import EventListView from 'studsapp/containers/eventListView/eventListViewContainer';

//TODO: Styling of tabs
const LoggedInNavigator = createBottomTabNavigator(
    {
        EventList: EventListView
    }
);

export default createSwitchNavigator (
    {
        Login: LoginView,
        LoggedIn: LoggedInNavigator
    },
    {
        initialRouteName: 'Login'
    }
);