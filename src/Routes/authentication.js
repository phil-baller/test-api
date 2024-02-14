const Router = require('express')
const User = require('../Database/models')
const mongoose = require('mongoose')
const { hashPassword, comparePassword } = require('../utils/helper')
const jwt = require('jsonwebtoken')

const secret = "Some random has password";
const router = Router();

function generateAccessToken(user) {
    return jwt.sign(user, secret, { expiresIn: '1800s' })
}

function generateRefreshToken(user) {
    return jwt.sign(user, secret)
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    const userDB = await User.findOne({ email })
    if (userDB) {
        res.send('User Already exists')
    } else {
        const password = hashPassword(req.body.password);
        const newUser = await User.create({ email, password })
        console.log(newUser)
        newUser.save();
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        res.send('User not found')
    }
    if (user) {
        const check = comparePassword(password, user.password)
        if (check) {
            const accessToken = generateAccessToken({ email: req.body.email })
            const refreshToken = generateRefreshToken({ email: req.body.email })
            res.send({ accessToken, refreshToken })
        } else {
            res.send('Failed to login user');
        }
    } else {
        res.send('Failed to login user')
    }
})

module.exports = router;