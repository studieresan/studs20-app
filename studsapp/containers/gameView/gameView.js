import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {ImageButton, IconButton} from 'studsapp/generalComponents';
import Score from './scoreView/scoreView';
import {
    GAME_SETTINGS,
    load,
    createSaveTimers,
    ONE_SECOND_IN_MILLIS,
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
        };

        this.stopClick = _.debounce(this.stopClick, ONE_SECOND_IN_MILLIS);
    }

    componentDidMount() {
        load().then(prevGameState => this.setState(prevGameState, () => console.log(this.state)));

        this.subs = [
            this.props.navigation.addListener('didFocus', () => {
                this.timers = createSaveTimers(() => this.state);
            }),

            this.props.navigation.addListener('willBlur', () => {
                this.timers.forEach(timer => clearInterval(timer));
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

    click = () => this.setState({score: this.state.score + 1, clicking: true});

    stopClick = () => this.setState({clicking: false});

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
                        style={styles.iconButton}
                        icon={'ios-stats'}
                    />
                    <IconButton
                        onPress={() => this.props.navigation.navigate('Shop', {
                            score: this.state.score,
                            powerUps: this.state.powerUps,
                        })}
                        style={styles.iconButton}
                        icon={'ios-cart'}
                    />
                </View>
                <View style={styles.scoreContainer}>
                    <Score {...this.state} />
                </View>

                <View style={styles.powerUps}>
                    {this.state.score !== GAME_SETTINGS.loading && [
                        <Text style={styles.text}>
                            {this.state.powerUps[0]}xMarko
                        </Text>,
                        <Text style={styles.text}>
                            {this.state.powerUps[1]}xFredde
                        </Text>,
                        <Text style={styles.text}>
                            {this.state.powerUps[2]}xAnton
                        </Text>,
                    ]}
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
        flex: 0.3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
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
