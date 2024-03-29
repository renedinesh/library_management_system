const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')
const Author = require('./author.model')

const Books = sequelize.define('books', {

    author: {
        type: DataTypes.STRING,
        trim: true
    },
    title: {
        type: DataTypes.STRING,
        trim: true
    },
    bookId: {
        type: DataTypes.STRING,
        trim: true
    },
    category: {
        type: DataTypes.STRING,
        trim: true
    },
    price: {
        type: DataTypes.INTEGER,
        trim: true
    },
    edition: {
        type: DataTypes.INTEGER,
        trim: true
    },
    publisher: {
        type: DataTypes.STRING,
        trim: true
    },
    status: {
        type: DataTypes.STRING,
        default: '1',
        trim: true
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numOfCopies:{
        type:DataTypes.INTEGER,
        trim:true
    }

}, {
    tableName: 'books',
    timestamps: true
});

//Books.belongsTo(Author, { foreignKey: 'authorId' });

module.exports = Books;