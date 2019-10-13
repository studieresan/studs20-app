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
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'studsapp/generalComponents/button';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { getDate } from 'studsapp/utils/utilityFunctions';

const imageSource = 'studsapp/static/images/logo.png';

class EventView extends React.Component {
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
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.wrapper}>
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
                    {event.privateDescription.length > 0 &&
                        <View style={styles.description}>
                            <ScrollView>
                                <Text style={styles.descriptionText}>{event.privateDescription}</Text>
                            </ScrollView>
                        </View>
                    }
                    {(event.beforeSurveys.length > 0 || event.afterSurveys.length > 0) &&
                        <View>
                            {event.beforeSurveys.length > 0 &&
                                <Button
                                    text={'Pre-event form'}
                                    onPress={() => {
                                        Linking.openURL(event.beforeSurveys[0]);
                                    }}
                                />
                            }
                            {event.afterSurveys.length > 0 &&
                                <Button
                                    text={'Post-event form'}
                                    onPress={() => {
                                        Linking.openURL(event.afterSurveys[0]);
                                    }}
                                />
                            }
                        </View>
                    }
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
    backArrow: {
        color: '#fac882'
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
        borderBottomColor: '#1c436a',
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
        color: '#fac882'
    },
    description: {
        flex: 1,
        marginBottom: 5
    },
    descriptionText: {
        padding: 20,
        color: '#fac882'
    }
});

export default EventView;