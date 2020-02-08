import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {storeData, retrieveData, removeData} from 'studsapp/utils/storage';
import ImageButton from 'studsapp/generalComponents/imageButton';
import {updateGameState, fetchTopScores} from 'studsapp/utils/api';

const backgroundSource = 'studsapp/static/images/background.png';
const borderButtomSource = 'studsapp/static/images/border-button.png';

const GAME_SETTINGS = {
    saveIntervalSeconds: 15,
    loading: -1,
};

class GameView extends React.Component {
    saveTimeout = null;
    constructor(props) {
        super(props);
        this.state = {
            score: GAME_SETTINGS.loading,
            powerUps: [0, 0, 0],
        };
    }

    componentDidMount() {
        this.load();
        this.saveTimeout = setInterval(
            this.save,
            GAME_SETTINGS.saveIntervalSeconds * 1000,
        );
        fetchTopScores()
            .then(result => console.log(result))
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        clearInterval(this.saveTimeout);
    }

    load = async () => {
        const score = await retrieveData('score');
        const powerUps = await retrieveData('powerUps');
        if (score !== null && powerUps !== null) {
            this.setState({
                score: parseInt(score),
                powerUps: JSON.parse(powerUps),
            });
        } else {
            // TODO: try from backend
            this.setState({
                score: 0,
                powerUps: [0, 0, 0],
            });
        }
    };

    save = async () => {
        if (
            (await storeData('score', this.state.score.toString())) &&
            (await storeData('powerUps', JSON.stringify(this.state.powerUps)))
        ) {
            updateGameState(this.state)
                .then(result => console.log(result))
                .catch(e => console.error(e));
        } else {
            clearInterval(this.saveTimeout);
        }
    };

    render() {
        return (
            <ImageBackground
                source={require(backgroundSource)}
                style={styles.wrapper}>
                <View style={styles.header}>
                    <Icon
                        style={styles.icon}
                        name={'ios-stats'}
                        size={35}
                        color={'white'}
                    />
                    <Icon
                        style={styles.icon}
                        name={'ios-cart'}
                        size={35}
                        color={'white'}
                    />
                </View>
                <View style={styles.scoreContainer}>
                    {this.state.score === GAME_SETTINGS.loading && (
                        <Text style={styles.score}>Loading..</Text>
                    )}
                    {this.state.score !== GAME_SETTINGS.loading && (
                        <Text style={styles.score}>{this.state.score}</Text>
                    )}
                </View>

                <View style={styles.powerUps}>
                    {this.state.score !== GAME_SETTINGS.loading && [
                        <Text style={styles.text}>
                            {this.state.powerUps[0]}xMarko
                        </Text>,
                        <Text style={styles.text}>
                            {this.state.powerUps[0]}xFredde
                        </Text>,
                        <Text style={styles.text}>
                            {this.state.powerUps[0]}xAnton
                        </Text>,
                    ]}
                </View>
                <View style={styles.buttonContainer}>
                    <ImageButton
                        onPress={() =>
                            this.setState({score: this.state.score + 1})
                        }
                        source={require(borderButtomSource)}
                        text={'x' + (this.state.powerUps[0] + 1)}
                    />
                </View>
            </ImageBackground>
        );
    }
}

// const window = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    header: {
        flex: 0.15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    scoreContainer: {
        flex: 0.3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    score: {
        fontSize: 50,
        color: 'white',
    },
    powerUps: {
        flex: 0.2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0.35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
});

export default GameView;
