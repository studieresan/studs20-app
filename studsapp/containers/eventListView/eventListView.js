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

class EventListView extends React.Component {
    constructor(props) {
        super(props);
    }

    logOut = () => {
        removeData('token');
        this.props.navigation.navigate('Login');
    }

    //TODO: Actual stuff
    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.top}>
                <View>
                    <Button text={'Log out'} onPress={() => this.logOut()} />
                </View>
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
    }
});

export default EventListView;