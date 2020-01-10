import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableHighlight,
    Image,
    ImageBackground,
    ActivityIndicator,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { hasData, isSuccess, isUpdating, isError, isLoading } from 'studsapp/store/constants';
import Button from 'studsapp/generalComponents/button';

const imageSource = 'studsapp/static/images/logo-small.png';
const backgroundSource = 'studsapp/static/images/background.png'

class CheckInView extends React.Component {
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            if(isError(this.props.events)) {
                this.props.getCheckInDetails(this.props.navigation.getParam('eventID'));
            }
            if(isError(this.props.members)) {
                this.props.getMembers();
            }
        });
    }

    getEvent = () => {
        return this.props.events.data[this.props.navigation.getParam('eventID')];
    }

    getLoggedInUserID = () => {
        return this.props.login.data.id;
    }

    getUsersToList = (users) => {
        const userList = users.map(user => {
            return this.props.members.data[user.id];
        });

        return userList.sort((a, b) => {
            if (a.profile.lastName.localeCompare(b.profile.lastName) === 0) {
                return a.profile.firstName.localeCompare(b.profile.firstName);
            }
            return a.profile.lastName.localeCompare(b.profile.lastName);
        });
    };

    hasCheckInData = () => {
        const event = this.getEvent();
        if (event !== undefined) {
            return event.checkedInUsers !== undefined && event.notCheckedInUsers !== undefined;
        }
        return false;
    }

    checkIn = async (eventId) => {
        const checkedIn = await this.props.checkIn(eventId);
        if (checkedIn) {
            await this.props.getCheckInDetails(eventId);
        }
    }

    userCheckedIn = () => {
        const event = this.getEvent();
        const userID = this.getLoggedInUserID();
        let foundUser = false;
        if (this.hasCheckInData()) {
            event.checkedInUsers.forEach(user => {
                if (user.id === userID) {
                    foundUser = true;
                }
            });
        }
        return foundUser;
    }

    render() {
        const event = this.getEvent();
        return (
            <ImageBackground source={require(backgroundSource)} style={styles.wrapper}>
                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>{'Incheckning'}</Text>
                    <TouchableHighlight
                        onPress={() => this.props.navigation.goBack()}
                        underlayColor='rgba(255,255,255,0.0)'
                        style={styles.backArrowButton}
                    >
                        <Icon name='ios-arrow-round-back' size={60} style={styles.backArrow} />
                    </TouchableHighlight>
                </View>
                {(isLoading(this.props.members)) &&
                    <View style={styles.bottom}>
                        <View style={{ padding: 50 }}>
                            <ActivityIndicator size='large' color='#fff' />
                        </View>
                    </View>
                }
                {isError(this.props.members) &&
                    <View style={styles.bottom}>
                        <View style={{ padding: 50 }}>
                            <Text style={styles.errorMessage}>{this.props.members.error}</Text>
                        </View>
                    </View>
                }
                {hasData(this.props.events) && hasData(this.props.members) && this.hasCheckInData() &&
                    <View style={styles.bottom}>
                        <View style={styles.row}>
                            <View style={styles.notCheckedIn}>
                                <Text style={styles.listTitle}>{'Ej incheckade'}</Text>
                                <View style={styles.list}>
                                    <FlatList
                                        data={this.getUsersToList(event.notCheckedInUsers)}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) =>
                                            <View style={styles.listItem}>
                                                {item.id === this.getLoggedInUserID() &&
                                                    <Text style={styles.userCheckInText}>
                                                        {item.profile.firstName + ' ' + item.profile.lastName}
                                                    </Text>
                                                }
                                                {item.id !== this.getLoggedInUserID() &&
                                                    <Text style={styles.checkInText}>
                                                        {item.profile.firstName + ' ' + item.profile.lastName}
                                                    </Text>
                                                }
                                            </View>
                                        }
                                    />
                                </View>
                            </View>
                            <View style={styles.checkedIn}>
                                <Text style={styles.listTitle}>{'Incheckade'}</Text>
                                <View style={styles.list}>
                                    <FlatList
                                        data={this.getUsersToList(event.checkedInUsers)}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item }) =>
                                            <View style={styles.listItem}>
                                                {item.id === this.getLoggedInUserID() &&
                                                    <Text style={styles.userCheckInText}>
                                                        {item.profile.firstName + ' ' + item.profile.lastName}
                                                    </Text>
                                                }
                                                {item.id !== this.getLoggedInUserID() &&
                                                    <Text style={styles.checkInText}>
                                                        {item.profile.firstName + ' ' + item.profile.lastName}
                                                    </Text>
                                                }
                                            </View>
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                        {isUpdating(this.props.events) &&
                            <View style={styles.buttonView}>
                                <View style={{ padding: 50 }}>
                                    <ActivityIndicator size='large' color='#fff' />
                                </View>
                            </View>
                        }
                        {isError(this.props.events) &&
                            <View style={styles.buttonView}>
                                <View style={{ padding: 50 }}>
                                    <Text style={styles.errorMessage}>{this.props.events.error}</Text>
                                </View>
                            </View>
                        }
                        {isSuccess(this.props.events) && !this.userCheckedIn() &&
                            <View style={styles.buttonView}>
                                <Button
                                    text={'Checka in'}
                                    onPress={() => {
                                        const event = this.getEvent();
                                        this.checkIn(event.id);
                                    }}
                                />
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
        flex: 1
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 0.75
    },
    notCheckedIn: {
        flex: 0.45,
        flexDirection: 'column',
    },
    checkedIn: {
        flex: 0.45,
        flexDirection: 'column'
    },
    listTitle: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Raleway-Regular',
        fontSize: 18,
        flex: 0.1,
        marginTop: 10
    },
    list: {
        flex: 0.9,
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
        paddingTop: 2,
        paddingBottom: 2,
        width: 9 * window.width / 20,
        backgroundColor: '#ffffff60'
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingTop: 1,
        paddingBottom: 1
    },
    userCheckInText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Raleway-Bold',
        fontSize: 14
    },
    checkInText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Raleway-Regular',
        fontSize: 12
    },
    buttonView: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessage: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
        fontFamily: 'Raleway-Regular'
    },
});

export default CheckInView;