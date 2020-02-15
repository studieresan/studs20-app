import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconButton} from 'studsapp/generalComponents';
import {getTopScores} from 'studsapp/containers/gameView/gameController';

const logoSource = 'studsapp/static/images/logo-small.png';
const backgroundSource = 'studsapp/static/images/background.png';
const placeholderSource = 'studsapp/static/images/profile-placeholder.png';
const window = Dimensions.get('window');

const HighScoreRow = ({placing, picture, name, score}) => (
    <View style={styles.rowWrapper}>
        <View style={styles.placingAndImageWrapper}>
            <Text style={styles.placingText}>{placing}</Text>

            <Image
                style={styles.image}
                source={{uri: picture}}
                defaultSource={require(placeholderSource)}
            />
            <Text style={styles.nameText}>{name}</Text>
        </View>
        <Text style={styles.scoreText}>{score}</Text>
    </View>
);

class HighscoresView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highscores: [],
            offline: false,
        };
    }
    componentDidMount() {
        getTopScores()
            .then(result => this.setState({highscores: result, offline: false}))
            .catch(() => this.setState({offline: true}));
    }

    render() {
        const leader =
            this.state.highscores.length !== 0
                ? this.state.highscores[0]
                : null;
        const highscores = this.state.highscores
            .slice(1)
            .map((s, idx) => ({...s, placing: idx + 2}));

        return (
            <ImageBackground
                source={require(backgroundSource)}
                style={styles.imageBackground}>
                <View style={styles.top}>
                    <Image source={require(logoSource)} style={styles.logo} />
                    <Text style={styles.title}>Highscores</Text>
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon="ios-arrow-back"
                        style={styles.back}
                    />
                </View>
                <View style={styles.firstPlaceCard}>
                    {this.state.offline && (
                        <Icon
                            style={{flex: 1, textAlign: 'center'}}
                            name={'ios-thunderstorm'}
                            size={80}
                            color={'white'}></Icon>
                    )}
                    {!this.state.offline && [
                        <Icon
                            style={{flex: 1, textAlign: 'center'}}
                            name={'md-trophy'}
                            size={45}
                            color={'gold'}></Icon>,
                        <View style={{flex: 1}}>
                            <Image
                                style={styles.firstPlaceImage}
                                source={{
                                    uri: leader && leader.picture,
                                }}
                                defaultSource={require(placeholderSource)}
                            />
                            <Text style={styles.firstPlaceName}>
                                {leader && leader.name}
                            </Text>
                        </View>,
                        <Text style={styles.firstPlaceScore}>
                            {leader && leader.score}
                        </Text>,
                    ]}
                </View>
                <View style={styles.bottom}>
                    {this.state.offline && (
                        <View style={styles.offlineTextWrapper}>
                            <Text style={styles.title}>Whoops!</Text>
                            <Text style={[styles.title, {fontSize: 14}]}>
                                Kan inte se highscores om du e offline...
                            </Text>
                        </View>
                    )}
                    {!this.state.offline && (
                        <FlatList
                            data={highscores}
                            keyExtractor={item => item.name}
                            renderItem={({item}) => HighScoreRow(item)}
                        />
                    )}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {flex: 1, alignItems: 'center'},
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
    rowWrapper: {
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
        paddingVertical: 8,
        flexDirection: 'row',
    },
    placingAndImageWrapper: {flex: 0.5, flexDirection: 'row'},
    placingText: {
        color: 'white',
        fontFamily: 'Raleway-Bold',
        fontSize: 20,
        paddingLeft: (window.width * 0.15) / 2,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    image: {
        height: 48,
        width: 48,
        borderRadius: 100,
        marginHorizontal: 20,
    },
    nameText: {
        color: 'white',
        fontFamily: 'Raleway',
        fontSize: 16,
        textAlignVertical: 'center',
    },
    scoreText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Raleway',
        textAlignVertical: 'center',
        textAlign: 'right',
        paddingRight: (window.width * 0.15) / 2,
        flex: 0.5,
    },
    back: {
        position: 'absolute',
        top: window.height / 16,
        left: 3,
        alignItems: 'center',
    },
    firstPlaceCard: {
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
    },
    firstPlaceImage: {
        height: 65,
        width: 65,
        borderRadius: 100,
        marginHorizontal: 20,
    },
    firstPlaceName: {
        color: 'white',
        fontFamily: 'Raleway',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
    },
    firstPlaceScore: {
        flex: 1,
        color: 'white',
        fontFamily: 'Raleway',
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottom: {
        flex: 0.55,
        width: window.width,
        borderTopWidth: 1,
        borderTopColor: '#b3d4d6',
    },
    offlineTextWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default HighscoresView;
