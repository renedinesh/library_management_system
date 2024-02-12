const Staff = require('../model/staff');

class staffController {

    creatingStaffDetails = async (req, res) => {
        try {
            const datas = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                employeeId: req.body.employeeId,
                department: req.body.department,
                phoneNo: req.body.phoneNo,
                emailId: req.body.emailId,
            };

            const creatingStaffDetails = await Staff.create(datas);
            if (creatingStaffDetails) {
                return res.status(201).send({ data: creatingStaffDetails });
            } else {
                return res.status(404).send({ error: 'Failed to create staff detail' });
            }

        } catch (error) {
            console.error('Error while creating staff details', error);
            return res.status(500).send({ error: 'Internal server error' });
        };
    };

    allStaffDetails = async (req, res) => {
        try {
            const gettingStaffDetails = await Staff.findAll();
            if (gettingStaffDetails) {
                return res.status(200).send({ data: gettingStaffDetails });
            } else {
                return res.status(404).send({ error: 'Failed to get all staff details' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' })
        };

    };

    updatedStaffDetail = async (req, res) => {
        try {
            const datas = await Staff.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                employeeId: req.body.employeeId,
                department: req.body.department,
                phoneNo: req.body.phoneNo,
                emailId: req.body.emailId,
            }, { where: { id: req.params.id } });
            const updatingStaffDetail = await Staff.findByPk(req.params.id);
            if (updatingStaffDetail) {
                return res.status(200).send({ data: updatingStaffDetail });
            } else {
                return res.status(404).send({ error: 'Failed to update staff detail' });
            };
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' });
        };
    };

    gettingStaffDetailsById = async (req, res) => {
        try {
            const findingStaffDetailsById = await Staff.findOne({ where: { id: req.params.id } });
            if (findingStaffDetailsById) {
                return res.status(200).send({ data: findingStaffDetailsById })
            } else {
                return res.status(404).send({ error: 'Error while finding staff detail by id' })
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' })
        };
    };

    deleteStaffDetailsById = async (req, res) => {
        try {
            const deletingStaffDetailsById = await Staff.destroy({ where: { id: req.params.id } });
            if (deletingStaffDetailsById) {
                return res.status(200).send({ data: 'Deleted sucessfully' });
            } else {
                return res.status(404).send({ error: 'Error unable deleting staff detail' });
            };
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' });
        };
    };


};

module.exports = new staffController();