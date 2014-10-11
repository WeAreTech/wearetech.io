/**
 * @fileOverview The parallel task operation.
 */
module.exports = function(grunt) {
  grunt.config('parallel', {
    web: {
      options: {
        stream: true
      },
      tasks: [{
        grunt: true,
        args: ['watch:frontend']
      }, {
        grunt: true,
        args: ['open:server']
      }, {
        grunt: true,
        args: ['watch:scripts']
      }, {
        grunt: true,
        args: ['watch:stylesMain']
      }, {
        grunt: true,
        args: ['watch:stylesCity']
      }, {
        grunt: true,
        args: ['watch:web']
      }]
    },
    api: {
      options: {
        stream: true
      },
      tasks: [{
        grunt: true,
        args: ['watch:api']
      }, {
        grunt: true,
        args: ['watch:apiTest']
      }]
    }
  });
};
