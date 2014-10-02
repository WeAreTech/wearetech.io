/**
 * @fileOverview The cssmin task operation.
 */
module.exports = function(grunt) {
  grunt.config('cssmin', {
    main: {
      files: {
        'front/static/styles/main.css': [
          'front/static/styles/main.src.css',
        ]
      }
    },
    cities: {
      files: {
        'front/static/styles/city.css': [
          'front/static/styles/city.src.css',
        ]
      }
    },
  });
};
