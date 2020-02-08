// 'use strict'

const mongoose = require('mongoose')

var passport = require('passport');

const Movie = mongoose.model('Movie')

const User = mongoose.model('User')


const rp = require('request-promise')

const jwt = require('express-jwt')


const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req

    if (authorization && authorization.split[0] === 'Token') {
        return authorization.split(' ')[1]
    }
    return null
}

const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
}



const getUserMovies = (req, res) => {
    res.json(`ok!`)
}

const createUser = (req, res) => {
    const user = req.body

    console.warn(`CALL TO CREATE USER. BODY ${JSON.stringify(req.body)}`)


    if (!user.email) {
        return res.status(500).json({
            errors: {
                email: 'is required'
            }
        })
    }
    User.findOne({ "user.email": user.email }).lean().then(alreadySaved => {
        if (alreadySaved) {
            return res.status(400).json({
                errors: {
                    message: 'User already exists. Please login.'
                }
            })
        }

        if (!user.password) {
            return res.status(500).json({
                errors: {
                    password: 'is required'
                }
            })
        }
        const finalUser = new User(user)

        finalUser.setPassword(user.password)

        return finalUser.save().then(() => {
            res.json({ user: finalUser.toAuthJSON() })
        })
    })
}

const connectUser = (req, res, next) => {
    const user = req.body

    if (!user.email) {
        return res.status(500).json({
            errors: {
                email: 'is required'
            }
        })
    }
    if (!user.password) {
        return res.status(500).json({
            errors: {
                password: 'is required'
            }
        })
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if (err) {
            return next(err)
        }
        if (passportUser) {
            const user = passportUser
            user.token = passportUser.generateJWT()

            return res.json({
                user: user.toAuthJSON()
            })
        }
        return res.status(400).json()
    })(req, res, next)
}

const getCurrentUser = (req, res, next) => {
    const { payload: { id } } = req

    return User.findById(id).then(user => {
        if (!user) {
            return res.sendStatus(400)
        }
        return res.json({
            user: user.toAuthJSON()
        })
    })
}

const vote = (req, res) => {

}

module.exports = {
    createUser,
    getUserMovies,
    connectUser,
    vote,
    auth,
    getTokenFromHeaders,
    getCurrentUser
}