//Packages
import React, { Component, PureComponent } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Styles
import styles from './styles';

export default class ActionButton extends PureComponent{

    //Custom Style
    _checkCustomStyle = () => {
        
    }

    //Icon Props
    _getIconName = () => {
        return this.props.iconname || 'account-plus';
    }

    _getIconSize = () => {
        return this.props.iconsize || 27;
    }

    _getIconColor = () => {
        return this.props.iconcolor || '#fff'
    }

    //Component Action OnPress
    _onPress = () => {
        this.props.onPress();
    }

    render(){
        return(
            <View style={[styles.container]}>
                <TouchableOpacity 
                    activeOpacity={0.5}
                    onPress={this._onPress}>
                    <View style={styles.contBtn}>
                         <Icon 
                            name={this._getIconName()} 
                            size={this._getIconSize()} 
                            color={this._getIconColor()}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
