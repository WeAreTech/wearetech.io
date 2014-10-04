/**
 * @fileOverview The Browserify task operation.
 */
module.exports = function(grunt) {
  grunt.config('browserify', {
    city: {
      files: {
        'front/static/scripts/city.src.js': ['front/js-city/app.js'],
      }
    },
    main: {
      files: {
        'front/static/scripts/main.src.js': ['front/js-main/app.js'],
      }
    }
  });
};
