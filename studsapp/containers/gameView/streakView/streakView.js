import React from 'react';
import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import {GAME_SETTINGS} from '../gameController';

const window = Dimensions.get('window');

export default class Streak extends React.Component {
    colorAnim = new Animated.Value(0);
    constructor(props) {
        super(props);
        this.state = {
            clickRate: 0,
        };
    }

    render() {
        this.colorAnim.setValue(this.props.streakCounter);
        const colorInterpolate = this.colorAnim.interpolate({
            inputRange: [0, GAME_SETTINGS.clicksPerStreakIncrease],
            outputRange: ['#fff', '#f96c6b'],
        });

        return (
            <View style={styles.wrapper}>
                <View style={styles.barContainer}>
                    <Animated.View
                        style={[
                            {
                                flex:
                                    this.props.streakCounter /
                                    GAME_SETTINGS.clicksPerStreakIncrease,
                                backgroundColor: colorInterpolate,
                            },
                            styles.bar,
                            this.props.streak ===
                                GAME_SETTINGS.maxStreak *
                                    this.props.fredrikAmount && styles.barFull,
                        ]}
                    />
                    <Text style={styles.text}>x{this.props.streak}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    barContainer: {
        flexDirection: 'row',
        width: window.width / 3,
        height: 25,
        borderWidth: 1,
        borderColor: 'white',
        marginRight: 5,
        borderRadius: 5,
        position: 'relative',
    },
    bar: {
        borderRadius: 4,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    barFull: {
        backgroundColor: '#f96c6b',
        flex: 1,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    text: {
        color: 'white',
        fontSize: 18,
        position: 'absolute',
        right: 0,
        fontFamily: 'Raleway-Black',
        paddingRight: 1,
    },
});
