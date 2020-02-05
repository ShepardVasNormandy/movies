'use strict'
//PLUGINS
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var MovieSchema = new Schema({
    name: {
        type: String,
        required: 'Enter movie name'
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    }
})

module.exports = mongoose.model('Movie', MovieSchema)