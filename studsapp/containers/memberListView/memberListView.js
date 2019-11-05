import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Image,
    ActivityIndicator,
    FlatList,
    Linking,
    ImageBackground
} from 'react-native';
import { isSuccess, isLoading, isInitial, isError } from 'studsapp/store/constants';

const imageSource = 'studsapp/static/images/logo-small.png';
const backgroundSource = 'studsapp/static/images/background.png';

class MemberListView extends React.Component {
    componentDidMount() {
        this.props.getMembers();
    }

    getMembersToList = () => {
        const members = this.props.members.data;

        const memberList = Object.keys(members).map(key => {
            return members[key];
        });

        return memberList.sort((a, b) => {
            if (a.profile.lastName.localeCompare(b.profile.lastName) === 0) {
                return a.profile.firstName.localeCompare(b.profile.firstName);
            }
            return a.profile.lastName.localeCompare(b.profile.lastName);
        });
    };

    render() {
        return (
            <ImageBackground source={require(backgroundSource)} style={styles.wrapper}>
                <View style={styles.top}>
                    <Image source={require(imageSource)} style={styles.logo} />
                    <Text style={styles.title}>Members</Text>
                </View>
                <View style={styles.bottom}>
                    {(isLoading(this.props.members) || isInitial(this.props.members)) &&
                        <View style={{ padding: 50 }}>
                            <ActivityIndicator size='large' color='#fff' />
                        </View>
                    }
                    {isError(this.props.members) &&
                        <View style={{ padding: 50 }}>
                            <Text style={styles.errorMessage}>{this.props.members.error}</Text>
                        </View>
                    }
                    {isSuccess(this.props.members) &&
                        <FlatList
                            data={this.getMembersToList()}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) =>
                                <View style={styles.member}>
                                    <View style={styles.memberName}>
                                        <Text style={styles.memberNameText}>{item.profile.firstName + ' ' + item.profile.lastName}</Text>
                                    </View>
                                    <View style={styles.memberInfo}>
                                        <Text
                                            onPress={() => {
                                                Linking.openURL('mailto:' + item.profile.email);
                                            }}
                                            style={styles.memberInfoText}
                                        >
                                            {item.profile.email}
                                        </Text>
                                        <Text
                                            onPress={() => {
                                                Linking.openURL('tel:' + item.profile.phone);
                                            }}
                                            style={styles.memberInfoText}
                                        >
                                            {item.profile.phone}
                                        </Text>
                                    </View>
                                </View>
                            }
                        />
                    }
                </View>
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
    member: {
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
        paddingVertical: 15,
        flexDirection: 'row',
    },
    memberName: {
        alignSelf: 'center',
        flex: 0.4,
        paddingLeft: 15
    },
    memberInfo: {
        alignSelf: 'center',
        flex: 0.6,
        paddingRight: 15
    },
    memberNameText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Raleway-Bold'
    },
    memberInfoText: {
        color: '#fff',
        textAlign: 'right',
        textDecorationLine: 'underline',
        fontFamily: 'Raleway-Regular'
    },
    errorMessage: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center'
    },
});

export default MemberListView;