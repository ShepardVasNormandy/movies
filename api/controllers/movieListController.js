'use strict'

var mongoose = require('mongoose')

const Movie = mongoose.model('Movie');

const listAllMovies = (req, res) => {
    Movie.find({}).lean().then(movie => {
        res.json(movie)
    }).catch(err => {
        resizeBy.send(err)
    })
}
const updateMovie = (req, res) => {
    Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}).lean().then(movie => {
        res.json(movie)
    }).catch(err => {
        resizeBy.send(err)
    })
}
const createMovie = (req, res) => {
    var movie = new Movie({name:req.body.name})
    movie.save((result) => {
        res.json(result)
    })
}

module.exports = {
    listAllMovies,
    updateMovie,
    createMovie
}