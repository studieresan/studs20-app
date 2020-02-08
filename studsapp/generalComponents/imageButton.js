import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    Animated,
    Dimensions,
} from 'react-native';

export default class ImageButton extends React.Component {
    scaleValue = new Animated.Value(0);
    constructor(props) {
        super(props);
        this.state = {};
    }

    pressInAnimation = () => {
        this.scaleValue.setValue(1);
        Animated.timing(this.scaleValue, {
            toValue: 0.8,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    pressOutAnimation = () => {
        this.scaleValue.setValue(0.8);
        Animated.timing(this.scaleValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
        }).start();
    };

    render() {
        const {source, text} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={() => console.log('PRESS')}
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
    touchable: {
        display: 'flex',
        flexDirection: 'row',
    },
    wrapper: {
        position: 'relative',
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
        height: 100,
        resizeMode: 'contain',
    },
    text: {
        color: 'white',
        fontSize: 30,
    },
});
