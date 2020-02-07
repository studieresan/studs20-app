import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Button from 'studsapp/generalComponents/button';
import {status, isLoading} from 'studsapp/store/constants';
import {storeData} from 'studsapp/utils/storage';

const backgroundSource = 'studsapp/static/images/background.png';

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
                    <Text style={styles.text}>scoreboard</Text>
                    <Text style={styles.text}>shop</Text>
                </View>
                <View style={styles.count}>
                    <Text style={styles.text}>count</Text>
                </View>
                <View style={styles.powerups}>
                    <Text style={styles.text}>powerups</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.text}>button</Text>
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
    count: {
        flex: 0.3,
        display: 'flex',
        flexDirection: 'row',
    },
    powerups: {
        flex: 0.2,
        display: 'flex',
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 0.35,
        display: 'flex',
        flexDirection: 'row',
    },
});

export default GameView;
