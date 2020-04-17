'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

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

function test () {
    return gulp
        .src('test/test.js')
        .pipe(mocha({
            ui:       'bdd',
            reporter: 'spec',
            timeout:  typeof v8debug === 'undefined' ? 200000 : Infinity // NOTE: disable timeouts in debug
        }));
}

exports.lint = lint;
exports.test = gulp.series(lint, test);
