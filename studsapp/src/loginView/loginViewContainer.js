import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import LoginView from './loginView'

const mapStateToProps = (state) => {
    return {

    };
};

export default connect(mapStateToProps)(LoginView);