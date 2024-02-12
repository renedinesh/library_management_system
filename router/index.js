const initializeRoutes = (app) => {
    app.use('/student', require('./student'));
    app.use('/staff', require('./staff'));
    app.use('/books',require('./books'));
};



module.exports = initializeRoutes;