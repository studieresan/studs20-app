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
import { status } from 'studsapp/store/constants';
import Icon from 'react-native-vector-icons/Ionicons';

const imageSource = 'studsapp/static/images/logo.png';

class EventListView extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.getEvents();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            switch (this.props.events.status) {
                case status.LOADING:

                    break;
                case status.SUCCESS:
                    
                    break;
                case status.ERROR:
                    
                    break;
            }
        }
    }

    _renderBottom = () => {
        if(this.props.events.status === status.LOADING) {
            return (
                <View style={{padding: 50}}>
                    <ActivityIndicator size='large' color='#fac882' />
                </View>
            );
        }

        return (
            <FlatList
                data={[]}
                renderItem={({ item }) =>
                    <TouchableHighlight
                        style={styles.event}
                        onPress={() => alert('HEJ!')}
                        underlayColor='rgba(255,255,255,0.3)'
                    >
                        <View style={styles.row}>
                            <Text style={styles.eventText}>{item.key}</Text>
                            <Icon name='ios-arrow-forward' size={20} style={styles.eventArrow} />
                        </View>
                    </TouchableHighlight>
                }
            />
        );
    }

    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.wrapper}>

                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>Events</Text>
                </View>
                <View style={styles.bottom}>
                    {this._renderBottom()}
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
    },
    event: {
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#1c436a',
        paddingVertical: 15,
        paddingLeft: 30,
    },
    row: {
        flexDirection: 'row'
    },
    eventText: {
        color: '#fac882',
        fontSize: 20,
        flex: 0.9
    },
    eventArrow: {
        color: '#fac882',
        flex: 0.1,
        paddingTop: 2
    }
});

export default EventListView;