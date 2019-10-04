import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    View,
    Text,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'studsapp/generalComponents/button';

const imageSource = 'studsapp/static/images/logo.png';

class SettingsView extends React.Component {
    logOut = () => {
        this.props.removeLoginToken();
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.wrapper}>
                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>Settings</Text>
                </View>
                <View style={styles.middle}>
                    <View style={{padding: 40}}>
                        <Button text={'Log out'} onPress={() => this.logOut()} />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.version}>Studs App Version 0.0.1</Text>
                </View>
            </LinearGradient>
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
        color: '#fac882',
        fontSize: 30,
        textAlign: 'center'
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
        borderBottomColor: '#1c436a',
    },
    middle: {
        flex: 0.7,
    },
    bottom: {
        flex: 0.05,
    },
    version: {
        color: '#fac882',
        fontSize: 12
    }
});

export default SettingsView;