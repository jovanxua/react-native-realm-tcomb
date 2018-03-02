/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import Realm from'realm';
import styles from './styles';
import EmployeeSchema from './data';
import EmployeeForm from './employeeForm';
import ActionButton from '../components/ActionButton';
import EmployeeCard from './employeeCard';

export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      realm: null,
      _aEmployeeList: [
        /* {
          key: '1',
          firstname: '1',
          middlename: '1',
          lastname: '1',
          nickname: '1',
          birthday: '1',
          gender: '1',
          address: '1',
          position: '1',
          salary: '1'
        } */
      ],
      _oActiveEmployee: null,
      _bShowForm: false,
      _oDefaultEmployeeInfo: {
        key: '',
        firstname: '',
        middlename: '',
        lastname: '',
        nickname: '',
        birthday: '',
        address: '',
        position: '',
        salary: ''
      },
      _refreshing: false
    };
  }

  componentDidMount() {
    this._initData();
  }
  
  _initData = async() => {
    await Realm.open({schema: [EmployeeSchema], schemaVersion: 4})
    .then(realm => {
      console.log('_initData_realm: ' + realm);
      this.setState({ realm})
    })
    .catch(error => {
      console.log(error);
    });

    this._getData()
  }

  _refreshList = () => {
    this._getData();
  }

  _addNewEmployee = () => {
    this.setState({ _bShowForm: true })
  }

  _getData = () => {
    const oEmployeeList = this.state.realm.objects('Employee');
    this.setState({ _aEmployeeList: oEmployeeList })
    console.log('Realm.oEmployeeList: ' + JSON.stringify(oEmployeeList));
  }

  _onCancel = () => {
    this.setState({ _bShowForm: false })
  }

  _onSave = async(value) => {
    let bIsSaved = await this._writeToStore(value);
    if(bIsSaved){
      Alert.alert(
        'Success',
        'New Employee has been successfully added.',
        [{text: 'OK', onPress: this._hideForm}],
        { cancelable: false }
      )
    }
    else{
      Alert.alert(
        'Error',
        'An error was encountered while saving employee data. Please try again.',
        [{text: 'OK', onPress: ()=>{}}],
        { cancelable: false }
      )
    }
  }

  _hideForm = () => {
    this.setState({ _bShowForm: false })
  }

  //Ream Write
  _writeToStore = async (oData) => {
    try{
      const realm = this.state.realm;
      await realm.write(() => {
        let charlie = realm.create('Employee', {
          key: String(this.state._aEmployeeList.length),
          firstname:  oData.firstname || '',
          middlename: oData.middlename || '',
          lastname: oData.lastname || '',
          nickname: oData.nickname || '',
          birthday: oData.birthday || '',
          gender: oData.gender || '',
          address: oData.address || '',
          position: oData.position || '',
          salary: oData.salary || '',
        });
      });
      return true;
    }
    
    catch(exception){
      console.log('exception: ' + exception.message)
      return false;
    }
  }

  render() {
    console.log('rendering EMPLOYEE LIST');
    const iListLen = this.state._aEmployeeList.length;

    if(this.state._bShowForm){
      return(
        <EmployeeForm
          title={this.state._oActiveEmployee ? 'MODIFY EMPLOYEE PROFILE' : 'ADD NEW EMPLOYEE'}
          visible={this.state._bShowForm}
          onCancel={this._onCancel}
          onSave={this._onSave}
        />
      )
    }
    else{
      const oListHeader = (
        <View style={styles.header.container}>
          <Text style={styles.header.txtTitle}>
            MY EMPLOYEES
          </Text>
        </View>
      )

      const oList = (
        <FlatList
            getItemLayout={this._getItemLayout}
            initialNumToRender={3}
            refreshing={this.state._refreshing}
            onRefresh={() => {this._refreshList()}}
            ref={(ref) => { this.flatListRef = ref; }}
            data={this.state._aEmployeeList}
            renderItem={({item}) =>
              <EmployeeCard data={item}/> 
            }
        />
      )
      return (
        <View style={styles.container}>
          {
            iListLen > 0 ?
              <View style={{flex:1}}>
                {oListHeader}
                <View style={styles.body}>
                  {oList}
                </View>
              </View>
            :
            <TouchableOpacity
              style={styles.contEmpty}
              onPress={this._addNewEmployee}>
              <Text style={styles.txtDefault}>
                No Existing Employee. Tap anywhere to Add.
              </Text>
            </TouchableOpacity>
          }
          <ActionButton onPress={this._addNewEmployee}/>
        </View>
      );
    }
  }
}
