const sequelize = require('../config/database');
const Books = require('../model/books');
const Constants = require('../model/constants');


async function bookIncrementId() {

    let lastCount = await getLastBookCount();
    console.log('lastCount:', lastCount);
    let updatedCount = await incrementBookId(lastCount);
    const prefix = 'BOOK';
    //await Bookautoid.update({ count: updatedCount, name: 'BOOK', prefix: prefix }, { where: { count: lastCount, status: 1 } })
    //await Bookautoid.update({ count: updatedCount}, { where: { id: 2 } })
    await Constants.update({ count: updatedCount }, { where: { id: 2 } })
    return updatedCount;

}

async function getLastBookCount() {
    const lastBook = await Books.findOne({
        attributes: ['bookId'],
        order: [['id', 'DESC']]
    });

    console.log('lastBook:', lastBook);

    if (!lastBook) {
        return "BOOK0000";
    } else {
        return lastBook.bookId;
    }
}

async function incrementBookId(count) {
    console.log('count:', count);
    if (!count || typeof count !== "string" || !count.startsWith('BOOK') || count.length !== 8 || isNaN(parseInt(count.substring(4)))) {
        console.error('Invalid book number format:', count);
        throw new Error('Invalid book number format');
    }

    const prefix = 'BOOK';
    const numberPart = parseInt(count.substring(4));
    const nextNumberPart = numberPart + 1;
    const nextNumberPartString = String(nextNumberPart).padStart(4, '0');
    console.log("Next number part:", nextNumberPartString);
    return `${prefix}${nextNumberPartString}`;
}


module.exports = { bookIncrementId }