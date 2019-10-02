import { createSwitchNavigator } from 'react-navigation';
import LoginView from 'studsapp/containers/loginView/loginViewContainer';

export default createSwitchNavigator (
    {
        Login: LoginView
    },
    {
        initialRouteName: 'Login'
    }
);