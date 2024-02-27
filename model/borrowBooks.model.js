const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const BorrowBooks = sequelize.define('borrowBooks', {
  
    bookId : {
        type: DataTypes.STRING,
        trim: true
    },
    studentId:{
        type:DataTypes.STRING,
        trim: true
    },
    status:{
        type:DataTypes.STRING,
        default:'1',
        trim: true
    },
    borrowedAt:{
        type: DataTypes.DATE,
        trim: true
    }
}, {
  timestamps:true,
  tableName: 'borrowBooks'
});

module.exports = BorrowBooks;