'use strict';
module.exports = (app) => {
    var movieCtrl = require('../controllers/movieListController');
    var userCtrl = require('../controllers/userController');

    // movieList Routes
    app.route('/movies')
        .get(movieCtrl.listAllMovies)

    app.route('/movies/:movieId')
        .put(movieCtrl.updateMovie)


    app.route('/user/:id')
        .get(userCtrl.getUserMovies)
        .put(userCtrl.vote)

    app.route('/user')
        .post(userCtrl.createUser)
        .put(userCtrl.connectUser)


    app.route('/admin/:collectionName')
        .delete(movieCtrl.deleteCollection)

};
