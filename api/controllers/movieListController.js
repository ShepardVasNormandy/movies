'use strict'

var mongoose = require('mongoose')

const Movie = mongoose.model('Movie');
const rp = require('request-promise');

const _ = require('lodash')

const listAllMovies = (req, res) => {
    Movie.find({}).lean().then(movie => {
        res.json(movie)
    }).catch(err => {
        res.json(err)
    })
}

const bestMovie = (req, res) => {
    Movie.find({}).lean().then(movies => {
        movies = _.orderBy(movies, ['score'], ['desc'])
        res.json(movies)
    }).catch(err => {
        res.json(err)
    })
}

const createMovies = (req, res) => {
    rp.get(' http://www.omdbapi.com/?s=wars&type=movie&apikey=c1d4f942').then(movies => {
        JSON.parse(movies).Search.forEach((item, index) => {
            item['_id'] = item.imdbID
            item['score'] = 0
            let movie = new Movie(item)
            movie.save((result) => {
                console.warn(result)
            })
        })
    })
}

module.exports = {
    listAllMovies,
    bestMovie,
    createMovies
}