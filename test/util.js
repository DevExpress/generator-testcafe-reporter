'use strict';

const path          = require('path');
const { promisify } = require('util');
const helpers       = require('yeoman-test');


const GENERATOR_DIRECTORY = path.join(__dirname, 'temp');

async function createGeneratorDirectory () {
    await promisify(helpers.testDirectory)(GENERATOR_DIRECTORY);
}

async function createGenerator (options = {}) {
    await createGeneratorDirectory();

    return helpers.createGenerator(
        'testcafe-reporter:app',
        ['../../generators/app'],
        null,
        options
    );
}

async function runGenerator (generator) {
    helpers.mockPrompt(generator, {
        reporterName:   'test-reporter',
        githubUsername: 'test-user',
        website:        'test.com'
    });

    await generator.run();
}

async function createReporter () {
    const generator = await createGenerator();

    await runGenerator(generator);
}

module.exports = {
    createGenerator,
    runGenerator,
    createReporter
};
