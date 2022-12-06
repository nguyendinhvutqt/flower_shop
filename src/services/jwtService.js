const jwt = require('jsonwebtoken')

const genaralAccessToken = (data) => {
    const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3h'})
    return access_token
}

const genaralRefreshToken = (data) => {
    const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '365d'})
    return access_token
}

module.exports = {
    genaralRefreshToken,
    genaralAccessToken
}