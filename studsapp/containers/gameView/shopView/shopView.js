import React from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    FlatList,
} from 'react-native';
import {IconButton} from 'studsapp/generalComponents';
import { mapboxToken } from '../../../utils/config';

const logoSource = require('studsapp/static/images/logo-small.png');
const backgroundSource = 'studsapp/static/images/background.png';
const window = Dimensions.get('window');

const ShopRow = ({picture, name, description, cost}) => {
    return (
    <View style={styles.rowWrapper}>
        <Image
            style={styles.image}
            source={picture}
        />
        <View style={styles.powerupInfo}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
        </View>
        <Text style={styles.costText}>{cost}</Text>
    </View>
)};

class ShopView extends React.Component {
    getPowerups = () => {
        return [
            {picture: logoSource, name: 'Marko', description: 'Ökar mängden tippies per tapp.', cost: 5}, 
            {picture: logoSource, name: 'Fredrik', description: 'Ger dig tillgång till tippie-streaks, som ökar mängden tippies vid många tapps.', cost: 10}, 
            {picture: logoSource, name: 'Anton', description: 'Tippies samlas in även utan att behöva tappa.', cost: 1}, 
            {picture: logoSource, name: 'Bank', description: 'Ger dig tillgång till banken, som samlar tippies åt dig.', cost: 1}, 
            {picture: logoSource, name: 'Stonks', description: 'Ökar hastigheten som banken samlar tippies.', cost: 1}
        ];
    }

    render() {
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
                        data={this.getPowerups()}
                        keyExtractor={item => item.name}
                        renderItem={({item}) => ShopRow(item)}
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
        flex: 0.75,
    },
    rowWrapper: {
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#b3d4d6',
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    powerupInfo: {
        flex: 0.6,
        flexDirection: 'column',

    },
    image: {
        height: 48,
        width: 48,
        borderRadius: 100,
        marginHorizontal: 20,
        flex: 0.15,
    },
    nameText: {
        color: 'white',
        fontFamily: 'Raleway-Black',
        fontSize: 16,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    descriptionText: {
        color: 'white',
        fontFamily: 'Raleway-Regular',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    costText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Raleway-Black',
        textAlignVertical: 'center',
        textAlign: 'right',
        paddingRight: (window.width * 0.15) / 2,
        flex: 0.25,
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
