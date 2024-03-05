const sequelize = require('../config/database');
const Constants = require('../model/constants');
const Students = require('../model/student')

async function incrementLastRollNumberCount() {
    let lastRollNo = await getLastRollNumber();
    console.log('Received last roll number:', lastRollNo); 
    let updateRollNo = incrementRollNo(lastRollNo);
    await Constants.update({ count: updateRollNo }, { where: { id: 1 } })

    return updateRollNo;
}


async function getLastRollNumber() {
    const lastStudent = await Students.findOne({
        attributes: ['rollNo'],
        order: [['id', 'DESC']]
    });

    console.log('Last student:', lastStudent); 

    if (!lastStudent) {
        return "STU0000";
    } else {
        return lastStudent.rollNo;
    }
}

function incrementRollNo(count) {
    console.log('Received count:', count);

    if (!count || typeof count !== 'string' || !count.startsWith('STU') || count.length !== 7 || isNaN(parseInt(count.substring(3)))) {
        //console.error('Invalid roll number format:', count);
        throw new Error('Invalid roll number format');
    }

    const prefix = 'STU';
    const numberPart = parseInt(count.substring(3));
    const nextNumberPart = numberPart + 1;
    const nextNumberPartString = String(nextNumberPart).padStart(4, '0');
    //console.log("Next number part:", nextNumberPartString);
    return `${prefix}${nextNumberPartString}`;
}





module.exports = { incrementLastRollNumberCount }
