const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createUserService = ({ email, fullName, password }) => {
    return new Promise( async (resolve, reject) => {
        try {
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            if (isEmail) {
                const checkEmail = await User.find({email: email})
                if (checkEmail.length) {
                    resolve({
                        status: 'error',
                        message: 'Email đã tồn tại!'
                    })
                }
                const hashPassword = bcrypt.hashSync(password, 10)
                const newUser = User.create({
                    email: email,
                    fullName: fullName,
                    password: hashPassword,
                })
                resolve({
                    status: 'success',
                    data: {
                        email: newUser.email,
                        fullName: newUser.fullName,
                    }
                })
            } else {
                resolve({
                    status: 'error',
                    message: 'Email không đúng định dạng!'
                })
            }
        } catch (error) {
            reject({
                status: 'error',
                message: error
            })
        }
    })
}

const loginUserService = ({email, password}) => {
    return new Promise( async (resolve, reject) => {
        try {
            const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
            if (isEmail) {
                const checkUser = await User.find({email: email})
                if (checkUser) {
                    const checkPassword = bcrypt.compare(password, checkUser[0].password)
                    if (checkPassword) {
                        const access_token = jwt.sign({ isAdmin: checkUser[0].role, email: checkUser[0].email, fullName: checkUser[0].fullName})
                        resolve({
                            status: 'success',
                            data: {
                                access_token
                            }
                        })
                    }
                    resolve({
                        status: 'error',
                        message: 'Email hoặc mật khẩu không đúng!'
                    })
                } else {
                    resolve({
                        status: 'error',
                        message: 'Email không tồn tại!'
                    })
                }
            } else {
                resolve({
                    status: 'error',
                    message: 'Email không đúng định dạng!'
                })
            }
        } catch (error) {
            reject({
                status: 'error',
                message: error
            })
        }
    })

}

module.exports = {
    createUserService,
    loginUserService
}