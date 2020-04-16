const fs    = require('fs');
var gulp    = require('gulp');
var eslint  = require('gulp-eslint');
var babel   = require('gulp-babel');
var mocha   = require('gulp-mocha');
var del     = require('del');

async function clean () {
    await del('lib');
}

function lint () {
    return gulp
        .src([
            'src/**/*.js',
            'test/**/*.js',
            'Gulpfile.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function build () {
    return gulp
        .src('src/**/*.js')
        .pipe(babel({
            'presets': ['@babel/env'],
            'plugins': [
                'add-module-exports',
                ['@babel/plugin-transform-runtime',
                    {
                        'regenerator': true
                    }
                ]
            ]
        }))
        .pipe(gulp.dest('lib'));
}

function test () {
    return gulp
        .src('test/test.js')
        .pipe(mocha({
            ui:       'bdd',
            reporter: 'spec',
            timeout:  typeof v8debug === 'undefined' ? 20000 : Infinity // NOTE: disable timeouts in debug
        }));
}

async function preview () {
    const createReport = require('./test/utils/create-report');

    const reportWithColors = await createReport(true);
    const reportWithoutColors = await createReport(false);

    fs.writeFileSync('report-with-colors.json', JSON.stringify(reportWithColors));
    fs.writeFileSync('report-without-colors', reportWithoutColors);

    console.log(reportWithColors);
}

exports.clean = clean;
exports.lint = lint;
exports.test = gulp.series(clean, lint, build, test);
exports.build = gulp.series(clean, lint, build);
exports.preview = gulp.series(clean, lint, build, preview);
