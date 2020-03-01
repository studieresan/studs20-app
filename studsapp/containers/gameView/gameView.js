import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {ImageButton, IconButton} from 'studsapp/generalComponents';
import Score from './scoreView/scoreView';
import {
    GAME_SETTINGS,
    load,
    createSaveTimers,
    ONE_SECOND_IN_MILLIS,
    localSave,
} from './gameController';
const _ = require('lodash');

const backgroundSource = 'studsapp/static/images/background.png';
const borderButtomSource = 'studsapp/static/images/border-button.png';

class GameView extends React.Component {
    subs = [];
    timers = [];
    constructor(props) {
        super(props);
        this.state = {
            score: GAME_SETTINGS.loading,
            powerUps: [0, 0, 0, 0, 0],
            clicking: false,
            streakCounter: 0,
            streak: 1,
        };

        this.stopClick = _.debounce(this.stopClick, ONE_SECOND_IN_MILLIS);
    }

    purchasePowerup = (index, cost, callback) => {
        if (cost <= this.state.score) {
            const newPowerUps = [...this.state.powerUps];
            newPowerUps[index]++;
            this.setState(
                {
                    powerUps: newPowerUps,
                    score: this.state.score - cost,
                },
                () => callback({...this.state}),
            );
        }
    };

    componentDidMount() {
        load().then(prevGameState => this.setState(prevGameState));

        this.subs = [
            this.props.navigation.addListener('didFocus', () => {
                this.timers.forEach(timer => clearInterval(timer));
                this.timers = createSaveTimers(() => this.state);
            }),

            this.props.navigation.addListener('willBlur', () => {
                this.timers.forEach(timer => clearInterval(timer));
                this.timers = [];
            }),
        ];

        if (this.timers.length === 0) {
            this.timers = createSaveTimers(() => this.state);
        }
    }

    componentWillUnmount() {
        this.timers.forEach(timer => clearInterval(timer));
        this.subs.forEach(sub => sub.remove());
    }

    click = () => {
        const newStreakCounter =
            (this.state.streakCounter + 1) %
            GAME_SETTINGS.clicksPerStreakIncrease;
        let newStreak = 1;
        if (this.state.powerUps[1] > 0) {
            newStreak = Math.min(
                GAME_SETTINGS.maxStreak * this.state.powerUps[1],
                this.state.streak + !newStreakCounter * this.state.powerUps[1],
            );
            if (this.state.streak == 1 && !newStreakCounter) {
                newStreak--;
            }
        }
        this.setState({
            score: this.state.score + newStreak * (this.state.powerUps[0] + 1),
            clicking: true,
            streakCounter: newStreakCounter,
            streak: newStreak,
        });
    };

    stopClick = () =>
        this.setState({
            clicking: false,
            streakCounter: 0,
            streak: 1,
        });

    render() {
        return (
            <ImageBackground
                source={require(backgroundSource)}
                style={styles.wrapper}>
                <View style={styles.header}>
                    <IconButton
                        onPress={() => {
                            this.props.navigation.navigate('Highscores');
                            localSave(this.state);
                        }}
                        style={styles.iconButton}
                        icon={'ios-stats'}
                    />
                    <IconButton
                        onPress={() => {
                            this.props.navigation.navigate('Shop', {
                                score: this.state.score,
                                powerUps: this.state.powerUps,
                                purchasePowerup: this.purchasePowerup,
                            });
                            localSave(this.state);
                        }}
                        style={styles.iconButton}
                        icon={'ios-cart'}
                    />
                </View>
                <View style={styles.scoreContainer}>
                    <Score {...this.state} />
                </View>

                <View style={styles.powerUps}>
                    <View>
                        <Text style={styles.text}>
                            {this.state.powerUps[1]}xFredde
                        </Text>
                    </View>

                    {this.state.score !== GAME_SETTINGS.loading && (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                            }}>
                            {[
                                <Text style={styles.text}>
                                    {this.state.powerUps[0]}xMarko
                                </Text>,
                                <Text style={styles.text}>
                                    {this.state.powerUps[2]}xAnton
                                </Text>,
                            ]}
                        </View>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <ImageButton
                        onPress={() => {
                            this.click();
                            this.stopClick();
                        }}
                        source={require(borderButtomSource)}
                        text={'x' + (this.state.powerUps[0] + 1)}
                    />
                </View>
            </ImageBackground>
        );
    }
}

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
        zIndex: 100,
    },
    scoreContainer: {
        flex: 0.15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
    },
    powerUps: {
        flex: 0.35,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0.35,
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
    iconButton: {
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});

export default GameView;
