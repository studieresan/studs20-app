import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    View,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class EventListView extends React.Component {
    //TODO: Actual stuff
    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.wrapper}>
                <View style={styles.top}>
                    <Text style={styles.title}>Events</Text>
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
        fontSize: 40
    },
    top: {
        flex: 0.25,
        justifyContent: 'center'
    },
    bottom: {
        flex: 0.75,
        paddingTop: 25
    }
});

export default EventListView;