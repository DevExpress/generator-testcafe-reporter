'use strict';
var yeoman       = require('yeoman-generator');
var slugify      = require('underscore.string').slugify;
var normalizeUrl = require('normalize-url');

function filterProjectName (name) {
    return slugify(name.replace(/^testcafe(-|\s)reporter(-|\s)/i, ''));
}

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();
        var gen  = this;

        var prompts = [
            {
                name:    'reporterName',
                message: 'How do you want to name your reporter?',
                default: filterProjectName(this.appname),
                filter:  filterProjectName
            },
            {
                name:     'githubUsername',
                message:  'What is your GitHub username?',
                store:    true,
                validate: function (name) {
                    return name.length ? true : 'You should provide a username';
                }
            },
            {
                name:    'website',
                message: 'What is the URL of your website?',
                store:   true,
                filter:  function (url) {
                    return url && normalizeUrl(url);
                }
            },
            {
                name:    'errorDecorator',
                message: 'Do you want to implement custom error decorator?',
                type:    'confirm',
                default: false
            }
        ];

        this.prompt(prompts, function (props) {
            gen.props = props;

            done();
        });
    },

    writing: function () {
        var gen = this;

        var tmplProps = {
            author:         this.user.git.name(),
            email:          this.user.git.email(),
            website:        this.props.website,
            reporterName:   this.props.reporterName,
            githubUsername: this.props.githubUsername,
            errorDecorator: this.props.errorDecorator
        };

        var unescaped = {
            '_.editorconfig':  '.editorconfig',
            '_.eslintrc':      '.eslintrc',
            '_.gitignore':     '.gitignore',
            'test/_.eslintrc': 'test/.eslintrc',
            '_.travis.yml':    '.travis.yml',
            '_package.json':   'package.json'
        };

        this.fs.copyTpl(this.templatePath() + '/**/!(*.png)', this.destinationPath(), tmplProps);
        this.fs.copy(this.templatePath() + '/**/*.png', this.destinationPath());

        Object.keys(unescaped).forEach(function (escaped) {
            gen.fs.move(gen.destinationPath(escaped), gen.destinationPath(unescaped[escaped]));
        });
    },

    install: function () {
        this.installDependencies({ bower: false });
    }
});
