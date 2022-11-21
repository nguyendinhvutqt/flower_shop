const userRouter = require('./userRouter')

const routes = (app) => {
    app.use('/user', userRouter);
    app.use('/', (req, res) => {
        res.render('home.ejs')
    })
}

module.exports = routes