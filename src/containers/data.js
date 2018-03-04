//Schema
const EmployeeSchema = {
  name: 'Employee',
  primaryKey: 'key',
  properties: {
    key: 'string', //primary key
    firstname:  'string',
    middlename: 'string',
    lastname: 'string',
    nickname: 'string',
    birthday: {type: 'date'},
    gender: 'string',
    address: 'string',
    position: 'string',
    salary: {type: 'double'},
  }
};

export default EmployeeSchema;

//Enum Type options
export const GENDER_OPTIONS = {
  Male: 'Male',
  Female: 'Female'
}

//Codelisted type options
//In actual apps this will be stored to a codelist table in DB
export const POSITION_OPTIONS = {
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
}