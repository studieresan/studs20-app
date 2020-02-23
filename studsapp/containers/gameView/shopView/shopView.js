import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    FlatList,
    TouchableHighlight
} from 'react-native';
import {IconButton} from 'studsapp/generalComponents';
import Icon from 'react-native-vector-icons/Ionicons';
import {powerUpInfo} from 'studsapp/containers/gameView/gameController';

const logoSource = require('studsapp/static/images/logo-small.png');
const backgroundSource = 'studsapp/static/images/background.png';
const window = Dimensions.get('window');

const ShopRow = ({picture, name, description, cost}, amount) => {
    return (
    <View style={styles.rowWrapper}>
        <View style={styles.imageWrapper}>
            <Image
                style={styles.image}
                source={picture}
            />
        </View>
        <View style={styles.powerupInfo}>
            <View style={styles.powerupHeader}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.nameText}>{'x' + amount}</Text>
            </View>
            <Text style={styles.descriptionText}>{description}</Text>
            <View style={styles.costInfo}>
                <Icon
                    name="ios-cash"
                    size={25}
                    color={'#fff'}
                />
                <Text style={styles.costText}>{cost}</Text>
                <View style={styles.buyButtonWrapper}>
                    <TouchableHighlight 
                        style={styles.buyButton}
                        underlayColor="rgba(255,255,255,0.3)"
                        onPress={() => {alert('CALL THE POPO!')}}
                    >
                        <Text style={styles.buyText}>Köp</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    </View>
)};

class ShopView extends React.Component {
    render() {
        console.log(powerUpInfo);
        return (
            <ImageBackground
                source={require(backgroundSource)}
                style={styles.imageBackground}>
                <View style={styles.top}>
                    <Image source={logoSource} style={styles.logo} />
                    <Text style={styles.title}>Uppgraderingar</Text>
                    <IconButton
                        onPress={() => this.props.navigation.goBack()}
                        icon="ios-arrow-back"
                        style={styles.back}
                    />
                </View>
                <View style={styles.bottom}>
                    <FlatList
                        data={powerUpInfo}
                        keyExtractor={item => item.name}
                        renderItem={({item, index}) => {
                            console.log(this.props.navigation.getParam('powerUps'));
                            return ShopRow(item, this.props.navigation.getParam('powerUps')[index]);
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {flex: 1, alignItems: 'center'},
    title: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Raleway-Black',
    },
    logo: {
        alignSelf: 'center',
        height: window.height / 12,
        resizeMode: 'contain',
    },
    top: {
        flex: 0.25,
        justifyContent: 'center',
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
    },
    bottom: {
        flex: 0.75
    },
    rowWrapper: {
        width: 0.9*window.width,
        backgroundColor: '#b3d4d6',
        borderRadius: 10,
        marginTop: 10,
        paddingVertical: 8,
        flexDirection: 'row',
        shadowColor: '#b3d4d6',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.34,
        shadowRadius: 6,
        elevation: 10,
    },
    imageWrapper: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: 'contain',
        height: 120,
        width: 120
    },
    powerupInfo: {
        flex: 0.6
    },
    powerupHeader: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 5
    },
    nameText: {
        color: 'white',
        fontFamily: 'Raleway-Black',
        fontSize: 22
    },
    descriptionText: {
        flex: 0.5,
        color: 'white',
        fontFamily: 'Raleway-Regular',
    },
    costInfo: {
        flex: 0.25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    costText: {
        color: 'white',
        fontSize: 20,
        marginLeft: 5,
        fontFamily: 'Raleway-Black',
        textAlign: 'center',
    },
    buyButtonWrapper: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5
    },
    buyButton: {
        backgroundColor: '#387677',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    buyText: {
        fontSize: 17,
        fontFamily: 'Raleway-Black',
        textAlign: 'center',
        color: 'white'
    },
    back: {
        position: 'absolute',
        top: window.height / 16,
        left: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default ShopView;
