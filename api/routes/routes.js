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
        .delete(userCtrl.deleteUser)

    app.route('/user')
        .post(userCtrl.createUser)
        .get(userCtrl.getAllUsers)
        .put(userCtrl.getUserByEmail)

    app.route('/login')
        .put(userCtrl.loginUser)

    app.route('/vote')
        .put(userCtrl.vote)

};
