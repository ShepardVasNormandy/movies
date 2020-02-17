'use strict';
module.exports = (app) => {
    var movieCtrl = require('../controllers/movieListController');
    var userCtrl = require('../controllers/userController');
    var contestCtrl = require('../controllers/contestController');

    // Movie Routes
    app.route('/movies')
        .get(movieCtrl.listAllMovies)

    app.route('/movies/best')
        .get(movieCtrl.bestMovie)

    // User routes
    app.route('/user')
        .post(userCtrl.createUser)

    app.route('/login')
        .put(userCtrl.loginUser)

    app.route('/vote')
        .put(userCtrl.vote)

    //Contest routes
    app.route('/contest')
        .get(contestCtrl.getContest)

};
