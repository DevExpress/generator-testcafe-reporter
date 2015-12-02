'use strict';

var gulp   = require('gulp');
var eslint = require('gulp-eslint');
var mocha  = require('gulp-mocha');

gulp.task('lint', function () {
    return gulp
        .src([
            'generators/app/index.js',
            'test.js',
            'Gulpfile.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], function () {
    return gulp
        .src('test/test.js')
        .pipe(mocha({
            ui:       'bdd',
            reporter: 'spec',
            timeout:  typeof v8debug === 'undefined' ? 20000 : Infinity // NOTE: disable timeouts in debug
        }));
});
