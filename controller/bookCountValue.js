const Student = require('../model/student');
const Book = require('../model/books');
const BorrowBooks = require('../model/borrowBooks.model');


async function borrowBooksValue(rollNo, bookId) {
    try {
        const student = await Student.findByPk(rollNo);
        if (!student) {
            return 'User not found';
        }

        const book = await Book.findByPk(bookId);
        if (!book) {
            return 'Book not available';
        } else if (book.numOfCopies <= 0) {
            return 'No copies available';
        } else {
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 7)
            const updatedBook = await Book.update({ numOfCopies: book.numOfCopies - 1 }, { where: { id: bookId } });
            //console.log("numOfCopies:", updatedBook[0].numOfCopies);
            await BorrowBooks.create({ studentId: rollNo, bookId: bookId, borrowedAt: new Date(), dueDate: dueDate });
            return 'Book borrowed successfully';
        }
    } catch (error) {
        console.error('Error borrowing book:', error.message);
        throw error;
    }
}

async function returnBook(studentId, bookId) {
    try {
        const student = await Student.findByPk(studentId)
        if (!student) {
            return 'student not found'
        }

        const book = await Book.findByPk(bookId)
        if (!book) {
            return 'book not found'
        }

        const borrowingRecord = await BorrowBooks.findOne({where: { studentId: studentId, bookId: bookId, status: '1' }});
        if (!borrowingRecord) {
            return 'No active borrow book and student found'
        }

        const dueDate = borrowingRecord.borrowedAt.setDate(borrowingRecord.borrowedAt.getDate() + 7)
        const returnDate = new Date();
        const daysOverdue = Math.max(0, Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24)));
        const fine = daysOverdue * 10;

        await Book.update({ numOfCopies: book.numOfCopies + 1 }, { where: { id: bookId } });
        await BorrowBooks.update({ status: '0' }, { where: { studentId: studentId, bookId: bookId } });
        if (daysOverdue == 0) {
            return 'Book returned successfully on time';
        } else {
            return `Book returned successfully with a fine of Rs:${fine}`;
        }


    } catch (error) {
        console.error('Error returning book:', error.message);
        throw error;
    }


}

module.exports = { borrowBooksValue, returnBook };
