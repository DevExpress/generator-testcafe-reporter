const fs     = require('fs');
const gulp   = require('gulp');
const eslint = require('gulp-eslint');
const babel  = require('gulp-babel');
const mocha  = require('gulp-mocha');
const del    = require('del');

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

function transpile () {
    return gulp
        .src('src/**/*.js')
        .pipe(babel({
            'presets': [
                [
                    '@babel/env',
                    {
                        'targets': {
                            'node': '10'
                        }
                    }
                ]
            ],
            'plugins': [
                'add-module-exports'
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

async function generateReport ({ withColors = false, toFile = false } = {}) {
    const createReport = require('./test/utils/create-report');
    const report = await createReport(withColors);

    if (toFile)
        fs.writeFileSync(`test/data/report-${withColors ? 'with' : 'without'}-colors`, report);
    else
        process.stdout.write(report + '\n');
}

async function previewNoColors () {
    await generateReport({ withColors: false });
}

async function previewColors () {
    await generateReport({ withColors: true });
}

async function generateTestDataNoColors () {
    await generateReport({ withColors: false, toFile: true });
}

async function generateTestDataColors () {
    await generateReport({ withColors: true, toFile: true });
}

const build = gulp.series(clean, lint, transpile);

exports.clean = clean;
exports.lint = lint;
exports.build = build;
exports.test = gulp.series(build, test);
exports.previewColors = gulp.series(build, previewColors);
exports.previewNoColors = gulp.series(build, previewNoColors);
exports.preview = gulp.series(build, previewNoColors, previewColors);
exports.generateTestDataNoColors = gulp.series(build, generateTestDataNoColors);
exports.generateTestDataColors = gulp.series(build, generateTestDataColors);
exports.generateTestData = gulp.series(build, gulp.parallel(generateTestDataNoColors, generateTestDataColors));
