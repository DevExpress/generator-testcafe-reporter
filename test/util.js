'use strict';

const path          = require('path');
const helpersPkg    = require('yeoman-test');
const helpers       = helpersPkg.default || helpersPkg;


const GENERATOR_DIRECTORY = path.join(__dirname, 'temp');
const GENERATOR_PATH      = path.resolve(__dirname, '../generators/app');

function createGenerator (options = {}) {
    return helpers
        .create(GENERATOR_PATH)
        .inDir(GENERATOR_DIRECTORY)
        .withOptions(options);
}

async function runGenerator (generator) {
    await generator
        .withPrompts({
            reporterName:   'test-reporter',
            githubUsername: 'test-user',
            website:        'test.com'
        })
        .run();
}

async function createReporter () {
    const generator = createGenerator();

    await runGenerator(generator);
}

module.exports = {
    createGenerator,
    runGenerator,
    createReporter
};
