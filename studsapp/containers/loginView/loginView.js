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
    View,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import Button from 'studsapp/generalComponents/button';
import { status, isLoading } from 'studsapp/store/constants';
import { storeData } from 'studsapp/utils/storage';

const logoSource = 'studsapp/static/images/logo.png';
const backgroundSource = 'studsapp/static/images/background.png';

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

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            switch (this.props.login.status) {
                case status.LOADING:
                    this.setState({ errorMessage: '' });
                    break;
                case status.SUCCESS:
                    if (this.props.login.data.success) {
                        this.setState({ errorMessage: '' });
                        this.storeLoginDetails(this.props.login.data);
                        this.props.navigation.navigate('LoggedIn');
                    } else {
                        this.setState({ errorMessage: 'Email-addressen eller lösenordet är ogiltigt.' });
                    }
                    break;
                case status.ERROR:
                    this.setState({ errorMessage: this.props.login.error });
                    break;
            }
        }
    }

    storeLoginDetails = async (data) => {
        const tokenSuccess = await storeData('token', data.token);
        const idSuccess = await storeData('id', data.id);
        return tokenSuccess && idSuccess;
    }

    login = () => {
        Keyboard.dismiss();

        //First validate email
        if (this.validateEmail(this.state.email)) {
            //Then validate password
            if (this.state.password.length > 0) {
                this.props.attemptLogin(this.state.email, this.state.password);
            } else {
                this.setState({ errorMessage: 'Fyll i ett lösenord.' });
            }
        } else {
            this.setState({ errorMessage: 'Fyll i en email-address.' });
        }
    }

    renderButton = () => {
        if (isLoading(this.props.login)) {
            return (
                <View style={styles.buttonView}>
                    <View style={{ paddingVertical: 10 }}>
                        <ActivityIndicator size='large' color='#fff' />
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.buttonView}>
                <Button text={'Logga in'} onPress={() => this.login()} />
                <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            </View>
        );
    };

    render() {
        return (
            <ImageBackground source={require(backgroundSource)} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={styles.top} behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
                    <Image source={require(logoSource)} style={styles.logo} />
                    <TextInput
                        placeholder={'Email'}
                        placeholderTextColor={'#fff'}
                        style={styles.input}
                        returnKeyType={'next'}
                        onSubmitEditing={() => { this.passwordInput.focus(); }}
                        blurOnSubmit={false}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        placeholder={'Lösenord'}
                        placeholderTextColor={'#fff'}
                        secureTextEntry={true}
                        style={styles.input}
                        ref={(input) => { this.passwordInput = input; }}
                        returnKeyType={'go'}
                        onSubmitEditing={() => this.login()}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                    {this.renderButton()}
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: window.height / 4,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    input: {
        width: 2 * window.width / 3,
        borderWidth: 1,
        borderColor: '#387677',
        borderRadius: 2,
        height: 50,
        paddingLeft: 5,
        marginVertical: 5,
        color: '#fff',
        fontFamily: 'Raleway-Regular'
    },
    errorMessage: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
        fontFamily: 'Raleway-Regular'
    },
    buttonView: {
        height: 75,
        marginVertical: 5
    }
});

export default LoginView;