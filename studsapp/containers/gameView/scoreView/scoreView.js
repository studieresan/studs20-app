import React from 'react';
import {StyleSheet, Text, Animated, Easing} from 'react-native';
import {GAME_SETTINGS, ONE_SECOND_IN_MILLIS} from '../gameController';
import MovingText from './movingText';

export default class Score extends React.Component {
    interval = null;
    scaleValue = new Animated.Value(1);
    twirlValue = new Animated.Value(0);
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

    componentDidUpdate(prevProps) {
        if (
            prevProps.score !== this.props.score &&
            this.props.score % 10 === 0
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
                        this.setState({
                            scoreWidth: Math.round(
                                event.nativeEvent.layout.width,
                            ),
                        });
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
