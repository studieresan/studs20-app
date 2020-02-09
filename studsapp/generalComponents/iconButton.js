import React from 'react';
import {TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class IconButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={{
                    marginHorizontal: 10,
                    borderRadius: 10,
                }}
                underlayColor="rgba(0,0,0,0.3)">
                <Icon
                    style={{paddingHorizontal: 10}}
                    name={this.props.icon}
                    size={35}
                    color={'white'}
                />
            </TouchableHighlight>
        );
    }
}
