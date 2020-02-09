import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    FlatList,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const logoSource = 'studsapp/static/images/logo-small.png';
const backgroundSource = 'studsapp/static/images/background.png';
const placeholderSource = 'studsapp/static/images/profile-placeholder.png';
const window = Dimensions.get('window');

const LeaderboardRow = ({placing, picture, name, score}) => (
    <View
        style={{
            width: window.width,
            borderBottomWidth: 1,
            borderBottomColor: '#b3d4d6',
            paddingVertical: 8,
            flexDirection: 'row',
        }}>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
            <Text
                style={{
                    color: 'white',
                    fontFamily: 'Raleway-Bold',
                    fontSize: 20,
                    paddingLeft: (window.width * 0.15) / 2,
                    textAlign: 'center',
                    textAlignVertical: 'center',
                }}>
                {placing}
            </Text>

            <Image
                style={{
                    height: 48,
                    width: 48,
                    borderRadius: 100,
                    marginHorizontal: 20,
                }}
                source={{uri: picture}}
                defaultSource={require(placeholderSource)}
            />
            <Text
                style={{
                    color: 'white',
                    fontFamily: 'Raleway',
                    fontSize: 16,
                    textAlignVertical: 'center',
                }}>
                {name}
            </Text>
        </View>
        <Text
            style={{
                color: 'white',
                fontSize: 17,
                fontFamily: 'Raleway',
                textAlignVertical: 'center',
                textAlign: 'right',
                paddingRight: (window.width * 0.15) / 2,
                flex: 0.5,
            }}>
            {score}
        </Text>
    </View>
);

class HighscoresView extends React.Component {
    render() {
        return (
            <ImageBackground
                source={require(backgroundSource)}
                style={{flex: 1, alignItems: 'center'}}>
                <View style={styles.top}>
                    <Image source={require(logoSource)} style={styles.logo} />
                    <Text style={styles.title}>Leaderboard</Text>
                </View>
                <View
                    style={{
                        width: window.width * 0.9,
                        flex: 0.2,
                        backgroundColor: '#f96c6b',
                        marginVertical: 10,
                        borderRadius: 12,
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        shadowColor: '#f96c6b',
                        shadowOffset: {width: 0, height: 5},
                        shadowOpacity: 0.34,
                        shadowRadius: 6,
                        elevation: 10,
                    }}>
                    <Icon
                        style={{flex: 1, textAlign: 'center'}}
                        name={'md-trophy'}
                        size={45}
                        color={'gold'}></Icon>
                    <View style={{flex: 1}}>
                        <Image
                            style={{
                                height: 65,
                                width: 65,
                                borderRadius: 100,
                                marginHorizontal: 20,
                            }}
                            source={{
                                uri:
                                    'https://studs20.s3.eu-north-1.amazonaws.com/BWPortraits/BDS69.jpg',
                            }}
                            defaultSource={require(placeholderSource)}
                        />
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: 'Raleway',
                                fontSize: 14,
                                marginTop: 5,
                                textAlign: 'center',
                            }}>
                            Anton
                        </Text>
                    </View>
                    <Text
                        style={{
                            flex: 1,
                            color: 'white',
                            fontFamily: 'Raleway',
                            fontSize: 19,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}>
                        1337203
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.55,
                        borderTopWidth: 1,
                        borderTopColor: '#b3d4d6',
                    }}>
                    <FlatList
                        style={{}}
                        data={[
                            {
                                placing: 2,
                                picture:
                                    'https://studs20.s3.eu-north-1.amazonaws.com/BWPortraits/BDS69.jpg',
                                name: 'anton',
                                score: '1337',
                            },
                            {
                                placing: 3,
                                picture:
                                    'https://cdna.artstation.com/p/assets/images/images/000/282/854/large/hispter_final_FINAL.jpg?1415033893',
                                name: 'Fabienne',
                                score: '1336',
                            },
                        ]}
                        keyExtractor={item => item.name}
                        renderItem={({item}) => LeaderboardRow(item)}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Raleway-Black',
        marginTop: 10,
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
        borderBottomColor: '#b3d4d6',
    },
    bottom: {
        flex: 0.75,
    },
});

export default HighscoresView;
