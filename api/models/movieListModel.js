
//PLUGINS
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MovieSchema = new Schema({
    _id: String,
    Title: {
        type: String,
        required: 'Movie title is missing'
    },
    Year: {
        type: String,
        required: 'Movie year is missing'
    },
    Poster: {
        type: String,
        required: 'Movie poster url is missing'
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    score: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model('Movie', MovieSchema)