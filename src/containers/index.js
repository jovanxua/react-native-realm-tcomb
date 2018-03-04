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

//Utils
import * as utils from '../utils';

//Constants
const ERROR_SAVE = 'An error was encountered while saving employee data. Please try again.';
const ERROR_UPDATE = 'An error was encountered while saving employee data. Please try again.';
const ERROR_DELETE = 'An error was encountered while deleting an employee. Please try again.';
const SUCCESS_ADD = 'New Employee has been successfully added.'
const SUCCESS_UPDATE = 'Successfully updated existing data.'
const SUCCESS_DELETE = 'Successfully deleted ';
const WARNING_DELETE = 'This action is irreversible. Are you sure you want to delete '

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
    this.setState({ 
      _bShowForm: true,
      _oActiveEmployee: JSON.parse(JSON.stringify(this.state._oDefaultEmployeeInfo))
    })
  }

  _onEdit = (oActiveData) => {
    this.setState({ 
      _bShowForm: true,
      _oActiveEmployee: {...oActiveData}
    })
  }

  _getData = () => {
    const oEmployeeList = this.state.realm.objects('Employee').sorted('lastname');
    this.setState({ _aEmployeeList: [...oEmployeeList] })
  }

  _onCancel = () => {
    this._hideForm()
  }

  _onSave = async(value) => {
    let bIsSaved = await this._writeToStore(value);
    if(bIsSaved){
      Alert.alert(
        'Success',
        this.state._oActiveEmployee.key === '' ? SUCCESS_ADD : SUCCESS_UPDATE,
        [{text: 'OK', onPress: this._hideForm}],
        { cancelable: false }
      )
    }
    else{
      Alert.alert(
        'Error',
        value.key === '' ? ERROR_SAVE : ERROR_UPDATE,
        [{text: 'OK', onPress: ()=>{}}],
        { cancelable: false }
      )
    }
  }

  _onDelete = (oData) => {
    const oName =  oData.firstname + ' ' + oData.middlename + ' ' + oData.lastname
    Alert.alert(
      'Warning',
      WARNING_DELETE + oName + ' ?',
      [
          {text: 'NO', onPress: () => {}},
          {text: 'YES', onPress: () => {this._deleteData(oData, oName)} },
      ],
          { cancelable: false }
    )
  }

  _deleteData = async(oData, oName) => {
    let bFlag = await this._writeToStore(oData, true);
    if(bFlag){
      Alert.alert(
        'Success',
        SUCCESS_DELETE + oName,
        [{text: 'OK', onPress: this._hideForm}],
        { cancelable: false }
      )
    }
    else{
      Alert.alert(
        'Error',
        ERROR_DELETE,
        [{text: 'OK', onPress: ()=>{}}],
        { cancelable: false }
      )
    }
  }

  _hideForm = () => {
    this.setState({ 
      _bShowForm: false,
      _oActiveEmployee: null
    })
  }

  //Realm CRUD
  _writeToStore = async (oData, bDelelete = false) => {
    try{
      const bUpdateFlag = false;
      const realm = this.state.realm;
      const iKey = '';
      //Delete Key
      if(bDelelete){
        iKey=oData.key;
        bUpdateFlag = true;
      }
      //Add Key
      else if(this.state._oActiveEmployee.key === ''){
        iKey = String(this.state._aEmployeeList.length);
      }
      //Modify Key
      else{
        iKey = String(this.state._oActiveEmployee.key);
          bUpdateFlag = true;
      }
      
      await realm.write(() => {
        let oEmployee = realm.create('Employee', {
          key: iKey,
          firstname:  oData.firstname || '',
          middlename: oData.middlename || '',
          lastname: oData.lastname || '',
          nickname: oData.nickname || '',
          birthday: utils.convertDateToString(oData.birthday)  || '',
          gender: oData.gender || '',
          address: oData.address || '',
          position: oData.position || '',
          salary: oData.salary || '',
        }, bUpdateFlag);

        //Delete Action
        if(bDelelete){
          realm.delete(oEmployee);
        }
      });
      this._getData();
      return true;
    }
    
    catch(exception){
      console.log('exception: ' + exception.message)
      return false;
    }
  }

  render() {
    const iListLen = this.state._aEmployeeList.length;

    if(this.state._bShowForm){
      return(
        <EmployeeForm
          title={this.state._oActiveEmployee.key === '' ? 'ADD NEW EMPLOYEE' : 'MODIFY EMPLOYEE PROFILE' }
          visible={this.state._bShowForm}
          onCancel={this._onCancel}
          onSave={this._onSave}
          activeData={this.state._oActiveEmployee}
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
            initialNumToRender={2}
            refreshing={this.state._refreshing}
            onRefresh={() => {this._refreshList()}}
            ref={(ref) => { this.flatListRef = ref; }}
            data={this.state._aEmployeeList}
            renderItem={({item}) =>
              <EmployeeCard
                data={item}
                onEdit={this._onEdit}
                onDelete={this._onDelete}
              />
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
