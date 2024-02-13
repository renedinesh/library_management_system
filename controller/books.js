const Books = require('../model/books');

class booksController {

    createBookDetails = async (req, res) => {
        try {
            const datas = {
                author: req.body.author,
                title: req.body.title,
                bookId: req.body.bookId,
                category: req.body.category,
                price: req.body.price,
                edition: req.body.edition,
                publisher: req.body.publisher
            };

            const creatingBookDetails = await Books.create(datas);
            if (creatingBookDetails) {
                return res.status(201).send({ data: creatingBookDetails });
            } else {
                return res.status(404).send({ error: 'Failed to create book details' });
            };
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' });
        };
    };

    getAllBooksDetails = async (req, res) => {
        try {
            const gettingBooksDetails = await Books.findAll();
            if (gettingBooksDetails) {
                return res.status(200).send({ data: gettingBooksDetails });
            } else {
                return res.status(404).send({ error: 'Failed to get all books details' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' });
        };
    };

    updateBooksDetails = async (req, res) => {
        try {
            const exitingBooks = await Books.findByPk(req.params.id)
            if (!exitingBooks) {
                return res.status(404).send({ error: 'Book not found' })
            }
            await Books.update({
                author: req.body.author,
                title: req.body.title,
                bookId: req.body.bookId,
                category: req.body.category,
                price: req.body.price,
                edition: req.body.edition,
                publisher: req.body.publisher
            }, { where: { id: req.params.id } });
            const updatingBooksDetails = await Books.findByPk(req.params.id);

            return res.status(201).send({ data: updatingBooksDetails });


        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' })
        };
    };

    gettingBookDetailsById = async (req, res) => {
        try {
            const findingBookDetailsById = await Books.findOne({ where: { id: req.params.id } });
            if (findingBookDetailsById) {
                return res.status(200).send({ data: findingBookDetailsById });
            } else {
                return res.status(404).send({ error: 'Failed to get book details' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' })
        };
    };

    deletebookInfoById = async (req, res) => {
        try {
            const deletingBookInfo = await Books.destroy({ where: { id: req.params.id } });
            if (deletingBookInfo) {
                return res.status(200).send({ data: 'Sucessfully deleted' });
            } else {
                return res.status(404).send({ error: 'failed to deleted book info' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal server error' })
        };
    };


};

module.exports = new booksController();