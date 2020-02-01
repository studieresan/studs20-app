import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    SectionList,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    ImageBackground,
    RefreshControl
} from 'react-native';
import { isLoading, isError, isInitial } from 'studsapp/store/constants';
import { minuteDifference } from 'studsapp/utils/utilityFunctions';
import Icon from 'react-native-vector-icons/Ionicons';

const imageSource = 'studsapp/static/images/logo-small.png';
const backgroundSource = 'studsapp/static/images/background.png';

class EventListView extends React.Component {
    componentDidMount() {
        this.props.getEvents();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            if(isError(this.props.events)) {
                this.props.getEvents();
            }
        });
    }

    getEventsToList = () => {
        const events = this.props.events.data;

        const eventList = Object.keys(events).map(key => {
            return events[key];
        });

        return eventList.sort((a, b) => a.date > b.date);
    };

    getEventsToSectionList = () => {
        const eventList = this.getEventsToList();

        const date = Date.now();
        const nextEvent = this.getNextEvent();

        const pastEventList = eventList.filter(event => {
            return minuteDifference(event.date, date) < 0 && event !== nextEvent;
        });
        const futureEventList = eventList.filter(event => {
            return minuteDifference(event.date, date) >= 0 && event !== nextEvent;
        });

        const eventSections = [
            {title: 'Framtida event', data: futureEventList},
            {title: 'Tidigare event', data: pastEventList},
        ];
        return eventSections;
    }

    getNextEvent = () => {
        const events = this.getEventsToList();

        let minimumMinuteDifference = Number.MAX_SAFE_INTEGER;
        let nextEvent = undefined;
        const date = Date.now();

        //Find next event, but include events that started up to three hours before
        events.forEach(event => {
            const minutesUntilEvent = minuteDifference(event.date, date);
            const ThreeHoursInMinutes = 3*60;
            if (Math.abs(minutesUntilEvent) < Math.abs(minimumMinuteDifference) && minutesUntilEvent >= -ThreeHoursInMinutes) {
                minimumMinuteDifference = minutesUntilEvent;
                nextEvent = event;
            }
        });
        return nextEvent;
    }

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

        const nextEvent = this.getNextEvent();
        return (
            <View style={styles.wrapper}>
                <View style={styles.nextEventWrapper}>
                    <Text style={styles.nextEventText}>{'Nästa event'}</Text>
                    <TouchableHighlight
                        style={styles.nextEvent}
                        onPress={() => {
                            this.props.navigation.navigate('Event', {
                                eventID: nextEvent.id
                            });
                            this.props.getEventDetails(nextEvent.id);
                        }
                        }
                        underlayColor='rgba(255,255,255,0.3)'
                    >
                        <View style={styles.row}>
                            <Text style={styles.eventText}>{nextEvent.companyName}</Text>
                            <Icon name='ios-arrow-forward' size={20} style={styles.eventArrow} />
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.bottom}>
                    <SectionList
                        sections={this.getEventsToSectionList()}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <TouchableHighlight
                                style={styles.event}
                                onPress={() => {
                                    this.props.navigation.navigate('Event', {
                                        eventID: item.id
                                    });
                                    this.props.getEventDetails(item.id);
                                }
                                }
                                underlayColor='rgba(255,255,255,0.3)'
                            >
                                <View style={styles.row}>
                                    <Text style={styles.eventText}>{item.companyName}</Text>
                                    <Icon name='ios-arrow-forward' size={20} style={styles.eventArrow} />
                                </View>
                            </TouchableHighlight>
                        }
                        renderSectionHeader={({ section }) => 
                            <View style={styles.futureOrPastEventWrapper}>
                                <Text style={styles.futureOrPastEventText}>{section.title}</Text>
                            </View>
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={this.props.getEvents}
                                colors={['#387677']}
                                progressBackgroundColor={'#8ad0d2'}
                                tintColor={'#fff'}
                            />
                        }
                        stickySectionHeadersEnabled={false}
                    />
                </View>
            </View>
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
    nextEventWrapper: {
        flex: 0.25,
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
    },
    nextEventText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Raleway-Black',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    nextEvent: {
        width: window.width,
        borderTopWidth: 1,
        borderTopColor: '#b3d4d6',
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
        paddingVertical: 15,
        paddingLeft: 30,
    },
    futureOrPastEventWrapper: {
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
    },
    futureOrPastEventText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Raleway-Black',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    event: {
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
        paddingVertical: 15,
        paddingLeft: 30
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