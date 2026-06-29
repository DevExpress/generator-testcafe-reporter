'use strict';
const GeneratorPkg = require('yeoman-generator');
const Generator    = GeneratorPkg.default || GeneratorPkg;
const slugify      = require('underscore.string').slugify;
const normalizeUrl = require('normalize-url');

function filterProjectName (name) {
    return slugify(name.replace(/^testcafe(-|\s)reporter(-|\s)/i, ''));
}

module.exports = class extends Generator {
    prompting () {
        const prompts = [
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
            }
        ];

        return this
            .prompt(prompts)
            .then(props => {
                this.props = props;
            });
    }

    async writing () {
        const tmplProps = {
            author:         await this.git.name(),
            email:          await this.git.email(),
            website:        this.props.website,
            reporterName:   this.props.reporterName,
            githubUsername: this.props.githubUsername
        };

        const unescaped = {
            '_.editorconfig':  '.editorconfig',
            '_.eslintrc':      '.eslintrc',
            '_.gitignore':     '.gitignore',
            'test/_.eslintrc': 'test/.eslintrc',
            '_.travis.yml':    '.travis.yml',
            '_package.json':   'package.json'
        };

        this.fs.copyTpl(this.templatePath() + '/**/!(*.png)', this.destinationPath(), tmplProps);
        this.fs.copy(this.templatePath() + '/**/*.png', this.destinationPath());

        Object.keys(unescaped).forEach(escaped => {
            this.fs.move(this.destinationPath(escaped), this.destinationPath(unescaped[escaped]));
        });
    }
};
