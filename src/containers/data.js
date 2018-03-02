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