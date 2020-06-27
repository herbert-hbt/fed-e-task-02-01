const sass = require("sass");
const loadGruntTasks = require("load-grunt-tasks");

module.exports = (grunt) => {
  grunt.initConfig({
    clean: {
      temp: "dist/**",
    },
    sass: {
      options: {
        sourceMap: true,
        implementation: sass,
      },
      main: {
        files: {
          "dist/css/*.css": "src/assets/styles/*.scss",
        },
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      main: {
        files: {
          "dist/js/*.js": "src/assets/scripts/*.js",
        },
      },
    },
    watch: {
      js: {
        files: ["src/assets/scripts/*.js"],
        tasks: ["babel"],
      },
      css: {
        files: ["src/assets/styles/*.scss"],
        tasks: ["sass"],
      },
    },
  });
  loadGruntTasks(grunt);
  grunt.registerTask("default", ["sass", "babel", "watch"]);
};
