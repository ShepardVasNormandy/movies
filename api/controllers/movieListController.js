'use strict'

var mongoose = require('mongoose')

const Movie = mongoose.model('Movie');
const rp = require('request-promise');

const listAllMovies = (req, res) => {
    Movie.find({}).lean().then(movie => {
        res.json(movie)
    }).catch(err => {
        resizeBy.send(err)
    })
}
const updateMovie = (req, res) => {
    Movie.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).lean().then(movie => {
        res.json(movie)
    }).catch(err => {
        resizeBy.send(err)
    })
}
const createMovies = (req, res) => {
    rp.get(' http://www.omdbapi.com/?s=wars&type=movie&apikey=c1d4f942').then(movies => {
        JSON.parse(movies).Search.forEach((item, index) => {
            item['_id'] = item.imdbID
            let movie = new Movie(item)
            movie.save((result) => {
                console.warn(result)
            })
        })
    })
}

const deleteCollection = (req, res) => {
    let collectionName = req.params.collectionName
    Movie.deleteMany({'status':'pending'}, () => {
        res.send(200, `Collection ${collectionName} has been deleted.`)
    })
}

module.exports = {
    listAllMovies,
    updateMovie,
    createMovies,
    deleteCollection
}