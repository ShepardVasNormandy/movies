
//PLUGINS
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var moment = require('moment')

var ContestSchema = new Schema({
    creation_date: {
        type: Number,
        default: moment().format('x')
    },
    expiration_date: {
        type: Number,
        default: moment(this.creation_date).add(1,'week').format('x')
    }
})

module.exports = mongoose.model('Contest', ContestSchema)