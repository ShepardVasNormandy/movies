const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Movie = require('./api/models/movieListModel')
const User = require('./api/models/UserModel')
const bodyParser = require('body-parser')
const routes = require('./api/routes/routes')

const passport = require('passport')

const config = require('./api/config/passport')


const cors = require('cors')

const movieCtrl = require('./api/controllers/movieListController')

mongoose.Promise = global.Promise
mongoose.connect( 'mongodb://localhost/Moviedb')

app.use(passport.initialize())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

routes(app)

app.listen(port)

// movieCtrl.createMovies()

console.warn(`Movie API started on ${port}`)