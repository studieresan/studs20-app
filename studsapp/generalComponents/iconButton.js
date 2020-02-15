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
                        marginHorizontal: 10,
                        borderRadius: 10,
                    },
                    this.props.style,
                ]}
                underlayColor="rgba(0,0,0,0.3)">
                <Icon
                    style={[{paddingHorizontal: 10}, this.props.iconStyle]}
                    name={this.props.icon}
                    size={this.props.size ? this.props.size : 35}
                    color={'white'}
                />
            </TouchableHighlight>
        );
    }
}
