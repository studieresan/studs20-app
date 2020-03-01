import React from 'react';
import {StyleSheet, Text, Animated, Easing} from 'react-native';
import {GAME_SETTINGS, ONE_SECOND_IN_MILLIS} from '../gameController';
import MovingText from './movingText';

const NUM_ANIMS = 10;

export default class Score extends React.Component {
    interval = null;
    scaleValue = new Animated.Value(1);
    twirlValue = new Animated.Value(0);
    scoreWidth = 10;
    constructor(props) {
        super(props);
        this.state = {
            clickRate: 0,
        };
    }

    componentDidMount() {
        this.updateClickRate(-1);
    }

    componentDidUpdate(prevProps) {
        const multiplier = this.props.powerUps[0] + 1;
        if (
            prevProps.score !== this.props.score &&
            Math.floor(this.props.score / multiplier) % 10 === 0
        ) {
            Animated.sequence([
                Animated.timing(this.scaleValue, {
                    toValue: 1.2,
                    duration: ONE_SECOND_IN_MILLIS * 0.2,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(this.scaleValue, {
                    toValue: 1,
                    duration: ONE_SECOND_IN_MILLIS * 0.2,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]).start();
        }
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
        clearTimeout(this.interval);
    }

    createMovingTexts = () => {
        const baseScore = this.props.powerUps[0] + 1;
        const score = this.props.streak * baseScore;
        return Array(NUM_ANIMS)
            .fill(0)
            .map((_, id) => (
                <MovingText
                    key={id}
                    id={id}
                    scoreWidth={this.scoreWidth}
                    animate={Math.floor(this.props.score / score) % NUM_ANIMS === id}
                    score={score}
                />
            ));
    };

    render() {
        const movingTexts = this.createMovingTexts();
        return [
            movingTexts,
            this.props.score === GAME_SETTINGS.loading && (
                <Text key="loading" style={styles.score}>
                    Loading...
                </Text>
            ),
            this.props.score !== GAME_SETTINGS.loading && (
                <Animated.Text
                    key="score"
                    style={[
                        styles.score,
                        {
                            transform: [
                                {scale: this.scaleValue},
                                {
                                    rotate: this.twirlValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg'],
                                    }),
                                },
                            ],
                        },
                    ]}
                    onLayout={event => {
                        this.scoreWidth = Math.round(
                            event.nativeEvent.layout.width,
                        );
                    }}>
                    {this.props.score}
                </Animated.Text>
            ),
        ];
    }
}

const styles = StyleSheet.create({
    score: {
        fontSize: 50,
        color: 'white',
    },
});
