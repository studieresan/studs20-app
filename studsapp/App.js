import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import createStore from 'studsapp/store/createStore';
import AppNavigator from 'studsapp/containers/appNavigator/appNavigatorContainer';
import { createAppContainer } from 'react-navigation';
import { mapboxToken } from 'studsapp/utils/config';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(mapboxToken);

export default class App extends React.Component {
    componentDidMount() {
        MapboxGL.setTelemetryEnabled(false);
        changeNavigationBarColor('#8ad0d2', true);
    }

    render() {
        const AppContainer = createAppContainer(AppNavigator);
        return (
            <Provider store={createStore()}>
                <View style={{ flex: 1 }}>
                    <StatusBar
                        backgroundColor="rgba(255, 255, 255, 0)"
                        translucent
                        barStyle="light-content"
                    />
                    <AppContainer />
                </View>
            </Provider>
        );
    }
}