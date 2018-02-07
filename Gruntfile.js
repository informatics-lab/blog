module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    "jekyll": {
      options: {
        bundleExec: true,
        src : '<%= app %>'
      },
      "build": {
      },
      "serve": {
        options: {
          drafts: true,
          serve: true,
          watch: true
        }
      }
    },
    bower: {
      install: {
        options: {
          targetDir: './lib',
          layout: 'byComponent'
        }
      }
    },

    "shell": {
      bundleInstall: {
        command: "bundle install --path vendor/bundle"
      },
      jekyllTest: {
        command: "bundle exec htmlproof ./_site --url-ignore \"/.*mozillafestival.org/,/foo.com/\" --only-4xx"
      },
      runTests: {
        command: "for SCRIPT in tests/*; do if [ -f $SCRIPT -a -x $SCRIPT ]; then $SCRIPT; fi; done"
      }
    },

    invalidate_cloudfront: {
      options: {
        key: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET,
        distribution: 'E3IDIFQ6VR6DB8'
      },
      production: {
        files: [{
          expand: true,
          cwd: './_site/',
          src: ['**/*'],
          filter: 'isFile',
          dest: ''
        }]
      }
    }
  });

  // Prep tasks
  grunt.registerTask("installDeps", ["shell:bundleInstall", "bower"]);

  // Public tasks
  grunt.registerTask("serve", ["installDeps", "jekyll:serve"]);
  grunt.registerTask("build", ["installDeps", "jekyll:build"]);
  grunt.registerTask("test", ["build", "shell:jekyllTest", "shell:runTests"]);
  grunt.registerTask("purge", ["invalidate_cloudfront:production"]);

  // Default task
  grunt.registerTask("default", ["serve"]);
};
