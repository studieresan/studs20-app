import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class EventListView extends React.Component {
    //TODO: Actual stuff
    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.top}>
                
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