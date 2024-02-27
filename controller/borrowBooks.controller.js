const borrowBooks = require('../model/borrowBooks.model');
const { borrowBooksValue, returnBook } = require('./bookCountValue')

class borrowBooksController {


    creatingBookBorrowing = async (req, res) => {
        // const bookCountvalue = bookCountvalue.borrowBooks()
        try {
            const datas = {
                bookId: req.body.bookId,
                studentId: req.body.studentId
            }
            const createInfo = await borrowBooks.create(datas)
            if (createInfo) {
                res.status(201).send({ data: createInfo });
            } else {
                res.status(400).send({ error: 'Fail to create borrow book details' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        };
    };

    borrowingBookDetails = async (req, res) => {
        try {
            const broowingBookInfo = await borrowBooks.findAll();
            if (broowingBookInfo) {
                res.status(200).send({ data: broowingBookInfo });
            } else {
                res.status(400).send({ error: 'Fail to get borrowing books info' });
            }
        } catch (error) {
            console.error(error);
            res.stauts(500).send({ error: 'Internal server error' });
        };
    };

    borrowingBooksInfoById = async (req, res) => {
        try {
            const borrowingBooksInfo = await borrowBooks.findOne({ where: { id: req.params.id } });
            if (borrowingBooksInfo) {
                res.status(200).send({ data: borrowingBooksInfo });
            } else {
                res.status(400).send({ error: 'Fail to get info by id' });
            };

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        };
    };

    updatedBroowingBooksById = async (req, res) => {
        try {
            const exitingBorrowBooks = await borrowBooks.findByPk(req.params.id);
            if (!exitingBorrowBooks) {
                res.status(400).send({ error: 'failed to found' });
            };
            await borrowBooks.update({
                bookId: req.body.bookId,
                studentId: req.body.studentId
            }, { where: { id: req.params.id } });
            const updateBorrowBooks = await borrowBooks.findByPk(req.params.id);
            if (updateBorrowBooks) {
                res.stauts(200).send({ data: updateBorrowBooks });
            } else {
                res.stauts(400).send({ error: 'Failed to update info' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' })
        };
    };

    deleteBroowingBooksById = async (req, res) => {
        try {
            const deleteBroowingBooks = await borrowBooks.destroy({ where: { id: req.params.id } });
            if (deleteBroowingBooks) {
                res.status(200).send({ data: 'Delete sucessfully' });
            } else {
                res.status(400).send({ error: 'Failed to delete info' });
            };

        } catch (error) {
            console.error(error);
            res.stauts(500).send({ error: 'Internal server error' });
        };
    };

    borrowBooksCount = async (req, res) => {
        try {
            const { studentId, bookId } = req.body;

            // Call borrowBooksValue function to handle borrowing
            const message = await borrowBooksValue(studentId, bookId);

            // Send appropriate response based on the message
            if (typeof message === 'string') {
                res.status(200).send({ message: message });
            } else {
                res.status(201).send({ data: message });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        }
    };



    returingBooksCount = async (req, res) => {
        try {
            const { studentId, bookId } = req.body;

            // Call returnBook function to handle returning books
            const message = await returnBook(studentId, bookId);

            // Send appropriate response based on the message
            if (typeof message === 'string') {
                res.status(200).send({ message: message });
            } else {
                res.status(201).send({ data: message });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        }
    }







}

module.exports = new borrowBooksController();