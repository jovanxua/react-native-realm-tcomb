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

//Constants
import {GENDER_OPTIONS, POSITION_OPTIONS} from './data';

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
                value: POSITION_OPTIONS[this.props.data.position]
            },,
            {
                label: 'RATE PER MONTH',
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
                        this.props.data.middlename
                    }
                    employeeData={this.props.data}
                    onEdit={(data) => this.props.onEdit(data)}
                    attributes={this.state._aEmployeeData}
                    onDelete={(data) => this.props.onDelete(data)}/>
            </View>
        );
    }
}
