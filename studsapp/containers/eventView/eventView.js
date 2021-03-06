import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableHighlight,
    Image,
    Linking,
    ScrollView,
    Platform,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'studsapp/generalComponents/button';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { getDate, minuteDifference } from 'studsapp/utils/utilityFunctions';
import { isSuccess, isUpdating, isError } from 'studsapp/store/constants';

const imageSource = 'studsapp/static/images/logo-small.png';
const backgroundSource = 'studsapp/static/images/background.png'

class EventView extends React.Component {
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            if(isError(this.props.events)) {
                this.props.getEventDetails(this.props.navigation.getParam('eventID'));
            }
        });
    }

    getEvent = () => {
        return this.props.events.data[this.props.navigation.getParam('eventID')];
    }

    openMap = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const location = this.getEvent().location;
        const url = scheme + location;

        Linking.openURL(url);
    }

    render() {
        const event = this.getEvent();
        return (
            <ImageBackground source={require(backgroundSource)} style={styles.wrapper}>
                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>{event.companyName}</Text>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.goBack()}
                        underlayColor='rgba(255,255,255,0.0)'
                        style={styles.backArrowButton}
                    >
                        <Icon name='ios-arrow-round-back' size={60} style={styles.backArrow} />
                    </TouchableHighlight>
                </View>
                {isUpdating(this.props.events) &&
                    <View style={styles.bottom}>
                        <View style={{ padding: 50 }}>
                            <ActivityIndicator size='large' color='#fff' />
                        </View>
                    </View>
                }
                {isError(this.props.events) &&
                    <View style={styles.bottom}>
                        <View style={{ padding: 50 }}>
                            <Text style={styles.errorMessage}>{this.props.events.error}</Text>
                        </View>
                    </View>
                }
                {isSuccess(this.props.events) &&
                    <View style={styles.bottom}>
                        <View style={styles.location}>
                            <View style={styles.mapContainer}>
                                <TouchableHighlight
                                    onPress={() => this.openMap()}
                                    underlayColor='rgba(255,255,255,0.0)'
                                    style={styles.map}
                                >
                                    <MapboxGL.MapView
                                        style={styles.map}
                                        zoomEnabled={false}
                                        scrollEnabled={false}
                                        pitchEnabled={false}
                                        rotateEnabled={false}
                                    >
                                        <MapboxGL.Camera defaultSettings={{
                                            centerCoordinate: event.coordinates,
                                            zoomLevel: 13
                                        }} />
                                        <MapboxGL.PointAnnotation
                                            id={'location'}
                                            title={event.location}
                                            coordinate={event.coordinates}
                                        />
                                    </MapboxGL.MapView>
                                </TouchableHighlight>

                            </View>
                            <Text style={styles.whenInformation}>{event.location}</Text>
                            <Text style={styles.whenInformation}>{getDate(event.date)}</Text>
                        </View>
                        {minuteDifference(event.date, Date.now()) <= 60 &&
                            <TouchableHighlight
                                style={styles.checkIn}
                                onPress={() => {
                                    const eventId = this.props.navigation.getParam('eventID');
                                    this.props.getCheckInDetails(eventId);

                                    if (!isSuccess(this.props.members)) {
                                        this.props.getMembers();
                                    }

                                    this.props.navigation.navigate('CheckIn', {
                                        eventID: eventId
                                    });
                                }
                                }
                                underlayColor='rgba(255,255,255,0.3)'
                            >
                                <View style={styles.row}>
                                    <Text style={styles.checkInText}>{'Incheckning'}</Text>
                                    <Icon name='ios-arrow-forward' size={20} style={styles.checkInArrow} />
                                </View>
                            </TouchableHighlight>
                        }
                        {
                            event.privateDescription.length > 0 &&
                            <View style={styles.description}>
                                <ScrollView>
                                    <Text style={styles.descriptionText}>{event.privateDescription}</Text>
                                </ScrollView>
                            </View>
                        }
                        {
                            (event.beforeSurveys.length > 0 || event.afterSurveys.length > 0) &&
                            <View>
                                {event.beforeSurveys.length > 0 &&
                                    <Button
                                        text={'Pre-eventformulär'}
                                        onPress={() => {
                                            Linking.openURL(event.beforeSurveys[0]);
                                        }}
                                    />
                                }
                                {event.afterSurveys.length > 0 &&
                                    <Button
                                        text={'Post-eventformulär'}
                                        onPress={() => {
                                            Linking.openURL(event.afterSurveys[0]);
                                        }}
                                    />
                                }
                            </View>
                        }
                    </View>
                }
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
        fontFamily: 'Raleway-Black'
    },
    logo: {
        alignSelf: 'center',
        height: window.height / 12,
        resizeMode: 'contain',
    },
    backArrow: {
        color: '#fff'
    },
    backArrowButton: {
        position: 'absolute',
        top: window.height / 16,
        left: 10,
        width: 60,
        height: 60,
        alignItems: 'center'
    },
    top: {
        flex: 0.25,
        justifyContent: 'center',
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
    },
    bottom: {
        flex: 0.75,
        alignItems: 'stretch'
    },
    location: {
        alignItems: 'center',
        marginBottom: 5
    },
    mapContainer: {
        width: window.width,
        height: window.height / 5
    },
    map: {
        flex: 1
    },
    whenInformation: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Raleway-Regular'
    },
    checkIn: {
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
        borderTopWidth: 1,
        borderTopColor: '#b3d4d6',
        paddingVertical: 15,
        paddingLeft: 30,
    },
    row: {
        flexDirection: 'row'
    },
    checkInText: {
        color: '#fff',
        fontSize: 20,
        flex: 0.9,
        fontFamily: 'Raleway-Regular'
    },
    checkInArrow: {
        color: '#fff',
        flex: 0.1,
        paddingTop: 2
    },
    description: {
        flex: 1,
        marginBottom: 5
    },
    descriptionText: {
        padding: 20,
        color: '#fff',
        fontFamily: 'Raleway-Regular'
    },
    errorMessage: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
        fontFamily: 'Raleway-Regular'
    },
});

export default EventView;