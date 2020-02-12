import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {MovingText, ImageButton, IconButton} from 'studsapp/generalComponents';
import {
    GAME_SETTINGS,
    load,
    createSaveTimers,
    ONE_SECOND_IN_MILLIS,
} from './gameController';
const _ = require('lodash');

const backgroundSource = 'studsapp/static/images/background.png';
const borderButtomSource = 'studsapp/static/images/border-button.png';

class Score extends React.Component {
    interval = null;
    constructor(props) {
        super(props);
        this.state = {
            clickRate: 0,
            scoreWidth: 10,
        };
    }

    componentDidMount() {
        this.updateClickRate(-1);
    }

    updateClickRate = old => {
        const diff = this.props.score - old;
        if (old !== -1 && diff !== this.state.clickRate) {
            this.setState({clickRate: this.props.score - old}, () => {
                this.interval = setTimeout(
                    this.updateClickRate,
                    ONE_SECOND_IN_MILLIS,
                    this.props.score,
                );
            });
        } else {
            this.interval = setTimeout(
                this.updateClickRate,
                ONE_SECOND_IN_MILLIS,
                this.props.score,
            );
        }
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    createMovingTexts = () => {
        return [...Array(14)]
            .map((i, idx) => idx)
            .map(i => (
                <MovingText
                    key={i}
                    id={i}
                    scoreWidth={this.state.scoreWidth}
                    animate={
                        i === 0 ? this.props.clicking : this.state.clickRate > i
                    }
                />
            ));
    };

    render() {
        const movingTexts = this.createMovingTexts();
        return [
            movingTexts,
            this.props.score === GAME_SETTINGS.loading && (
                <Text key="loading" style={styles.score}>
                    Loading..
                </Text>
            ),
            this.props.score !== GAME_SETTINGS.loading && (
                <Text
                    key="score"
                    style={styles.score}
                    onLayout={event => {
                        this.setState({
                            scoreWidth: Math.round(
                                event.nativeEvent.layout.width,
                            ),
                        });
                    }}>
                    {this.props.score}
                </Text>
            ),
        ];
    }
}

class GameView extends React.Component {
    timers = [];
    constructor(props) {
        super(props);
        this.state = {
            score: GAME_SETTINGS.loading,
            powerUps: [0, 0, 0],
            clicking: false,
        };

        this.stopClick = _.debounce(this.stopClick, 1000);
    }

    componentDidMount() {
        load().then(preGameState => {
            this.setState(preGameState);
        });

        this.timers = createSaveTimers(() => this.state);
    }

    componentWillUnmount() {
        this.timers.forEach(timer => clearInterval(timer));
    }

    click = () => {
        this.setState({score: this.state.score + 1, clicking: true});
    };

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
                        icon={'ios-stats'}
                    />
                    <IconButton
                        onPress={() => this.props.navigation.navigate('Shop')}
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
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
});

export default GameView;
