module.exports = function(grunt) {
  grunt.initConfig({
    jekyll: {
      options: {
        bundleExec: true,
        src : '<%= app %>'
      },
      test: {
        options: {
          dest: '<%= dist %>',
          config: '_config.yml'
        }
      },
      serve: {
        options: {
          drafts: true,
          serve: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('serve', [ 'jekyll:serve']);
};
