/*jshint camelcase:false */

var globals = require('./back/core/globals');

var Email = require('./back/services/email');
var emailTemplate = require('./tasks/publish-email-templates.js');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  //
  //
  // Grunt related variables
  //

  // get the current environment.
  // var environment = process.env.NODE_ENV || 'development';

  // Define the webserver port during development.
  var develPort = '3000';

  grunt.initConfig({
    express: {
      options: {
        // Override defaults here
      },
      web: {
        options: {
          script: 'back/app.js',
        }
      },
    },
    open: {
      server: {
        path: 'http://localhost:' + develPort
      }
    },
    cssmin: {
      dist: {
        files: {
          'front/static/styles/main.css': [
            'front/static/styles/main.src.css',
          ]
        }
      },
      city: {
        files: {
          'front/static/styles/city.css': [
            'front/static/styles/city.src.css',
          ]
        }
      },
    },
    parallel: {
      web: {
        options: {
          stream: true
        },
        tasks: [{
          grunt: true,
          args: ['watch:frontend']
        }, {
          grunt: true,
          args: ['open:server'],
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
    },
    clean: {
      deploy: [
        'front/static/scripts',
        'front/static/components',
      ],
    },
    jshint: {
      options: {
        jshintrc: true,
      },
      backend: ['back/**/*.js'],
      frontend: {
        // options: {
        //   jshintrc: 'front/static/scripts/.jshintrc',
        // },
        src: ['front/static/scripts/**/*.js'],
      },
    },
    checkrepo: {
      clean: {
        clean: true,
      },
    },
    gitcommit: {
      frontapp: {
        options: {
          message: 'Build frontapp',
        },
        files: {
          src: ['./'],
        },
      },
    },
    //
    //
    // Testing
    //
    //
    mochaTest: {
      web: {
        options: {
          ui: 'bdd',
          reporter: 'spec',
        },
        src: [ 'test/website/*.js' ],
      },
      user: {
        options: {
          ui: 'bdd',
          reporter: 'spec',
        },
        src: [ 'test/user/*.js' ],
      },
    },
    release: {
      options: {
        bump: true, //default: true
        file: 'package.json', //default: package.json
        add: true, //default: true
        commit: true, //default: true
        tag: true, //default: true
        push: true, //default: true
        pushTags: true, //default: true
        npm: false, //default: true
        tagName: 'v<%= version %>', //default: '<%= version %>'
        commitMessage: 'releasing v<%= version %>', //default: 'release <%= version %>'
        tagMessage: 'v<%= version %>' //default: 'Version <%= version %>'
      }
    },

  }); // end grunt.initConfig();

  // Load per-task config from separate files.
  grunt.loadTasks('tasks');

  //
  //
  // Register tasks and aliases
  //
  //

  grunt.registerTask('test', [
    'mochaTest',
  ]);

  grunt.registerTask('css', 'SASS and combine minify', [
    'sass:dist',
    'cssmin:dist'
  ]);

  grunt.registerTask('deploy', 'Nodejitsu deploy ops', [
    'build',
    'shell:deploy',
  ]);

  grunt.registerTask('build', 'Build frontend app', [
    'checkrepo',
    'css',
    'gitcommit:frontapp',
  ]);

  grunt.registerTask('frontend', [
    'parallel:web',
  ]);

  grunt.registerTask('web', [
    'express:web',
    'parallel:web',
  ]);

  grunt.registerTask('default', ['start', 'web']);

  grunt.registerTask('deploy', 'Runs after deployment on Heroku', [
    'clean:deploy',
  ]);

  grunt.registerTask('publish', 'Publish email templates', function() {
    var done = this.async();
    emailTemplate.update().then(done, done);
  });

  grunt.registerTask('start', 'Start all required services', ['startMongo', 'startRedis']);
  grunt.registerTask('stop', 'Stop all services', ['stopMongo', 'stopRedis']);

  grunt.registerTask('isHeroku', 'Checks if we are on Heroku', function() {
    if (!globals.isHeroku && globals.env !== globals.Environments.PRODUCTION) {
      grunt.fail.warn('Not on Heroku, stopping! Environment:' + globals.env);
    }
  });

  grunt.registerTask('send', 'send a test email', function(emailType, recipient) {
    var done = this.async();
    grunt.log.writeln('Sending email to: ' + recipient + ' Type: ' + emailType);
    var email = Email.getInstance();
    email.send(emailType, recipient, {verificationUrl: 'http://google.com'})
      .then(function(result){
        grunt.log.writeln('Success. Mandrill Response:');
        console.log(result);
        done();
      }).catch(function(err) {
        grunt.log.error('Failed to send email. Error:');
        console.error(err);
        console.error(err.stack);
        done(err);
      });
  });
};
