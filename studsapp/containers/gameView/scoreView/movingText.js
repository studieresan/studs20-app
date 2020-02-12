import React from 'react';
import {Animated, Easing} from 'react-native';

const ONE_SECOND_IN_MILLIS = 1000;

export default class MovingText extends React.Component {
    translateValueY = new Animated.Value(0);
    opacityValue = new Animated.Value(0);
    translateValueX = new Animated.Value(0);
    constructor(props) {
        super(props);
        this.state = {
            top: 0,
            left: 0,
        };
    }

    getRandInt = max => Math.floor(Math.random() * Math.floor(max));

    UNSAFE_componentWillUpdate(nextProps) {
        if (!this.props.animate && nextProps.animate) {
            this.animate();
        }
    }

    animate = () => {
        this.setState(
            {
                top: this.getRandInt(50 * 2) - 50 - 50,
                left:
                    this.getRandInt(this.props.scoreWidth * 2) -
                    this.props.scoreWidth,
            },
            () => {
                this.opacityValue.setValue(1);
                this.translateValueY.setValue(0);
                this.translateValueX.setValue(0);
                Animated.timing(this.opacityValue, {
                    toValue: 0,
                    duration: ONE_SECOND_IN_MILLIS * 1,
                    easing: Easing.cubic,
                    useNativeDriver: true,
                }).start();

                Animated.timing(this.translateValueY, {
                    toValue: -50,
                    duration: ONE_SECOND_IN_MILLIS * 1,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }).start();

                Animated.timing(this.translateValueX, {
                    toValue: 20 * Math.round(Math.random() - 1),
                    duration: ONE_SECOND_IN_MILLIS * 1,
                    useNativeDriver: true,
                    easing: Easing.cubic,
                }).start();
            },
        );
    };

    render() {
        return (
            <Animated.Text
                style={[
                    {top: this.state.top, left: this.state.left},
                    {
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        color: 'white',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        opacity: this.opacityValue,
                        transform: [
                            {translateY: this.translateValueY},
                            {translateX: this.translateValueX},
                        ],
                    },
                ]}>
                +1
            </Animated.Text>
        );
    }
}
