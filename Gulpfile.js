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

gulp.task('test', gulp.series([lint]), function () {
    return gulp
        .src('test/test.js')
        .pipe(mocha({
            ui:       'bdd',
            reporter: 'spec',
            timeout:  typeof v8debug === 'undefined' ? 20000 : Infinity // NOTE: disable timeouts in debug
        }));
});
