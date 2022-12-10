const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')
const Product = require('../models/productModel')

const routes = (app) => {
    app.use('/user', userRouter);
    app.use('/admin', adminRouter);
    app.use('/', async (req, res) => {
        try {
            const productsTop = await Product.find().limit(8).sort({among_sell: -1})
            const productsNew = await Product.find().limit(4).sort({created_at: -1})
            // return res.send(productsTop)
            return res.render('home.ejs', { productsTop, productsNew })
        } catch (error) {
            return res.json({ error: error})
        }
    })
}

module.exports = routes