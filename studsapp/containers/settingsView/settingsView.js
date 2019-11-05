import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image,
    ImageBackground
} from 'react-native';
import Button from 'studsapp/generalComponents/button';

const imageSource = 'studsapp/static/images/logo-small.png';
const backgroundSource = 'studsapp/static/images/background.png';

class SettingsView extends React.Component {
    logOut = () => {
        this.props.removeLoginToken();
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <ImageBackground source={require(backgroundSource)} style={styles.wrapper}>
                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>Settings</Text>
                </View>
                <View style={styles.middle}>
                    <View style={{ padding: 40 }}>
                        <Button text={'Log out'} onPress={() => this.logOut()} />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.version}>Studs App Version 0.0.1</Text>
                </View>
            </ImageBackground>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Raleway-Black'
    },
    logo: {
        alignSelf: 'center',
        height: window.height / 12,
        resizeMode: 'contain',
    },
    top: {
        flex: 0.25,
        justifyContent: 'center',
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
    },
    middle: {
        flex: 0.7,
    },
    bottom: {
        flex: 0.05,
    },
    version: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Raleway-Regular'
    }
});

export default SettingsView;