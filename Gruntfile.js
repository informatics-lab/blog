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

    "bower-install-simple": {
        options: {
            color: true,
            directory: "lib"
        },
        "install": {
        }
    },

    "shell": {
        bundleInstall: {
          command: "bundle install"
        },
        jekyllTest: {
            command: "bundle exec htmlproof ./_site --only-4xx --file-ignore='./_site/lib.*'"
        }
    }
  });

  // Prep tasks
  grunt.registerTask("installDeps", ["shell:bundleInstall", "bower-install-simple"]);

  // Public tasks
  grunt.registerTask("serve", ["installDeps", "jekyll:serve" ]);
  grunt.registerTask("deploy", ["installDeps", "jekyll:build", "shell:jekyllTest" ]);

  // Default task
  grunt.registerTask("default", [ "serve" ]);
};
