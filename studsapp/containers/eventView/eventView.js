import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    FlatList,
    TouchableHighlight,
    Image,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const imageSource = 'studsapp/static/images/logo.png';

class EventView extends React.Component {
    getEvent = () => {
        return this.props.events.data[this.props.navigation.getParam('eventID')];
    }

    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.wrapper}>
                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>{this.getEvent().companyName}</Text>
                </View>
                <View style={styles.bottom}>

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
    bottom: {
        flex: 0.75,
    }
});

export default EventView;