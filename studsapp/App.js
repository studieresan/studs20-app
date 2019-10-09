import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'studsapp/store/createStore';
import AppNavigator from 'studsapp/containers/appNavigator/appNavigatorContainer';
import { createAppContainer } from 'react-navigation';
import { mapboxToken } from 'studsapp/utils/config';

import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(mapboxToken);

export default class App extends React.Component {
    componentDidMount() {
        MapboxGL.setTelemetryEnabled(false);
    }

    render() {
        const AppContainer = createAppContainer(AppNavigator);
        return (
            <Provider store={createStore()}>
                <AppContainer />
            </Provider>
        );
    }
}