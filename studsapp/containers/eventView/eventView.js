import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableHighlight,
    Image,
    Linking,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'studsapp/generalComponents/button';
import MapboxGL from '@react-native-mapbox-gl/maps';

const imageSource = 'studsapp/static/images/logo.png';

class EventView extends React.Component {
    getEvent = () => {
        return this.props.events.data[this.props.navigation.getParam('eventID')];
    }

    getDate = () => {
        const event = this.getEvent();
        const year = event.date.getFullYear();
        const month = event.date.getMonth();
        const monthString = month < 10 ? '0' + month : month;
        const day = event.date.getDate();
        const dayString = day < 10 ? '0' + day : day;
        return year + '-' + monthString + '-' + dayString;
    }

    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.wrapper}>
                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>{this.getEvent().companyName}</Text>
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
                        <View style={{ width: window.width, height: window.height / 5 }}>
                            <MapboxGL.MapView style={{ flex: 1 }}>
                                <MapboxGL.Camera defaultSettings={{
                                    centerCoordinate: this.getEvent().coordinates,
                                    zoomLevel: 13
                                }} />
                                <MapboxGL.PointAnnotation
                                    id={'location'}
                                    title={this.getEvent().location}
                                    coordinate={this.getEvent().coordinates}
                                />
                            </MapboxGL.MapView>
                        </View>
                        <Text style={styles.whenInformation}>{this.getEvent().location}</Text>
                        <Text style={styles.whenInformation}>{this.getDate()}</Text>
                    </View>
                    {this.getEvent().privateDescription.length > 0 &&
                        <View style={styles.description}>
                            <ScrollView>
                                <Text style={styles.descriptionText}>{this.getEvent().privateDescription}</Text>
                            </ScrollView>
                        </View>
                    }
                    {(this.getEvent().beforeSurveys.length > 0 || this.getEvent().afterSurveys.length > 0) &&
                        <View style={styles.forms}>
                            {this.getEvent().beforeSurveys.length > 0 &&
                                <Button
                                    text={'Pre-event form'}
                                    onPress={() => {
                                        Linking.openURL(this.getEvent().beforeSurveys[0]);
                                    }}
                                />
                            }
                            {this.getEvent().afterSurveys.length > 0 &&
                                <Button
                                    text={'Post-event form'}
                                    onPress={() => {
                                        Linking.openURL(this.getEvent().afterSurveys[0]);
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
        justifyContent: 'space-between',
        alignItems: 'stretch'
    },
    location: {
        flex: 0.4,
        alignItems: 'center',
        marginBottom: 5
    },
    whenInformation: {
        fontSize: 16,
        color: '#fac882'
    },
    forms: {
        flex: 0.25
    },
    description: {
        flex: 0.35,
        marginBottom: 5
    },
    descriptionText: {
        padding: 20,
        color: '#fac882'
    }
});

export default EventView;