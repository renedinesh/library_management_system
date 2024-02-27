const express = require('express');
const Router = express.Router();
const borrowBooksController = require('../controller/borrowBooks.controller')

Router.post('/',borrowBooksController.creatingBookBorrowing);
Router.get('/',borrowBooksController.borrowingBookDetails);
Router.get('/:id',borrowBooksController.borrowingBooksInfoById)
Router.put('/:id',borrowBooksController.updatedBroowingBooksById);
Router.delete('/:id',borrowBooksController.deleteBroowingBooksById);

//inner join

Router.post('/borrowingbooks',borrowBooksController.borrowBooksCount);
Router.put('/returingbooks/:id',borrowBooksController.returingBooksCount);



module.exports = Router