import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    TextInput,
    Text,
    Image,
    TouchableHighlight,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../generalComponents/button';

class LoginView extends React.Component {
    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.top}>
                <Login/>
            </LinearGradient>
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
    }
});

export default LoginView;