import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

//constants

export default class FixedCard1 extends PureComponent {
    render(){
        let attribs = this.props.attributes || [];
        return(
            <View style={[styles.container, this.props.borderRadius ? {borderRadius: this.props.borderRadius} : null]}>
                <View style={styles.header.container}>
                    <View style={styles.header.contTitle}>
                        <View style={styles.header.placeHolderTitle}>
                            <Text style={styles.header.txtTitle}>
                                {this.props.title || ''}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.header.contBtn}>
                        {
                            !this.props.hideActionIcon ?
                                <TouchableOpacity
                                    onPress={() => {this.props.onEdit()}}>
                                    {   
                                        this.props.actionComponent || 
                                        <Icon name='ios-create-outline' size={this.props.iconSize || 35} color='#000000'/>
                                    }
                                </TouchableOpacity>
                            :
                                null
                        }
                    </View>
                </View>

                <View style={styles.content.container}>
                    {
                        attribs.map((data, index) => 
                            <View key={index} style={styles.content.placeHolderData}>
                                <View style={styles.content.contLabel}>
                                    <Text style={styles.content.txtLabel}>
                                        {data.label}
                                    </Text>
                                </View>
                                <View style={styles.content.contValue}>
                                    <Text style={styles.content.txtValue}>
                                        {
                                            Array.isArray(data.value) ?
                                                data.value.map((arrVal,arrIndex) => {
                                                    if(arrIndex==0){
                                                        if(data.hasTitle){
                                                            return (
                                                                <Text 
                                                                    key={arrIndex} 
                                                                    style={styles.content.txtValueTitle}>
                                                                    {arrVal}
                                                                </Text>
                                                            )
                                                        }
                                                        else{
                                                            return arrVal
                                                        } 
                                                    }
                                                    else{
                                                        if(data.hasTitle){
                                                            if(arrVal){
                                                                return (
                                                                    <Text 
                                                                        key={arrIndex} 
                                                                        style={styles.content.txtValueDescription}>
                                                                        {'\n' + arrVal}
                                                                    </Text>
                                                                )
                                                            }
                                                        }
                                                        else{
                                                            return '\n' + arrVal 
                                                        }
                                                    }
                                                })
                                            : data.value
                                        }
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}