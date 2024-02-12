const express = require('express'); 
const Routes = express.Router();
const staffController = require('../controller/staff');

Routes.post('/',staffController.creatingStaffDetails);
Routes.get('/',staffController.allStaffDetails);
Routes.put('/:id',staffController.updatedStaffDetail);
Routes.get('/:id',staffController.gettingStaffDetailsById);
Routes.delete('/:id',staffController.deleteStaffDetailsById);

module.exports = Routes; 