const Student = require('../model/student');
const Book = require('../model/books');
const BorrowBooks = require('../model/borrowBooks.model'); 


async function borrowBooksValue(rollNo, bookId) {
    try {
        const student = await Student.findByPk(rollNo);
        if (!student) {
            return'User not found';
        }
        
        const book = await Book.findByPk(bookId);
        if (!book) {
            return'Book not available';
        } else if (book.numOfCopies <= 0) {
            return 'No copies available';
        } else {
            // Decrement the number of copies and update the database
            const updatedBook = await Book.update({ numOfCopies: book.numOfCopies - 1 }, { where: { id: bookId } });
            //console.log("numOfCopies:", updatedBook[0].numOfCopies); // Log the updated numOfCopies
            // Create a borrowing record in the BorrowBooks table
            await BorrowBooks.create({ studentId: rollNo, bookId: bookId, borrowedAt:new Date() });
            return 'Book borrowed successfully';
        }
    } catch (error) {
        console.error('Error borrowing book:', error.message);
        throw error; 
    }
}

async function returnBook(studentId, bookId){
    try {
        const student  = await Student.findByPk(studentId)
    if(!student){
        return 'student not found'
    }

    const book = await Book.findByPk(bookId)
    if(!book){
        return 'book not found'
    }else if(book.numOfCopies <= 0){
        return 'No book available';
    }else{
        const updatedBooks = await Book.update({numOfCopies: book.numOfCopies + 1}, {where:{id: bookId}});
        await BorrowBooks.update(
            { status: '0' },
            { where: { studentId: studentId, bookId: bookId } }
        );
        
        return 'Book return successfully';
    }
        
    } catch (error) {
        console.error('Error returning book:', error.message);
        throw error;
    }

    
}

module.exports = { borrowBooksValue,returnBook };
