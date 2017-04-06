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

    var prompts = [
      {
        type: 'input',
        name: 'project_name',
        message: 'What is your project name? '
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Which additional features would you like to include?',
        choices: [
          {
            name: 'Jade-Php',
            value: 'includeJadePhp',
            checked: true
          },
          {
            name: 'Sass',
            value: 'includeSass',
            checked: true
          },
          {
            name: 'Less',
            value: 'includeLess',
            checked: false
          },
          {
            name: 'Wordpress',
            value: 'includeWordpress',
            checked: true
          }
        ]
      }
    ];

    return this.prompt(prompts).then(function (props) {
      var features = props.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      };

      this.props = props;
      this.includeJadePhp = hasFeature('includeJadePhp');
      this.includeSass = hasFeature('includeSass');
      this.includeLess = hasFeature('includeLess');
      this.includeWordpress = hasFeature('includeWordpress');

    }.bind(this));
  },

  writing: function () {

    // package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        project_name: this.props.project_name,
        includeJadePhp: this.includeJadePhp,
        includeSass: this.includeSass,
        includeLess: this.includeLess
      }
    );

    // .editorcondig
    this.fs.copyTpl(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    // .gitignore
    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      {
        project_name: this.props.project_name
      }
    );

    // gulpfile.js
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {
        includeJadePhp: this.includeJadePhp,
        includeSass: this.includeSass,
        includeLess: this.includeLess,
        includeWordpress: this.includeWordpress
      }
    );

    // README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );


    // Sass
    if (this.includeSass) {
      this.fs.copyTpl(
        this.templatePath('sass'),
        this.destinationPath('app/sass')
      );
    }

    // Less
    if (this.includeLess) {
      this.fs.copyTpl(
        this.templatePath('less'),
        this.destinationPath('app/less')
      );
    }

    // Wordpress
    if (this.includeWordpress) {
      // STYLE CSS
      this.fs.copyTpl(
        this.templatePath('style.css'),
        this.destinationPath('app/style.css'),
        {
          project_name: this.props.project_name
        }
      );
      // LIB
      this.fs.copyTpl(
        this.templatePath('lib'),
        this.destinationPath('app/template/lib')
      );
      // VENDOR
      this.fs.copyTpl(
        this.templatePath('vendor'),
        this.destinationPath('app/template/vendor')
      );
      // SCREENSHOT
      this.fs.copyTpl(
        this.templatePath('screenshot.png'),
        this.destinationPath('app/screenshot.png')
      );
      // FUNCTIONS
      this.fs.copyTpl(
        this.templatePath('functions.jade'),
        this.destinationPath('app/template/functions.jade')
      );
    }

    // Fonts
    this.fs.copy(
      this.templatePath('fonts'),
      this.destinationPath('app/fonts')
    );

    // Ico
    this.fs.copy(
      this.templatePath('ico'),
      this.destinationPath('app/ico')
    );

    // Images
    this.fs.copy(
      this.templatePath('images'),
      this.destinationPath('app/images')
    );

    // Js
    this.fs.copy(
      this.templatePath('js'),
      this.destinationPath('app/js')
    );

    // BABEL
    this.fs.copy(
      this.templatePath('babel'),
      this.destinationPath('app/babel')
    );

    // Js Head
    this.fs.copy(
      this.templatePath('js-head'),
      this.destinationPath('app/js-head')
    );
    if (this.includeJadePhp) {
      // Template
      this.fs.copy(
        this.templatePath('template'),
        this.destinationPath('app/template')
      );
    }else{
      // Template HTML
      this.fs.copy(
        this.templatePath('template-html'),
        this.destinationPath('app/template')
      );
    }
  },

  install: function () {
    this.npmInstall(); // npm install
    // this.bowerInstall(); // bower install
    // this.installDependencies(); // npm install && bower install
  }
});
