import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    View,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from 'studsapp/generalComponents/button';
import { removeData } from 'studsapp/utils/storage';

class SettingsView extends React.Component {
    logOut = () => {
        removeData('token');
        this.props.navigation.navigate('Login');
    }

    //TODO: Actual stuff
    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.wrapper}>
                <View style={styles.top}>
                    <Text style={styles.title}>Settings</Text>
                </View>
                <View style={styles.middle}>
                    <Button text={'Log out'} onPress={() => this.logOut()} />
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
        fontSize: 40
    },
    top: {
        flex: 0.25,
        justifyContent: 'center'
    },
    middle: {
        flex: 0.7,
        padding: 40
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