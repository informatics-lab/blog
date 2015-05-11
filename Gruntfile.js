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
          command: "bundle install"
        },
        jekyllTest: {
            command: "bundle exec htmlproof ./_site --only-4xx"
        },
        runTests: {
          command: "for SCRIPT in tests/*; do if [ -f $SCRIPT -a -x $SCRIPT ]; then $SCRIPT; fi; done"
        }
    }
  });

  // Prep tasks
  grunt.registerTask("installDeps", ["shell:bundleInstall", "bower"]);

  // Public tasks
  grunt.registerTask("serve", ["installDeps", "jekyll:serve" ]);
  grunt.registerTask("deploy", ["installDeps", "jekyll:build", "shell:jekyllTest", "shell:runTests" ]);

  // Default task
  grunt.registerTask("default", [ "serve" ]);
};
