import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'studsapp/store/createStore';
import AppNavigator from 'studsapp/containers/appNavigator/appNavigatorContainer';
import { createAppContainer } from 'react-navigation';

export default class App extends React.Component {
    render() {
        const AppContainer = createAppContainer(AppNavigator);
        return(
            <Provider store={createStore()}>
                <AppContainer/>
            </Provider>
        );
    }
}