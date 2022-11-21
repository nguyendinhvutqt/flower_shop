const userRouter = require('./userRouter')

const routes = (app) => {
    app.use('/user', userRouter);
    app.use('/', (req, res) => {
        res.send('Welcome');
    })
}

module.exports = routes