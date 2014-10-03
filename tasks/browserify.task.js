/**
 * @fileOverview The Browserify task operation.
 */
module.exports = function(grunt) {
  grunt.config('browserify', {
    dist: {
      city: {
        'front/static/scripts/city.src.js': ['front/js-city/app.js'],
      }
    }
  });
};
