const userService = require('../services/userService')

const getLogin = (req, res) => {
    res.render('login.ejs')
}

const loginUserService = async (req, res) => {
    const { email, password } = req.body
    if ( email && password ) {
        const response = await userService.loginUserService({email, password})
        return res.json(response)
    } else {
        return res.json({
            status: 'error',
            message: 'Bạn phải nhập đầy đủ email và mật khẩu!'
        })
    }
}

module.exports = {
    getLogin,
    loginUserService
}

