import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {storeData} from 'studsapp/utils/storage';
import ImageButton from 'studsapp/generalComponents/imageButton';

const backgroundSource = 'studsapp/static/images/background.png';
const borderButtomSource = 'studsapp/static/images/border-button.png';

class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ImageBackground
                source={require(backgroundSource)}
                style={styles.wrapper}>
                <View style={styles.header}>
                    <Icon
                        style={styles.icon}
                        name={'ios-stats'}
                        size={35}
                        color={'white'}
                    />
                    <Icon
                        style={styles.icon}
                        name={'ios-cart'}
                        size={35}
                        color={'white'}
                    />
                </View>
                <View style={styles.countContainer}>
                    <Text style={styles.count}>50,372</Text>
                </View>
                <View style={styles.powerups}>
                    <Text style={styles.text}>3xMarko</Text>
                    <Text style={styles.text}>2xFredde</Text>
                    <Text style={styles.text}>0xAnton</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ImageButton
                        source={require(borderButtomSource)}
                        text={'x1'}
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
    countContainer: {
        flex: 0.3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    count: {
        fontSize: 50,
        color: 'white',
    },
    powerups: {
        flex: 0.2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0.35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
});

export default GameView;
