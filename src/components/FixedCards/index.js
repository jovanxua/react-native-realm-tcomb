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

                    {
                        !this.props.hideActionIcon ?
                            <View style={styles.header.contBtn}>
                                <TouchableOpacity
                                    style={styles.header.btnStyle}
                                    onPress={() => {this.props.onDelete(this.props.employeeData)}}>
                                    {   
                                        this.props.actionComponent || 
                                        <Icon name='ios-trash' size={this.props.iconSize || 30} color='#9f0000'/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.header.btnStyle}
                                    onPress={() => {this.props.onEdit(this.props.employeeData)}}>
                                    {   
                                        this.props.actionComponent || 
                                        <Icon name='md-create' size={this.props.iconSize || 27} color='#3b5998'/>
                                    }
                                </TouchableOpacity>
                            </View>
                        :
                            null
                    }

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