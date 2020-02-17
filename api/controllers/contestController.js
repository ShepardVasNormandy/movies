// 'use strict'

const mongoose = require('mongoose')

const Contest = mongoose.model('Contest')

const getContest = (req, res) => {
    Contest.find({}).then(contest => {
        res.json(contest)
    })
}

const createContest = () => {
    const contest = new Contest()
    return contest.save().then((newContest) => {
        console.log({
            success: true,
            expiration_date: contest.expiration_date
        })
    })
}


module.exports = {
    getContest,
    createContest
}







