/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import FixedCard1 from './../components/FixedCards';

//Utils
import * as utils from '../utils';

export default class EmployeeCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            _aEmployeeData: []
        }
    }

    componentDidMount(){
        this._generateCardInputs();
    }

    _generateCardInputs = () => {
        let aData = 
        [
            {
                label: 'NICKNAME',
                value: this.props.data.nickname
            },
            {
                label: 'BIRTHDAY',
                value: utils.convertDateToString(this.props.data.birthday, 'MMMM DD, YYYY')
            },
            {
                label: 'GENDER',
                value: this.props.data.gender
            },
            {
                label: 'BIRTHDAY',
                value: utils.convertDateToString(this.props.data.birthday, 'MMMM DD, YYYY')
            },,
            {
                label: 'ADDRESS',
                value: this.props.data.address
            },,
            {
                label: 'POSITION',
                value: this.props.data.position
            },,
            {
                label: 'SALARY',
                value: this.props.data.salary
            },
        ]

        this.setState({ _aEmployeeData: aData });
    }

    render() {
        return (
            <View style={styles.placeholder}>
                <FixedCard1
                    title={
                        this.props.data.lastname + ', ' + 
                        this.props.data.firstname + ' ' + 
                        this.props.data.middlename[0] + '.'
                    }
                    attributes={this.state._aEmployeeData}/>
            </View>
        );
    }
}
