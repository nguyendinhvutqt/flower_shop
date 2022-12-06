const userService = require('../services/userService')
const User = require('../models/userModel')

const getLogin = (req, res) => {
    return res.render('login.ejs')
}

const getRegister = (req, res) => {
    return res.render('register.ejs', {status: null, data: null})
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

const  registerUserService = async (req, res) => {
    console.log(req.body);
    const { email, fullName, password, confirmPassword } = req.body;
    if ( !email || !fullName || !password || !confirmPassword ) {
        return res.render('register.ejs', {
            status: 'error',
            message: 'Bạn phải nhập đầy đủ thông tin'
        })
    }
    if (password !== confirmPassword) {
        return res.render('register.ejs', {
            status: 'error',
            message: 'Mật khẩu và nhập lại mật khẩu không khớp!'
        })
    }
    const response = await userService.createUserService({email, fullName, password})
    if (response) {
        console.log(response)
        return res.render('register.ejs', response)
    }
}

const createUser = async (req, res) => {
    const { email, fullName, password, confirmPassword } = req.body
    const newUser = await User.create({email: email, fullName: fullName, password: password})
    if (newUser) {
        return res.json({
            status: 'success', 
            data: {newUser}
        })
    }
}

module.exports = {
    getLogin,
    getRegister,
    loginUserService,
    registerUserService,
    createUser
}

