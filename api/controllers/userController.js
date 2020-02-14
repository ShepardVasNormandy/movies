// 'use strict'

const mongoose = require('mongoose')

const Movie = mongoose.model('Movie')

const User = mongoose.model('User')


const rp = require('request-promise')

const jwt = require('jsonwebtoken')

const secret = require('../config/credentials')

const auth = {

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
    User.findOne({ "email": user.email }).lean().then(alreadySaved => {
        if (alreadySaved) {
            return res.status(400).json({
                errors: {
                    message: 'User already exists.'
                }
            })
        }

        if (!user.username) {
            return res.status(500).json({
                errors: {
                    name: 'is required'
                }
            })
        }

        if (!user.birthday) {
            return res.status(500).json({
                errors: {
                    birthday: 'is required'
                }
            })
        }
        const finalUser = new User(user)

        return finalUser.save().then(() => {
            res.json({ user: finalUser })
        })
    })
}

const loginUser = (req, res, next) => {
    const user = req.body

    console.warn(`CALL TO LOG THE USER IN. BODY ${JSON.stringify(req.body)}`)


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
                email: 'is required'
            }
        })
    }

    User.findOne({ email: user.email.toLowerCase() }).then(userProfile => {
        if (!userProfile) {
            return res.status(500).json({
                errors: {
                    user: 'not found'
                }
            })
        }
        const validPassword = userProfile.comparePassword(user.password)
        if (!validPassword) {
            return res.status(500).json({
                errors: {
                    password: 'wrong'
                }
            })
        }
        const token = jwt.sign({ userId: userProfile._id }, secret.crypto, { expiresIn: '24h' })
        res.json({
            success: true,
            user: { userId: userProfile._id, username: userProfile.username },
            token: token
        })
    })

}

const deleteUser = (req, res) => {
    const userId = req.params.id
    User.deleteOne({ _id: userId }).lean().then(() => {
        res.json(`User with id ${userId} has been deleted successfully`)
    })
}

const getAllUsers = (req, res, next) => {
    return User.find({}).lean().then(users => {
        if (!users) {
            return res.status(404).json("No user found")
        }
        return res.json({
            users
        })
    })
}

const getUserByEmail = (req, res, next) => {
    let email = req.body.email

    return User.find({ email }).lean().then(user => {
        if (!user) {
            return res.status(404).json("No user found")
        }
        return res.json({
            user
        })
    })
}

const vote = (req, res) => {
    const userId = req.body.userId
    const movieId = req.body.movieId
    const vote = req.body.vote
    if (!movieId) {
        return res.status(500).json({
            errors: {
                movieId: 'required'
            }
        })
    }
    if (!userId) {
        return res.status(500).json({
            errors: {
                userId: 'required'
            }
        })
    }
    if (!vote) {
        return res.status(500).json({
            errors: {
                vote: 'required'
            }
        })
    }
    User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json("No user found")
        }
        if (vote === 1 && user.movies && user.movies.length === 3) {
            return res.status(500).json({
                errors: {
                    message: `You have already voted for three movies.`
                }
            })
        }
        Movie.findById(movieId).then(movie => {
            if (!movie) {
                return res.status(404).json("No movie found")
            }
            if (user.movies.find(result => result._id === movie._id)) {
                if (vote === 1  && user.movies.length < 3) {
                    user.movies.unshift(movie)
                    movie.score ++
                    User.findOneAndUpdate({_id:user._id}, user, {new:true}).lean().then(updatedUser => {
                        Movie.findOneAndUpdate({_id:movie._id}, movie, {new:true}).lean().then(updatedMovie => {
                            res.status(200).json({
                                message: `User ${user.username} has voted on ${movie.Title}. Its new score is ${updatedMovie.score}`,    
                            })
                        })
                    })
                } else if (vote === 0  && user.movies.length < 3) {
                    user.movies.push(movie)
                    movie.score --
                    User.findOneAndUpdate({_id:user._id}, user, {new:true}).lean().then(updatedUser => {
                        Movie.findOneAndUpdate({_id:movie._id}, movie, {new:true}).lean().then(updatedMovie => {
                            res.status(200).json({
                                message: `User ${user.username} has voted on ${movie.Title}. Its new score is ${updatedMovie.score}`,
    
                            })
                        })
                    })
    
                }
            }
            res.status(500).json({
                error: {
                    message: `You've already voted on this movie.`
                }
            })
        })
    })
}

module.exports = {
    createUser,
    getUserMovies,
    deleteUser,
    vote,
    getUserByEmail,
    getAllUsers,
    loginUser
}







