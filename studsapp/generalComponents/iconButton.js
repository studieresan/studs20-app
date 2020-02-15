import React from 'react';
import {TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class IconButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={[
                    {
                        borderRadius: 10,
                    },
                    this.props.style,
                ]}
                underlayColor="rgba(0,0,0,0.3)">
                <Icon
                    style={[{}, this.props.iconStyle]}
                    name={this.props.icon}
                    size={this.props.size ? this.props.size : 35}
                    color={'white'}
                />
            </TouchableHighlight>
        );
    }
}
