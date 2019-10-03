import React from 'react';
import { 
    StyleSheet, 
    Dimensions,
    View,
    ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { retrieveData } from 'studsapp/utils/storage';

class AuthenticationView extends React.Component {
    componentDidMount() {
        this._findTokenAndNavigate();
    }

    _findTokenAndNavigate = async () => {
        const token = await retrieveData('token');
        if(token) {
            this.props.setLoginToken(token);
        }
        this.props.navigation.navigate(token ? 'LoggedIn' : 'Login');
    }

    render() {
        return (
            <LinearGradient colors={['#011660', '#002365', '#002f68', '#08396a', '#1c436a']} style={styles.top}>
                <View>
                    <ActivityIndicator size='large' color='#fac882'/>
                </View>
            </LinearGradient>
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