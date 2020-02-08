import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {storeData, retrieveData} from 'studsapp/utils/storage';
import ImageButton from 'studsapp/generalComponents/imageButton';

const backgroundSource = 'studsapp/static/images/background.png';
const borderButtomSource = 'studsapp/static/images/border-button.png';

class GameView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: -1,
            powerups: [0, 0, 0],
        };
        this.load();
    }

    load = async () => {
        const count = await retrieveData('count');
        const powerups = await retrieveData('powerups');
        if (count !== null && powerups !== null) {
            this.setState({
                count,
                powerups,
            });
        } else {
            this.setState({
                count: 0,
            });
        }
    };

    save = async () => {
        if (
            (await storeData('count', this.state.count)) &&
            (await storeData('powerups', this.state.powerups))
        ) {
            console.log('saved success');
        }
    };

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
                    {this.state.count === -1 && (
                        <Text style={styles.count}>Loading..</Text>
                    )}
                    {this.state.count !== -1 && (
                        <Text style={styles.count}>{this.state.count}</Text>
                    )}
                </View>
                <View style={styles.powerups}>
                    <Text style={styles.text}>3xMarko</Text>
                    <Text style={styles.text}>2xFredde</Text>
                    <Text style={styles.text}>0xAnton</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ImageButton
                        onPress={() =>
                            this.setState({count: this.state.count + 1})
                        }
                        source={require(borderButtomSource)}
                        text={'x' + (this.state.powerups[0] + 1)}
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
