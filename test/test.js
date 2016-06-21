'use strict';
var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-assert');
var Promise = require('pinkie-promise');
var pify    = require('pify');

var generator = null;

beforeEach(function () {
    return pify(helpers.testDirectory, Promise)(path.join(__dirname, 'temp'))
        .then(function () {
            generator = helpers.createGenerator('testcafe-reporter:app', ['../../generators/app'], null, { skipInstall: true });
        });
});

it('Should generate expected files', function () {
    helpers.mockPrompt(generator, {
        reporterName:   'test-reporter',
        githubUsername: 'test-user',
        website:        'test.com',
        errorDecorator: false
    });

    return pify(generator.run.bind(generator), Promise)().then(function () {
        assert.file([
            '.editorconfig',
            '.eslintrc',
            '.gitignore',
            '.travis.yml',
            'package.json',
            'Gulpfile.js',
            'LICENSE',
            'README.md',
            'media/preview.png',
            'src/index.js',
            'test/.eslintrc',
            'test/test.js',
            'test/data/report-with-colors.json',
            'test/data/report-without-colors',
            'test/utils/create-report.js',
            'test/utils/reporter-test-calls.js',
            'test/utils/test-callsite.js'
        ]);

        assert.noFileContent('src/index.js', 'createErrorDecorator');

        assert.fileContent('package.json', 'test-reporter');
        assert.fileContent('package.json', 'test-user');
        assert.fileContent('package.json', 'test.com');

        assert.fileContent('README.md', 'test-reporter');
        assert.fileContent('README.md', 'test-user');
        assert.fileContent('README.md', 'test.com');
    });
});

it('Should generate decorator if related option is specified', function () {
    helpers.mockPrompt(generator, {
        reporterName:   'test-reporter',
        githubUsername: 'test-user',
        website:        'test.com',
        errorDecorator: true
    });

    return pify(generator.run.bind(generator), Promise)().then(function () {
        assert.fileContent('src/index.js', 'createErrorDecorator');
    });
});
