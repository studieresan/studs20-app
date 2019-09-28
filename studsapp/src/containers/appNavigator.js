import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class AppNavigator extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.root.status}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { root } = state
    return { root };
};

export default connect(mapStateToProps)(AppNavigator);