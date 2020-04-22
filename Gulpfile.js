'use strict';

const { spawn } = require('child_process');
const gulp      = require('gulp');
const eslint    = require('gulp-eslint');
const mocha     = require('gulp-mocha');


function lint () {
    return gulp
        .src([
            'generators/app/index.js',
            'test/test.js',
            'Gulpfile.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function testContent () {
    return gulp
        .src('test/test.js')
        .pipe(mocha({
            ui:       'bdd',
            reporter: 'spec',
            timeout:  typeof v8debug === 'undefined' ? 20000 : Infinity // NOTE: disable timeouts in debug
        }));
}

function exitDomains () {
    const domains = [];

    while (process.domain) {
        domains.push(process.domain);

        process.domain.exit();
    }

    return domains;
}

function enterDomains (domains) {
    let domain = domains.pop();

    while (domain) {
        domain.enter();

        domain = domains.pop();
    }
}

async function createExampleReporter () {
    // HACK: We have to exit from all Gulp's error domains to avoid conflicts
    // with error handling inside yeoman-test helpers.
    const domains = exitDomains();

    const { createReporter } = require('./test/util');

    await createReporter();

    enterDomains(domains);
}

function testExample () {
    return spawn('npx gulp generateTestData && npx gulp test', { stdio: 'inherit', shell: true });
}

exports.lint        = lint;
exports.testContent = testContent;
exports.testExample = gulp.series(createExampleReporter, testExample);
exports.test        = gulp.series(lint, testContent, testExample);
