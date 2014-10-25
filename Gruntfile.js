module.exports = function (grunt) {
  "use strict";

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      kss: {
        options: {
          port: 9000,
          base: 'styleguide',
          keepalive: true,
          livereload: true
        }
      }
    },

    sass: {
      kss: {
        files: {
          'styleguide/public/bootstrap.css': 'styleguide-template/public/bootstrap.scss',
        },
        options: {
          style: 'expanded',
          cacheLocation: 'tmp/.sass-cache'
        }
      }
    },

    kss: {
      options: {
        template: 'styleguide-template/',
        includeType: 'sass'
      },
      dist: {
        files: {
          'styleguide': ['assets/stylesheets/**'],
        }
      }
    },

    watch: {
      files: [
        'assets/stylesheets/**/*',
        'styleguide-template/**/*',
        'assets/stylesheets/styleguide.md'
      ],
      tasks: ['kss:build'],
      options: {
        spawn: false,
        livereload: true
      }
    },

    concurrent: {
      kss: {
        tasks: ['watch', 'connect:kss'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    availabletasks: {
      tasks: {}
    }
  });

  grunt.registerTask('default', 'availabletasks');

  grunt.registerTask(
    'serve',
    'Start up a server and watch for changes in the Sass. The server can be accessed at http://localhost:9000',
    [
      'kss',
      'concurrent:kss'
    ]
  );
};
