const Student = require('../model/student')

class studentController {

    creatingStudentDetails = async (req, res) => {
        try {

            const datas = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                fatherName: req.body.fatherName,
                address: req.body.address,
                rollNo: req.body.rollNo,
                phoneNo: req.body.phoneNo
            };

            const createStudentDetails = await Student.create(datas);

            if (createStudentDetails) {
                return res.status(201).send({ data: createStudentDetails });
            } else {
                return res.status(404).send({ error: 'Failed to create student details' });
            }
        } catch (error) {
            console.error('Error creating student details:', error);
            return res.status(500).send({ error: 'Internal server error' });
        }
    };


    getAllStudentDetails = async (req, res) => {
        try {
            let gettingStudentDetails = await Student.findAll();
            if (gettingStudentDetails) {
                return res.status(200).send({ data: gettingStudentDetails });
            } else {
                return res.status(404).send({ error: 'Failed to getting all student details' });
            }
        } catch (error) {
            console.error('Error getting all student details:', error);
            return res.status(500).send({ error: 'Internal server error' });
        }
    }

    updatedStudentDetails = async (req, res) => {
        try {
            let updatingStudentDetails = await Student.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                fatherName: req.body.fatherName,
                rollNo: req.body.rollNo,
                phoneNo: req.body.phoneNo
            }, { where: { id: req.params.id } });
            
            if (updatingStudentDetails) {
                const updatedStudent = await Student.findByPk(req.params.id);
                return res.status(200).send({ data: updatedStudent });
            } else {
                return res.status(404).send({ error: 'Failed to updated student detail' });
            }

        } catch (error) {
            console.error('Error updating student details:', error);
            return res.status(500).send({ error: 'Internal server error' });
        }
    }

    findStudentById = async (req, res) => {
        try {
            let findingStudentById = await Student.findOne({ where: { id: req.params.id } });
            if (findingStudentById) {
                return res.status(200).send({ data: findingStudentById })
            } else {
                return res.satus(404).send({ error: 'Error finding student by id' })
            }
        } catch (error) {
            console.error('Error finding student by id');
            return res.status(500).send({ error: 'Internal server error' })
        }
    }

    deleteStudentDetailsById = async (req, res) => {
        try {
            let deletingStudentDetailsById = await Student.destroy({ where: { id: req.params.id } });
            if (deletingStudentDetailsById) {
                return res.status(200).send({ data: 'Deleted sucessfully' });
            } else {
                return res.status(404).send({ error: 'Un    able to delete detail' });
            }
        } catch (error) {
            console.error('Error deleting student detail');
            return res.status(500).send({ error: 'Internal server error' })
        }

    }
}

module.exports = new studentController();