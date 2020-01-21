import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    Dimensions
} from 'react-native';

export default class Button extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={styles.button}
                underlayColor='#8ad0d2'
            >
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#387677',
        borderRadius: 100,
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderWidth: 3,
        borderColor: '#fff',
        marginVertical: 5,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Raleway-Bold',
        textTransform: 'uppercase'
    }
});