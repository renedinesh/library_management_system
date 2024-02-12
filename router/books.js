const express = require('express');
const Routes = express.Router();
const booksController = require('../controller/books')



Routes.post('/',booksController.createBookDetails);
Routes.get('/',booksController.getAllBooksDetails);
Routes.put('/:id',booksController.updateBooksDetails);
Routes.get('/:id',booksController.gettingBookDetailsById);
Routes.delete('/:id',booksController.deletebookInfoById);

module.exports = Routes;