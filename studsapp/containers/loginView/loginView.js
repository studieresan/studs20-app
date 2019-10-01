import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Text,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'studsapp/generalComponents/button';

const imageSource = 'studsapp/static/images/logo.png';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    validateEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    login = () => {
        Keyboard.dismiss();
        if(this.validateEmail(this.state.email)) {
            this.props.attemptLogin(this.state.email, this.state.password);
            this.setState({ errorMessage: '' });
        } else {
            this.setState({ errorMessage: 'Please enter a valid email address.' });
        }
    }

    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.top}>
                <KeyboardAvoidingView style={styles.top} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <TextInput
                        placeholder={'Email'}
                        placeholderTextColor={'#c4a57a'}
                        style={styles.input}
                        returnKeyType={'next'}
                        onSubmitEditing={() => { this.passwordInput.focus(); }}
                        blurOnSubmit={false}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        placeholder={'Password'}
                        placeholderTextColor={'#c4a57a'}
                        secureTextEntry={true}
                        style={styles.input}
                        ref={(input) => { this.passwordInput = input; }}
                        returnKeyType={'go'}
                        onSubmitEditing={() => this.login()}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                    <Button text={'Login'} onPress={() => this.login()} />
                    <View>
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    </View>
                </KeyboardAvoidingView>
            </LinearGradient>
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
        paddingLeft: 5,
        marginVertical: 5,
        color: '#fac882'
    },
    errorMessage: {
        marginVertical: 5,
        color: 'red',
        fontSize: 16
    }
});

export default LoginView;