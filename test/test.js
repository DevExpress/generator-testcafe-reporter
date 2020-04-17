'use strict';
var path    = require('path');
var helpers = require('yeoman-test');
var assert  = require('yeoman-assert');
var pify    = require('pify');
const runCmd = require('./util');

describe('Testcafe reporter generator', async function () {
    const TEMP_DIR = path.join(__dirname, 'temp');

    let generator;

    before(async function () {
        await pify(helpers.testDirectory)(TEMP_DIR);

        generator = helpers.createGenerator(
            'testcafe-reporter:app',
            ['../../generators/app'],
            null,
            {
                skipInstall: false
            }
        );
    });

    after(async function () {
        await pify(helpers.testDirectory)(TEMP_DIR);
    });

    it('Should generate expected files', async function () {
        helpers.mockPrompt(generator, {
            reporterName:   'test-reporter',
            githubUsername: 'test-user',
            website:        'test.com'
        });

        await pify(generator.run.bind(generator))();

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
            'test/data/report-with-colors',
            'test/data/report-without-colors',
            'test/utils/create-report.js',
            'test/utils/reporter-test-calls.js',
            'test/utils/test-callsite.js'
        ]);

        assert.fileContent('package.json', 'test-reporter');
        assert.fileContent('package.json', 'test-user');
        assert.fileContent('package.json', 'test.com');

        assert.fileContent('README.md', 'test-reporter');
        assert.fileContent('README.md', 'test-user');
        assert.fileContent('README.md', 'test.com');
    });

    it('Should generate working properly reporter', async function () {
        await runCmd('gulp generateTestData');
        await runCmd('gulp test');
    });
});
