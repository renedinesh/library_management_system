const express = require('express');
const Routes = express.Router();
const studentController = require('../controller/student');


Routes.post('/', studentController.creatingStudentDetails)
Routes.get('/', studentController.getAllStudentDetails)
Routes.put('/:id', studentController.updatedStudentDetails)
Routes.get('/:id', studentController.findStudentById)
Routes.delete('/:id',studentController.deleteStudentDetailsById)

module.exports = Routes;