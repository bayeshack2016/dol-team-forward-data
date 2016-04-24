'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js'],
      options: {
        globals: {
          jQuery: true
        },
        jshintrc: '.jshintrc',
        ignores: ['app/lib/**/*']
      }
    },
    express: {
      dev: {
        options: {
          script: 'app.js'
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'express:dev'],
      options: {
        livereload: true,
        spawn: false
      },
    }
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['express', 'watch']);

};
