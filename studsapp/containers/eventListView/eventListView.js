import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    FlatList,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import { isLoading, isError, isInitial } from 'studsapp/store/constants';
import Icon from 'react-native-vector-icons/Ionicons';

const imageSource = 'studsapp/static/images/logo-small.png';
const backgroundSource = 'studsapp/static/images/background.png';

class EventListView extends React.Component {
    componentDidMount() {
        this.props.getEvents();
    }

    getEventsToList = () => {
        const events = this.props.events.data;

        const eventList = Object.keys(events).map(key => {
            return events[key];
        });

        return eventList.sort((a, b) => a.date < b.date);
    };

    renderBottom = () => {
        if (isLoading(this.props.events) || isInitial(this.props.events)) {
            return (
                <View style={{ padding: 50 }}>
                    <ActivityIndicator size='large' color='#fff' />
                </View>
            );
        } else if (isError(this.props.events)) {
            return (
                <View style={{ padding: 50 }}>
                    <Text style={styles.errorMessage}>{this.props.events.error}</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={this.getEventsToList()}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <TouchableHighlight
                        style={styles.event}
                        onPress={() => this.props.navigation.navigate('Event', {
                            eventID: item.id
                        })}
                        underlayColor='rgba(255,255,255,0.3)'
                    >
                        <View style={styles.row}>
                            <Text style={styles.eventText}>{item.companyName}</Text>
                            <Icon name='ios-arrow-forward' size={20} style={styles.eventArrow} />
                        </View>
                    </TouchableHighlight>
                }
            />
        );
    }

    render() {
        return (
            <ImageBackground source={require(backgroundSource)} style={styles.wrapper}>
                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>Event</Text>
                </View>
                <View style={styles.bottom}>
                    {this.renderBottom()}
                </View>
            </ImageBackground>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center'
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
        borderBottomColor: '#b3d4d6'
    },
    bottom: {
        flex: 0.75,
    },
    event: {
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
        paddingVertical: 15,
        paddingLeft: 30,
    },
    row: {
        flexDirection: 'row'
    },
    eventText: {
        color: '#fff',
        fontSize: 20,
        flex: 0.9,
        fontFamily: 'Raleway-Regular'
    },
    errorMessage: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
        fontFamily: 'Raleway-Regular'
    },
    eventArrow: {
        color: '#fff',
        flex: 0.1,
        paddingTop: 2
    }
});

export default EventListView;