const Author = require('../model/author.model');
const Books = require('../model/books')

class authorController {

    createAuthorDetails = async (req, res) => {
        try {
            const datas = {
                name: req.body.name,
                address: req.body.address,
                phoneNo: req.body.phoneNo,
                bookId: req.body.bookId
            }

            const creatingDetails = await Author.create(datas);
            if (creatingDetails) {
                res.status(201).send({ data: creatingDetails });
            } else {
                res.status(404).send({ error: 'Failed to create author details' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        };
    };

    getAllAuthorDetails = async (req, res) => {
        try {
            const gettingAllAuthorDetails = await Author.findAll();
            if (gettingAllAuthorDetails) {
                res.status(200).send({ data: gettingAllAuthorDetails });
            } else {
                res.status(404).send({ error: 'Fail to get all author details' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        };
    };

    gettingAuthorDetailsById = async (req, res) => {
        try {

            const getAllAuthorDetailsById = await Author.findOne({ where: { id: req.params.id } });
            if (getAllAuthorDetailsById) {
                res.status(200).send({ data: getAllAuthorDetailsById });
            } else {
                res.status(404).send({ error: 'Fail to get Author details by id' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        };
    };

    updatedAuthorDetailsById = async (req, res) => {
        try {
            const existingAuthorDetail = await Author.findByPk(req.params.id);
            if (!existingAuthorDetail) {
                res.status(404).send({ error: 'Author not found' });
            }

            await Author.update({
                name: req.body.name,
                address: req.body.address,
                phoneNo: req.body.phoneNo,
                bookId: req.body.bookId
            }, { where: { id: req.params.id } })
            const updatedAuthorDetail = await Author.findByPk(req.params.id);
            if (updatedAuthorDetail) {
                res.status(200).send({ data: updatedAuthorDetail });
            };
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        };
    };

    deleteAuthorDetailsById = async (req, res) => {
        try {
            const deleteAuthoerDetail = await Author.destroy({ where: { id: req.params.id } });
            if (deleteAuthoerDetail) {
                res.status(200).send({ data: 'Deleted Sucessfully' });
            } else {
                res.status(404).send({ error: 'Unable to delete author details' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        };
    };



    findAuthorDetails = async (req, res) => {
        try {
            const authorId = req.params.id; 
            const author = await Author.findByPk(authorId, {
                attributes: ['name'],
                include: [
                    {
                        model: Books, // Assuming your Book model is named Books
                        attributes: ['bookId', 'category', 'publisher', 'price']
                    }
                ]
            });
    
            if (!author) {
                return res.status(404).send({ error: 'Author not found' });
            }
    
            
            // const books = await Books.findAll({
            //     where: { authorId: authorId },
            //     attributes: ['bookId', 'category', 'publisher', 'price']
            // });
    
         
            const authorInfo = {
                author: author,
                books: books
            };
    
            res.status(200).send({ data: authorInfo });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        }
    };
         

};

module.exports = new authorController();