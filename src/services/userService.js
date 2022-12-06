const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwtService = require('../services/jwtService')

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
                const newUser = await User.create({
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
            console.log('That bai')
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
            if (!isEmail) {
                resolve({
                    status: 'error',
                    message: 'Email không đúng định dạng!'
                })
            } 
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 'error',
                    message: 'Email không tồn tại!'
                })
            }
            const checkPassword = await bcrypt.compare(password, checkUser.password)
            if (checkPassword) {
                const access_token = await jwtService.genaralAccessToken({ id: checkUser.id, isAdmin: checkUser.isAdmin, email: checkUser.email, fullName: checkUser.fullName})
                const refresh_token = await jwtService.genaralRefreshToken({ id: checkUser.id, isAdmin: checkUser.isAdmin, email: checkUser.email, fullName: checkUser.fullName})
                resolve({
                    status: 'success',
                    data: {
                        access_token,
                        refresh_token
                    }
                })
            }
            resolve({
                status: 'error',
                message: 'Mật khẩu không đúng!'
            })
        } catch (error) {
            reject({
                status: 'error',
                message: error
            })
        }
    })
}

const updateUserService = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkUser = await User.find({id})
            if (!checkUser) {
                resolve({
                    status: 'error',
                    message: 'User không tồn tại!'
                })
            } 
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'success',
                data: updateUser
            })
        } catch (error) {
            reject({
                status: 'error',
                message: error
            })
        }
    })
}

const deleteUserService = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkUser = await User.find({id})
            if (!checkUser) {
                resolve({
                    status: 'error',
                    message: 'User không tồn tại!'
                })
            }
            await User.findByIdAndRemove(id)
            resolve({
                status: 'success'
            })
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
    loginUserService,
    updateUserService,
    deleteUserService
}