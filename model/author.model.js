const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Books = require('./books')

const Author = sequelize.define('author', {
  
name:{
    type: DataTypes.STRING,
    trim: true
},
address:{
    type: DataTypes.STRING,
    trim: true
},
phoneNo:{
    type: DataTypes.STRING,
    trim: true
},
bookId:{
    type:DataTypes.STRING,
    trim: true
},
status:{
    type: DataTypes.STRING,
    default: 1,
    trim: true
}

}, {
    tableName:'author',
    timestamps: true
  
});

//Author.hasMany(Books, { foreignKey: 'authorId' });


module.exports = Author;

