/**
 * @fileOverview The SASS Compiling task operation.
 */
module.exports = function(grunt) {
  grunt.config('sass', {
    main: {
      files: [{
        'front/static/styles/main.src.css': 'front/styles/boot.scss',
      }]
    },
    cities: {
      files: [{
        'front/static/styles/city.src.css': 'front/styles-city/boot.scss',
      }]
    },
  });
};
