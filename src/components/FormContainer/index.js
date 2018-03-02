
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    _onSubmit = () => {

    }
    
    render(){
        console.log('rendering form')
        return(
            <View style={styles.container}>
                <View style={styles.header.container}>
                    <TouchableOpacity
                        style={styles.header.left}
                        activeOpacity={0.6}
                        onPress={() => this.props.onCancel()}>

                        <Icon name='window-close' size={30} color='#dbdcdd'/>

                    </TouchableOpacity>
                    <View style={styles.header.center}>
                        <Text style={styles.header.txtTitle}>
                            {this.props.title || ''}
                        </Text>
                    </View>
                    
                    <TouchableOpacity
                        style={styles.header.right}
                        activeOpacity={0.6}
                        onPress={() => this.props.onSubmit()}>

                        <Text style={styles.header.txtSave}>
                            SAVE
                        </Text>
                    </TouchableOpacity>

                </View>

                <View 
                    style={styles.body.container}>
                    
                    <ScrollView>               
                        <View style={[
                            styles.body.content,
                            this.props.padding ? {padding: this.props.padding} : null
                        ]}>
                            {this.props.children}
                        </View>
                    </ScrollView>

                </View>

                

            </View>
        )
    }
}
