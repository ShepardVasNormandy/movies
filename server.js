const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Movie = require('./api/models/movieListModel')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect( 'mongodb://localhost/Moviedb'/* , { useNewUrlParser: true, useUnifiedTopology: true } */)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use((req, res) => {
//     res.status(404).send({ url: `${req.originalUrl} not found` })
// })

const routes = require('./api/routes/movieListRoute')
routes(app)

app.listen(port)

console.warn(`Movie API started on ${port}`)