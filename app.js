const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Movie = require('./api/models/movieModel')
const User = require('./api/models/UserModel')
const bodyParser = require('body-parser')
const routes = require('./api/routes/routes')

const cors = require('cors')

const movieCtrl = require('./api/controllers/movieListController')

mongoose.Promise = global.Promise
mongoose.connect( 'mongodb://localhost/Moviedb')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

routes(app)

app.listen(port)

//When starting server, this function populates the collection 'Movies'.
//Either uncomment it on first launch, use an already existing database, or call it later on
//Otherwise no movies will show in the database

// movieCtrl.createMovies()

console.warn(`Movie API started on ${port}`)