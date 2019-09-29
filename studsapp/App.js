import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import createStore from './src/store/createStore'
import AppNavigator from './src/appNavigator/appNavigatorContainer'

export default class App extends React.Component {
    render() {
        return(
            <Provider store={createStore()}>
                <AppNavigator/>
            </Provider>
        );
    }
}