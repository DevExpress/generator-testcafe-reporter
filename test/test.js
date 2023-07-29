'use strict';

const assert = require('yeoman-assert');

const {
    createGenerator,
    runGenerator
} = require('./util');


describe('Testcafe reporter generator', async function () {
    let generator;

    before(async function () {
        generator = await createGenerator({ skipInstall: true });
    });

    it('Should generate expected files', async function () {
        this.timeout(60000);
        await runGenerator(generator);

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
});
