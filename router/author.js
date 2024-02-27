const express = require('express');
const Router = express.Router();

const authorController = require('../controller/author.controller');

Router.post('/',authorController.createAuthorDetails);
Router.get('/',authorController.getAllAuthorDetails);
Router.get('/:id',authorController.gettingAuthorDetailsById);
Router.put('/:id',authorController.updatedAuthorDetailsById);
Router.delete('/:id',authorController.deleteAuthorDetailsById);


//inner join

Router.get('/authordetail/:id', authorController.findAuthorDetails)
module.exports = Router;