import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AppNavigator from './appNavigator'

const mapStateToProps = (state) => {
    const status = state.root.status;
    return {
        status
    };
};

export default connect(mapStateToProps)(AppNavigator);