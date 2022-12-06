const userService = require('../services/userService')
const jwtService = require('../services/jwtService')

const getLogin = (req, res) => {
    return res.render('login.ejs', { status: null, data: null })
}

const getRegister = (req, res) => {
    return res.render('register.ejs', { status: null, data: null })
}

const loginUserService = async (req, res) => {
    const { email, password } = req.body
    console.log('data', req.body)
    if ( !email || !password ) {
        return res.render('login.ejs', {
            status: 'error',
            message: 'Bạn phải nhập đầy đủ email và mật khẩu!'
        })
        
    }
    const response = await userService.loginUserService({email, password})
    // const { refresh_token, ...newResponse } = response
    // req.cookie('refresh_token', refresh_token, {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: 'strict',
    //     path: '/'
    // })
    return res.render('login.ejs', response)
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

const updateUserService = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.json({
                status: 'error',
                message: 'Không tồn tại userId!'
            })
        }
        const response = await userService.updateUserService(userId, data)
        if (response) {
            return res.json(response)
        }
    } catch (error) {
        return res.json({ message: error })
    }
}

const deleteUserService = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.json({
                status: 'error',
                message: 'Không tồn tại userId!'
            })
        }
        const response = await userService.deleteUserService(userId)
        if (response) {
            return res.json(response)
        }
    } catch (error) {
        return res.json({ message: error })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await jwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    getLogin,
    getRegister,
    loginUserService,
    registerUserService,
    updateUserService,
    deleteUserService,
    refreshToken
}

