/* ------------------------------------------------------------------------------
 *
 *  # Gulp file
 *
 *  Gulp tasks for Limitless template
 *
 *  Includes following tasks:
 *  # gulp lint - lints core JS files, excluding libraries
 *  # gulp sass - compiles SCSS files. Depends on variables defined below
 *  # gulp watch - watches for changes in all SCSS files and automatically recompiles them
 *  # gulp default - runs default set of tasks. Configurable by user
 *
 * ---------------------------------------------------------------------------- */


// Configuration
// ------------------------------

// Define variables
var layout = 'layout_1',  // 'layout_1', 'layout_2', 'layout_3', 'layout_4', 'layout_5'
    theme = 'default',    // 'default' or 'material'
    direction = 'LTR',    // 'LTR' or 'RTL'
    type = 'full';        // 'full' or 'seed'

// Define plugins
var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    rtlcss = require('gulp-rtlcss');


// Setup tasks
// ------------------------------

// Lint
gulp.task('lint', function() {
    return gulp
        .src(layout + '/' + direction + '/' + theme + '/' + type + '/assets/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


//
// SCSS compilation
//

// Autoprefixer config
var processors = [
    autoprefixer({
        browsers: [
            '>= 1%',
            'last 1 major version',
            'Chrome >= 45',
            'Firefox >= 38',
            'Edge >= 12',
            'Explorer >= 10',
            'iOS >= 9',
            'Safari >= 9',
            'Android >= 4.4',
            'Opera >= 30'
        ],
        map: false
    })
];

// Make it dynamic by changing core variables. Sensitive to location: make sure
// the paths are correct if you need to use a custom assets location
if(direction == 'LTR') {
    gulp.task('sass', function() {
        return gulp
            .src('global_assets/scss/layouts/' + layout + '/' + theme + '/compile/*.scss')
            .pipe(sass())
            .pipe(postcss(processors))
            .pipe(gulp.dest(layout + '/' + direction + '/' + theme + '/' + type + '/assets/css'))
            .pipe(minifyCss({
                level: {1: {specialComments: 0}}
            }))
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(layout + '/' + direction + '/' + theme + '/' + type + '/assets/css'));
    });
}
else {
    gulp.task('sass', function() {
        return gulp
            .src('global_assets/scss/layouts/' + layout + '/' + theme + '/compile/*.scss')
            .pipe(sass())
            .pipe(postcss(processors))
            .pipe(gulp.dest(layout + '/' + direction + '/' + theme + '/' + type + '/assets/css'))
            .pipe(rtlcss())
            .pipe(gulp.dest(layout + '/' + direction + '/' + theme + '/' + type + '/assets/css'))
            .pipe(minifyCss({
                level: {1: {specialComments: 0}}
            }))
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(layout + '/' + direction + '/' + theme + '/' + type + '/assets/css'));
    });
}


//
// Watch files for changes
//

// Listen for changes in all SCSS files and automatically re-compile
gulp.task('watch', function() {
    gulp.watch('global_assets/scss/**/*.scss', ['sass']);
});


//
// Default task
//

gulp.task('default', [
    'lint',
    'sass',
    'watch'
]);
