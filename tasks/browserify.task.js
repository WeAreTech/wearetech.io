/**
 * @fileOverview The Browserify task operation.
 */
module.exports = function(grunt) {
  grunt.config('browserify', {
    dist: {
      files: {
        'front/static/scripts/city.src.js': ['front/styles-city/app.js'],
      }
    }
  });
};
