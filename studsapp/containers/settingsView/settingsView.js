import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image,
    ImageBackground,
    Switch,
} from 'react-native';
import {Button, IconButton} from 'studsapp/generalComponents';
import Icon from 'react-native-vector-icons/Ionicons';

const imageSource = 'studsapp/static/images/logo-small.png';
const backgroundSource = 'studsapp/static/images/background.png';

class SettingsView extends React.Component {
    logOut = () => {
        this.props.removeLoginDetails();
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
            <ImageBackground
                source={require(backgroundSource)}
                style={styles.wrapper}>
                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>Inställningar</Text>
                </View>
                <View style={styles.middle}>
                    <View style={styles.categoryTitleWrapper}>
                        <Icon
                            name="logo-game-controller-b"
                            size={25}
                            color="white"
                        />
                        <Text style={styles.categoryText}>Spel</Text>
                    </View>

                    <View style={styles.settingRowWrapper}>
                        <Text style={styles.settingText}>Offline läge</Text>
                        <Switch
                            value={this.props.offlineMode}
                            onValueChange={v => this.props.setOfflineMode(v)}
                        />
                    </View>

                    <View style={styles.categoryTitleWrapper}>
                        <Icon name="md-person" size={25} color="white" />
                        <Text style={styles.categoryText}>Konto</Text>
                    </View>

                    <View style={styles.settingRowWrapper}>
                        <Text style={styles.settingText}>Logga ut</Text>
                        <IconButton
                            icon="ios-exit"
                            onPress={() => this.logOut()}
                            size={28}
                            style={{paddingHorizontal: 10}}
                        />
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Text style={styles.version}>Studs Version 1.0.1</Text>
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
        fontFamily: 'Raleway-Black',
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
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
        paddingHorizontal: 25,
    },
    bottom: {
        flex: 0.05,
        justifyContent: 'center',
    },
    categoryTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 25,
    },
    version: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Raleway-Regular',
    },
    categoryText: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Raleway-Black',
        fontSize: 20,
        marginLeft: 6,
    },
    settingRowWrapper: {
        backgroundColor: '#b3d4d6',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 5,
        padding: 12,
        shadowColor: '#b3d4d6',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.34,
        shadowRadius: 6,
        elevation: 10,
    },
    settingText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SettingsView;
