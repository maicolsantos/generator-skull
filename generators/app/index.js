'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the superior ' + chalk.red('generator-skull') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'project_name',
      message: 'what is your project name? '
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    // package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),{
        project_name: this.props.project_name
      }
    );

    // .editorcondig
    this.fs.copyTpl(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    // .gitignore
    this.fs.copyTpl(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );

    // gulpfile.js
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    // README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    // APP
    this.fs.copy(
      this.templatePath('_app'),
      this.destinationPath('app')
    );

  },

  install: function () {
    this.npmInstall(); // npm install
    // this.bowerInstall(); // bower install
    // this.installDependencies(); // npm install && bower install
  }
});
