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
            this.templatePath(projectFolder + '_gulp/_tasks/*.js'),
            this.destinationPath(projectFolderDestination + 'gulp/tasks'));

          // Views
          this.fs.copyTpl(
            this.templatePath(projectFolder + '_Views/_Master.cshtmlx'),
            this.destinationPath( projectFolderDestination + '/Views/Master.cshtml'), {
              name: this.props.name
            }
          );
          this.fs.copy(
            this.templatePath([projectFolder + '_Views/*.cshtml', ]),
            this.destinationPath(projectFolderDestination + 'Views'));
            //Partials
            this.fs.copy(
              this.templatePath(projectFolder + '_Views/Partials/*.cshtml'),
              this.destinationPath(projectFolderDestination + 'Views/Partials'));
              //Helpers
              this.fs.copy(
                this.templatePath(projectFolder + '_Views/Partials/Helpers/*.cshtml'),
                this.destinationPath(projectFolderDestination + 'Views/Partials/Helpers'));
              //Grid
              this.fs.copy(
                this.templatePath(projectFolder + '_Views/Partials/Grid/*.cshtml'),
                this.destinationPath(projectFolderDestination + 'Views/Partials/Grid'));
              this.fs.copy(
                this.templatePath(projectFolder + '_Views/Partials/Grid/Editors/*.cshtml'),
                this.destinationPath(projectFolderDestination + 'Views/Partials/Grid/Editors'));
              this.fs.copy(
                this.templatePath(projectFolder + '_Views/Partials/Grid/Editors/NovicellEditors/*.cshtml'),
                this.destinationPath(projectFolderDestination + 'Views/Partials/Grid/Editors/NovicellEditors'));
              //SEO
              this.fs.copy(
                this.templatePath(projectFolder + '_Views/Partials/SEO/*.cshtml'),
                this.destinationPath(projectFolderDestination + 'Views/Partials/SEO'));
            //Macro Partials
            this.fs.copy(
              this.templatePath(projectFolder + '_Views/MacroPartials/dummy.txt'),
              this.destinationPath(projectFolderDestination + 'Views/MacroPartials/dummy.txt'));
            //Scripts
            this.fs.copy(
              this.templatePath(projectFolder + '_scripts/*.js'),
              this.destinationPath(projectFolderDestination + 'scripts'));
              //Script Master
              this.fs.copyTpl(
                this.templatePath(projectFolder + '_scripts/_master.jsx'),
                this.destinationPath( projectFolderDestination + '/scripts/master.js'), {
                  name: this.props.name
                }
              );
            //typescript
            this.fs.copy(
              this.templatePath(projectFolder + '_scripts/typescript/*.txt'),
              this.destinationPath(projectFolderDestination + 'scripts/typescript'));
            //Novicell Components
            this.fs.copy(
              this.templatePath(projectFolder + '_scripts/components/*.js'),
              this.destinationPath(projectFolderDestination + 'scripts/components'));

        }
      },
    },
    install: function() {
      this.installDependencies();
    }
});
