const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

const User = require('../models/User')

const authenticated = require('../middlewares/authenticated')

const createToken = id => {
    return jwt.sign({id}, 'secret', {
        expiresIn: 3 * 24 * 60 * 60
    })
}

router.get('/checkauth', authenticated, (req, res) => {
    res.status(200).json({user: {name: res.locals.user.name}})
})

router.post('/signup', async (req, res) => {
    try {
        const {name, email, password} = req.body
        if(password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)){
            const salt = bcrypt.genSaltSync(10)
            hashedPassword = bcrypt.hashSync(password, salt)
            await new User({name, email, password: hashedPassword}).save()
            // const token = createToken(user._id)
            // res.cookie('jwt', token, {
            //     withCredentials: true, 
            //     httpOnly: false, 
            //     maxAge: 3 * 24 * 60 * 60 * 1000
            // })
            res.status(201).json({message: 'Sign up successful'})
        } else {
            res.status(400).json({message: 'Invalid Password'})
        }
    } catch (err) {
        if (err.message.includes('User validation failed')) {
            res.status(400).json({message: 'User validation failed'})
        } else if(err.code === 11000) {
            res.status(409).json({message: 'Email already exists'})
        } else {
            res.status(500).json({message: 'Unknown server error'})
        }
    }
})

router.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.login({email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            withCredentials: true, 
            httpOnly: false, 
            maxAge: 3 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({message: 'Sign in successful'})
    } catch (err) {
        if (err.message = 'Incurrect email/password') {
            res.status(400).json({message: 'Incurrect email/password'})
        } else {
            res.status(500).json({message: 'Unknown server error'})
        }
    }
})

// router.post('/signout', authenticated, (req, res) => {

// })

router.post('/changepass', authenticated, async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body
        if(newPassword.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)){
            if (bcrypt.compareSync(oldPassword, res.locals.user.password)) {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(newPassword, salt)
                res.locals.user.password = hash
                await res.locals.user.save()
                res.status(200).json({message: 'Passsword changed successful'})
            } else
                res.status(400).json({message: 'Wrong password'})
        } else
            res.status(400).json({message: 'Invalid password'})
    } catch (err) {
        res.status(500).json({message: 'Password changed unsuccessful'})
    }
})

router.get('/deleteaccount', authenticated, async (req, res) => {
    try {
        await res.locals.user.remove()
        res.status(202).json({message: 'Account deleted successful'})
    } catch (err) {
        res.status(500).json({message: 'Unknown server error'})
    }
})

module.exports = router