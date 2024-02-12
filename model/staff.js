const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Staff = sequelize.define('staff', {
  
  firstName: {
    type: DataTypes.STRING,
    trim: true
  },
  lastName: {
    type: DataTypes.STRING,
    trim: true
  },
  employeeId:{
    type: DataTypes.STRING,
    trim:true
  },
  department:{
    type: DataTypes.STRING,
    trim: true
  },
  phoneNo:{
    type: DataTypes.INTEGER,
    trime: true
  },
  emailId:{
    type: DataTypes.STRING,
    trime: true
  },
  status:{
    type: DataTypes.STRING,
    default: 1,
    trime: true
  }
  
}, {
  tableName: 'staff',
  timestamps: true
  
});

module.exports = Staff;