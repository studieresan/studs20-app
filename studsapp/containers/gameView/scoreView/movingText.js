import React from 'react';
import {Animated, Easing, Dimensions} from 'react-native';

const ONE_SECOND_IN_MILLIS = 1000;
const window = Dimensions.get('window');

export default class MovingText extends React.Component {
    translateValueY = new Animated.Value(0);
    opacityValue = new Animated.Value(0);
    translateValueX = new Animated.Value(0);
    firstRender = true;
    textWidth = 10;
    constructor(props) {
        super(props);
        this.state = {
            left: 0,
        };
    }

    getRandInt = max => Math.floor(Math.random() * Math.floor(max));

    UNSAFE_componentWillUpdate(nextProps) {
        if (!this.props.animate && nextProps.animate && !this.firstRender) {
            this.animate();
        }
        this.firstRender = false;
    }

    animate = () => {
        this.setState(
            {
                left:
                    (window.width - this.props.scoreWidth) / 2 +
                    this.getRandInt(this.props.scoreWidth) -
                    this.textWidth / 2,
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
                onLayout={event => {
                    this.textWidth = event.nativeEvent.layout.width;
                }}
                style={[
                    {left: this.state.left},
                    {
                        position: 'absolute',
                        top: '38%',
                        color: 'white',
                        opacity: this.opacityValue,
                        transform: [
                            {translateY: this.translateValueY},
                            {translateX: this.translateValueX},
                        ],
                    },
                ]}>
                {'+' + this.props.multiplier}
            </Animated.Text>
        );
    }
}
