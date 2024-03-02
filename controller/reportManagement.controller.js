const { Sequelize } = require('sequelize');
const Book = require('../model/books');
const borrowBook = require('../model/borrowBooks.model');

class reportManagement {

    infoByAuthorName = async (req, res) => {
        try {
            const authorName = req.params.author;
            const authorNameList = await Book.findOne({ where: { author: authorName } });
            if (authorNameList) {
                res.status(200).send({ data: authorNameList });
            } else {
                res.status(400).send({ error: 'Fail to get author name list' })
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' })
        };
    };

    bookReturnStatus = async (req, res) => {
        try {
            const bookId = req.params.bookId;
        const bookStatus = await borrowBook.findAll({where:{bookId: bookId}});
        if(bookStatus) {
            const bookDetails = bookStatus.map(bookStatus=>({
                bookId:bookStatus.bookId,
                studentId:bookStatus.studentId,
                status:bookStatus.status,
                fineAmount: bookStatus.fineAmount
            }))
            res.status(200).send({bookDetails})
        }else{
            res.status(400).send({error: 'Fail to get book status'})
        }
        } catch (error) {
            console.error('Error fetching book status:', error);
            res.status(500).send({error: 'Internal server error'})
        }
    };

    notReturnBooks = async(req,res)=>{
        try {
            const infoNotReturnBooks = await borrowBook.findAll({where:{status:'1'}})
        if(infoNotReturnBooks){
            const bookDetails = infoNotReturnBooks.map(infoNotReturnBooks=>({
                bookId:infoNotReturnBooks.bookId,
                studentId:infoNotReturnBooks.studentId,
                status:infoNotReturnBooks.status,
                fineAmount: infoNotReturnBooks.fineAmount
            }))
            res.status(200).send({data:bookDetails })
        }else{
            res.status(400).send({error:'Fail to get not return books details'})
        };
        } catch (error) {
            console.error('Error fetching book status:', error);
            res.status(500).send({error: 'Internal server error'})
        };
        
    };

    dueStatus = async(req,res)=>{
        try {
            const dueInfo = await borrowBook.findAll({where:{fineAmount: { [Sequelize.Op.not]: null }}})
        if(dueInfo){
            res.status(200).send({data: dueInfo})
        }else{
            res.status(400).send({error: 'Fail to get due info'})
        }
        } catch (error) {
            console.error('Error fetching book status:', error);
            res.status(500).send({error: 'Internal server error'})
        }
        
    }


};

module.exports = new reportManagement();