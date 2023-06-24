const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: 'Unauthorized'})
            } else {
                const user = await User.findById(decodedToken.id)
                if (user){
                    res.locals.user = user
                    next()
                } else {
                    res.status(401).json({message: 'Unauthorized'})
                }
            }
        })
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }
}