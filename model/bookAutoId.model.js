const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Bookautoid = sequelize.define('bookautoid', {
  
  name:{
    type: DataTypes.STRING,
    trim: true
  },
  prefix:{
    type: DataTypes.STRING,
    trim: true
  },
  count:{
    type: DataTypes.STRING,
    trim: true
  },
  status: {
    type: DataTypes.INTEGER,
    default: 1,
    trim: true
  }

}, {
  tableName: 'bookautoid',
  timestamps: true
});

module.exports = Bookautoid