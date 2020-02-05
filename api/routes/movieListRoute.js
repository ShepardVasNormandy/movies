'use strict';
module.exports = (app) => {
  var Movie = require('../controllers/movieListController');

  // movieList Routes
  app.route('/movies')
    .get(Movie.listAllMovies)

  app.route('/movies/:movieId')
    .put(Movie.updateMovie)
    .post(Movie.createMovie)
};
