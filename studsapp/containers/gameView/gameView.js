import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import ImageButton from 'studsapp/generalComponents/imageButton';
import IconButton from 'studsapp/generalComponents/iconButton';
import {
    GAME_SETTINGS,
    load,
    createSaveTimers,
    getTopScores,
} from './gameController';

const backgroundSource = 'studsapp/static/images/background.png';
const borderButtomSource = 'studsapp/static/images/border-button.png';

class GameView extends React.Component {
    timers = [];
    constructor(props) {
        super(props);
        this.state = {
            score: GAME_SETTINGS.loading,
            powerUps: [0, 0, 0],
        };
    }

    componentDidMount() {
        load().then(preGameState => {
            this.setState(preGameState);
        });

        this.timers = createSaveTimers(() => this.state);

        getTopScores();
    }

    componentWillUnmount() {
        this.timers.forEach(timer => clearInterval(timer));
    }

    render() {
        return (
            <ImageBackground
                source={require(backgroundSource)}
                style={styles.wrapper}>
                <View style={styles.header}>
                    <IconButton
                        onPress={() =>
                            this.props.navigation.navigate('Highscores')
                        }
                        icon={'ios-stats'}
                    />
                    <IconButton
                        onPress={() => this.props.navigation.navigate('Shop')}
                        icon={'ios-cart'}
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
    text: {
        fontSize: 20,
        color: 'white',
    },
});

export default GameView;
