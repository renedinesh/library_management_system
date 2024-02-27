const initializeRoutes = (app) => {
    app.use('/student', require('./student'));
    app.use('/staff', require('./staff'));
    app.use('/books',require('./books'));
    app.use('/author',require('./author'));
    app.use('/borrowbooks',require('./borrowBooks'));
};



module.exports = initializeRoutes;