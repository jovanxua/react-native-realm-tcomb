
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Keyboard
} from 'react-native';
import t from 'tcomb-form-native'; 

//Styles
import styles from './styles';

//Custom Component
import FormContainer from '../components/FormContainer';

//Custom tcomb
import {CustomSelectPickerTemplate} from '../customTcomb/selectPickerTemplate';
import {CustomDatePickerTemplate} from '../customTcomb/datePickerTemplate';

//Utils
import * as utils from '../utils';
import stylesheet from '../customTcomb/styles';

//Constants
const ERROR_MESSAGE = '*Required field'
const Form = t.form.Form;
const GENDER = t.enums({
    Male: 'Male',
    Female: 'Female'
})

const POSITION = t.enums({
    1: 'HR Staff',
    2: 'Accounting Staff',
    3: 'Engineer I',
    4: 'Engineer II',
    5: 'Engineer III',
    6: 'Engineer IIII',
    7: 'Senior Engineer I',
    8: 'Senior Engineer II',
    9: 'Senior Engineer III',
    10: 'Manager',
})

export default class EmployeeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _oEmployee: {
                firstname: '',
                middlename: '',
                lastname: '',
                nickname: '',
                birthday: null,
                gender: '',
                address: '',
                position: '',
                salary: ''
            },

            _oOriginalData: null
        };
    }

    componentDidMount(){
        this.setState({ _oOriginalData: {...this.state._oEmployee} });
    }

    _onChange = (value) => {
        let oEmployee = {...this.state._oEmployee};
        oEmployee.firstname = value.firstname || '';
        oEmployee.middlename = value.middlename  || '';
        oEmployee.lastname = value.lastname  || '';
        oEmployee.nickname = value.nickname  || '';
        oEmployee.birthday = value.birthday  || null;
        oEmployee.gender = value.gender  || '';
        oEmployee.address = value.address  || '';
        oEmployee.position = value.position  || '';
        oEmployee.salary = value.salary  || '';
        this.setState({ _oEmployee: oEmployee })
    }

    _onSubmit = () => {
        Keyboard.dismiss();
        let oEmployee = this.refs.form_employee.getValue();

        if (oEmployee) {
            this.props.onSave(oEmployee);
        }
    }

    _onCancel = () => {
        Keyboard.dismiss();
        if( JSON.stringify(this.state._oEmployee) === JSON.stringify(this.state._oOriginalData) ){
            this.props.onCancel()
        }
        else{
            Alert.alert(
                'Warning',
                'Unsaved data will be lost. Are you sure you want to exit ?',
                [
                    {text: 'NO', onPress: () => {}},
                    {text: 'YES', onPress: () => this.props.onCancel()},
                ],
                    { cancelable: false }
            )
        }
    }
    
    
    render(){
        console.log('JSON.stringify(this.state._oEmployee): ' + JSON.stringify(this.state._oEmployee));
        console.log('JSON.stringify(this.state._oOriginalData): ' + JSON.stringify(this.state._oOriginalData));
        const OPTIONS = {
            fields: {
                firstname:{ 
                    label: 'FIRST NAME' ,
                    returnKeyType: 'next',
                    autoCorrect: false,
                    onSubmitEditing: (event) => {this.refs.form_employee.getComponent('middlename').refs.input.focus()},
                    error: ERROR_MESSAGE
                },
                middlename:{ 
                    label: 'MIDDLE NAME' ,
                    returnKeyType: 'next',
                    onSubmitEditing: (event) => {this.refs.form_employee.getComponent('lastname').refs.input.focus()},
                    error: ERROR_MESSAGE
                },
                lastname:{ 
                    label: 'LAST NAME' ,
                    returnKeyType: 'next',
                    onSubmitEditing: (event) => {this.refs.form_employee.getComponent('nickname').refs.input.focus()},
                    error: ERROR_MESSAGE
                },
                nickname:{ 
                    label: 'NICKNAME' ,
                    returnKeyType: 'next',
                    onSubmitEditing: (event) => {this.refs.form_employee.getComponent('nickname').refs.input.focus()},
                    error: ERROR_MESSAGE
                },
                birthday:{ 
                    label: 'BIRTHDAY',
                    mode:'date',
                    maximumDate: new Date(),
                    config:{
                        format: (strDate) => utils.convertDateToString(strDate, 'YYYY-MM-DD')
                    },
                    error: ERROR_MESSAGE
                },
                gender:{ 
                    template: CustomSelectPickerTemplate,
                    label: 'GENDER',
                    error: ERROR_MESSAGE
                },
                address:{ 
                    label: 'ADDRESS' ,
                    returnKeyType: 'done',
                    error: ERROR_MESSAGE
                },
                position:{ 
                    template: CustomSelectPickerTemplate,
                    prompt: 'Select Position',
                    label: 'POSITION',
                    error: ERROR_MESSAGE
                },
                salary:{ 
                    label: 'RATE PER MONTH (USD)' ,
                    returnKeyType: 'done',
                    error: ERROR_MESSAGE
                }
            },
            stylesheet: stylesheet
        }
        const EMPLOYEE = t.struct({
            firstname: t.String,
            middlename: t.String,
            lastname: t.String,
            nickname: t.maybe(t.String),
            birthday: t.Date,
            gender: GENDER,
            address: t.String,
            position: POSITION,
            salary: t.Number
        })

        console.log('rendering form')
        return(
            <FormContainer
                onSubmit = {this._onSubmit}
                onCancel = {this._onCancel}
                padding = {35}
                title='ADD NEW EMPLOYEE'>

                <Form 
                    ref='form_employee'
                    type={EMPLOYEE} 
                    onChange={this._onChange}
                    value={this.state._oEmployee}
                    options={OPTIONS}/>

            </FormContainer>
        )
    }
}
