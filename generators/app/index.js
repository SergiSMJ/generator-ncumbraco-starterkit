'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the splendid ' + chalk.red('generator-ncumbraco-starterkit')
    ));
    //Configurations will be loaded here.
    //Ask for user input
    prompting: function() {
        var done = this.async();
        this.prompt({
          type: 'input',
          name: 'name',
          message: 'Add the project name',
          //Defaults to the project's folder name if the input is skipped
          default: this.appname
        }, {
          type: 'input',
          name: 'description',
          message: 'Enter a description for your project',
          default: this.appdescription
        }, {
          type: 'input',
          name: 'version',
          message: 'Enter the version of your project',
          default: this.appversion
        }, {
          type: 'input',
          name: 'homepage',
          message: 'Enter the homepage of your company',
          default: this.apphomepage
        }, function(answers) {
          this.props = answers
          this.log(answers.name);
          done();
        }.bind(this));
      },
      //Writing Logic here
      writing: {
        //Copy the configuration files
        config: function() {
          this.fs.copyTpl(
            this.templatePath('_ptojectName.Website/_package.json'),
            this.destinationPath(this.props.name + '.Website/package.json'), {
              name: this.props.name,
              description: this.props.description,
              version: this.props.version,
              homepage: this.props.homepage
            }
          );
          this.fs.copyTpl(
            this.templatePath('_ptojectName.Website/_bower.json'),
            this.destinationPath(this.props.name + '.Website/bower.json'), {
              name: this.props.name,
              version: this.props.version
            }
          );
        },
        //Copy application files
        app: function() {
          var projectFolder = '_ptojectName.Website/';
          var projectFolderDestination = this.props.name + '.Website/';
          //Gulp file configuration
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_config.js'),
            this.destinationPath(projectFolderDestination + 'gulp/config.js'));
          /////Gulp tasks
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_index.js'),
            this.destinationPath(projectFolderDestination + 'gulp/index.js'));

          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_bower.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/bower.js'));
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_build.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/build.js'));
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_copy.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/copy.js'));
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_html.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/html.js'));
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_icons.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/icons.js'));
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_images.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/images.js'));
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_scripts.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/scripts.js'));
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_styles.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/styles.js'));
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_typescript.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/typescript.js'));
          this.fs.copy(
            this.templatePath(projectFolder + '_gulp/_tasks/_watch.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks/watch.js'));

          // Views
          // this.fs.copyTpl(
          //   this.templatePath(projectFolder + '_Views/_Master.cshtml'),
          //   this.destinationPath( projectFolderDestination + '/Views/Master.cshtml'), {
          //     name: this.props.name
          //   }
          // );

        }
      },
    },
    install: function() {
      this.installDependencies();
    }
});
