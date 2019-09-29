import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    View, 
    TextInput,
    Text,
    Image,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class LoginView extends React.Component {
    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.top}>
                <Login/>
            </LinearGradient>
        );
    }
}

class Button extends React.Component {
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

class Login extends React.Component {
    render() {
        let imageSource = '../../static/images/logo.png';
        return (
            <KeyboardAvoidingView style={styles.top} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
                <Image source={require(imageSource)} style={styles.logo} />
                <TextInput
                    placeholder={'Email'}
                    placeholderTextColor={'#c4a57a'}
                    style={styles.input}
                    returnKeyType={'next'}
                    onSubmitEditing={() => { this.passwordInput.focus(); }}
                    blurOnSubmit={false}
                />
                <TextInput
                    placeholder={'Lösenord'}
                    placeholderTextColor={'#c4a57a'}
                    secureTextEntry={true}
                    style={styles.input}
                    ref={(input) => { this.passwordInput = input; }}
                    returnKeyType={'go'}
                    onSubmitEditing={() => { alert('Logged in!'); }}
                />
                <Button text={'Login'} onPress={() => { alert('Logged in!'); }}/>
            </KeyboardAvoidingView>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: window.height/4,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    input: {
        width: 2*window.width/3,
        borderWidth: 1,
        borderColor: '#fac882',
        borderRadius: 2,
        height: 50,
        marginVertical: 5,
        color: '#fac882'
    },
    button: {
        backgroundColor: 'hsla(0,0%,100%,.1)',
        borderRadius: 100,
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderWidth: 3,
        borderColor: '#fac882',
        marginVertical: 5
    },
    buttonText: {
        color: '#fac882',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
});

export default LoginView;