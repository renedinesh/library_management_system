const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Constants = sequelize.define('constants', {
  
  name: {
    type: DataTypes.STRING,
    trim: true
  },
  prefix: {
    type: DataTypes.STRING,
    trim: true
  },
  count:{
    type: DataTypes.STRING,
    trim: true,
  },
  status:{
    type: DataTypes.INTEGER,
    default: 1,
    trim: true
  }
}, {
  tableName: 'constants',
  timestamps: true
});

module.exports = Constants