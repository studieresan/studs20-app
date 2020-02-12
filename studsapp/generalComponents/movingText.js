import React from 'react';
import {Animated, Easing} from 'react-native';

const topMax = 50;

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

    componentDidUpdate(prevProps) {
        if (this.props.animate && !prevProps.animate) {
            setTimeout(
                () => this.animate({finished: true}),
                this.getRandInt(this.props.id * 100),
            );
        }
    }

    animate = ({finished}) => {
        if (!finished || !this.props.animate) {
            return;
        }

        this.setState(
            {
                top: this.getRandInt(topMax * 2) - topMax - 30,
                left:
                    this.getRandInt(this.props.scoreWidth * 2) -
                    this.props.scoreWidth,
            },
            () => {
                const animationTime = 1000;

                this.opacityValue.setValue(1);
                Animated.timing(this.opacityValue, {
                    toValue: 0,
                    duration: animationTime,
                    easing: Easing.cubic,
                    useNativeDriver: true,
                }).start();
                this.translateValueY.setValue(0);
                Animated.timing(this.translateValueY, {
                    toValue: -50,
                    duration: animationTime,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }).start();
                this.translateValueX.setValue(0);
                Animated.timing(this.translateValueX, {
                    toValue: 20 * Math.round(Math.random() - 1),
                    duration: animationTime,
                    useNativeDriver: true,
                    easing: Easing.cubic,
                }).start(this.animate);
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
