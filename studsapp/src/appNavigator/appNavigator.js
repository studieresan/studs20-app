import React from 'react';
import { View, Text } from 'react-native';

class AppNavigator extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.status}</Text>
            </View>
        );
    }
}

export default AppNavigator;