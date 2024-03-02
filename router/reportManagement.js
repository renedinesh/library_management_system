const express = require('express');
const Router = express.Router();
const reportManagment = require('../controller/reportManagement.controller');

Router.get('/authorname/:author',reportManagment.infoByAuthorName);
Router.get('/returnbookstatus/:bookId',reportManagment.bookReturnStatus);
Router.get('/notreturnbooks',reportManagment.notReturnBooks);
Router.get('/duestatus',reportManagment.dueStatus);


module.exports = Router;
