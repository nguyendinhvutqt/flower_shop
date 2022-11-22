const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    if (!token) {
        return res.status(404).json({
            message: 'Token không hợp lệ!'
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'Tài khoản chưa được xác thực'
            })
        }
        if (user.role) {
            next()
        } else {
            return res.status(404).json({
                message: 'Tài khoản chưa được xác thực'
            })
        }
    })
}

module.exports = authMiddleware