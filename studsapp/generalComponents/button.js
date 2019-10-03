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
                underlayColor='rgba(255,255,255,0.3)'
            >
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'hsla(0,0%,100%,.1)',
        borderRadius: 100,
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderWidth: 3,
        borderColor: '#fac882',
        marginVertical: 5,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fac882',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});