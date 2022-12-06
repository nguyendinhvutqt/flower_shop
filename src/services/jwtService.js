const jwt = require('jsonwebtoken')

const genaralAccessToken = (data) => {
    const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
    return access_token
}

const genaralRefreshToken = (data) => {
    const access_token = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '365d'})
    return access_token
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                if (err) {
                    console.log('err', err)
                    resolve({
                        status: 'ERR',
                        message: 'The authemtication'
                    })
                }
                const access_token = await genaralRefreshToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'SUCESS',
                    access_token
                })
            })
        } catch (e) {
            reject(e)
        }
    })

}

module.exports = {
    genaralRefreshToken,
    genaralAccessToken,
    refreshTokenJwtService
}