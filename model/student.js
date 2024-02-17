const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Students = sequelize.define('student', {
  
  firstName: {
    type: DataTypes.STRING,
    trim: true
  },
  lastName: {
    type: DataTypes.STRING,
    trim: true
  },

  fatherName: {
    type: DataTypes.STRING,
    trim: true
  },
  address: {
    type: DataTypes.STRING,
    trim: true
  },
  rollNo: {
    type: DataTypes.STRING,
    trim: true
  },
  phoneNo: {
    type: DataTypes.INTEGER,
    trim: true
  },

  status: {
    type: DataTypes.STRING,
    default : 1,
    trim: true
  }

}, {
  tableName: 'student',
  timestamps: true
  
});


module.exports = Students;