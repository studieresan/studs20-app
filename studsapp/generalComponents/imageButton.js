import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    Animated,
    Easing,
} from 'react-native';

export default class ImageButton extends React.Component {
    scaleValue = new Animated.Value(1);
    constructor(props) {
        super(props);
        this.state = {};
    }

    pressInAnimation = () => {
        this.scaleValue.setValue(1);
        Animated.timing(this.scaleValue, {
            toValue: 0.95,
            duration: 100 * 1,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    pressOutAnimation = () => {
        Animated.timing(this.scaleValue, {
            toValue: 1,
            duration: 100 * 1,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    };

    render() {
        const {source, text, onPress} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={onPress}
                onPressIn={this.pressInAnimation}
                onPressOut={this.pressOutAnimation}>
                <Animated.View
                    style={[
                        styles.wrapper,
                        {transform: [{scale: this.scaleValue}]},
                    ]}>
                    <Image source={source} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.text}>{text}</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        height: 130,
    },
    text: {
        color: 'white',
        fontSize: 30,
    },
});
