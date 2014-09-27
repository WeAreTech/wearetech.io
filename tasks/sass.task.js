/**
 * @fileOverview The SASS Compiling task operation.
 */
module.exports = function(grunt) {
  grunt.config('sass', {
    main: {
      files: [{
        'temp/main-sass.css': 'front/styles/boot.scss',
      }]
    },
    city: {
      files: [{
        'front/static/styles/city.src.css': 'front/styles-city/boot.scss',
      }]
    },
  });

};
