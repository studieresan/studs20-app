import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import { retrieveData } from 'studsapp/utils/storage';

const backgroundSource = 'studsapp/static/images/background.png';

class AuthenticationView extends React.Component {
    componentDidMount() {
        this.findTokenAndNavigate();
    }

    findTokenAndNavigate = async () => {
        const token = await retrieveData('token');
        const id = await retrieveData('id');
        if (token && id) {
            this.props.setLoginDetails(token, id);
        }
        this.props.navigation.navigate(token && id ? 'LoggedIn' : 'Login');
    }

    render() {
        return (
            <ImageBackground source={require(backgroundSource)} style={styles.top}>
                <View>
                    <ActivityIndicator size='large' color='#fff' />
                </View>
            </ImageBackground>
        );
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AuthenticationView;