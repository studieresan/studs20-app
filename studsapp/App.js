import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import createStore from 'studsapp/store/createStore'
import AppNavigator from 'studsapp/containers/appNavigator/appNavigatorContainer'

export default class App extends React.Component {
    render() {
        return(
            <Provider store={createStore()}>
                <AppNavigator/>
            </Provider>
        );
    }
}