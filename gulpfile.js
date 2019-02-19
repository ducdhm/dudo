const gulp = require('gulp');
const sourceMaps = require('gulp-sourcemaps');


// Build CSS
// ---------------------------------------------------------------
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
gulp.task('build-css-dev',
    () => gulp
        .src([
            './public/less/**/*.less',
            '!./public/less/**/_*.less'
        ])
        .pipe(less({
            javascriptEnabled: true
        }))
        .pipe(gulp.dest('./public/css/'))
);

gulp.task('build-css-prod',
    () => gulp
        .src([
            './public/less/**/*.less',
            '!./public/less/**/_*.less'
        ])
        .pipe(less({
            javascriptEnabled: true
        }))
        .pipe(sourceMaps.init())
        .pipe(cssmin())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('./public/css/'))
);


// Build JS
// ---------------------------------------------------------------
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
gulp.task('build-js-dev',
    () => gulp
        .src([
            './public/es/**/*.es'
        ])
        .pipe(babel())
        .pipe(gulp.dest('./public/js/'))
);

gulp.task('build-js-prod',
    () => gulp
        .src([
            './public/es/**/*.es'
        ])
        .pipe(babel())
        .pipe(replace(/\\n\s+/g, ' '))
        .pipe(sourceMaps.init())
        .pipe(uglify())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('./public/js/'))
);


// Watch
// ---------------------------------------------------------------
gulp.task('watch', gulp.parallel(
    () => gulp.watch(
        ['./public/less/**/*.less'],
        gulp.series('build-css-dev')
    ),
    () => gulp.watch(
        ['./public/es/**/*.es'],
        gulp.series('build-js-dev')
    )
));


// Main tasks
// ---------------------------------------------------------------
gulp.task('dev', gulp.series(
    'build-css-dev',
    'build-js-dev',
    'watch'
));

gulp.task('build', gulp.series(
    'build-css-prod',
    'build-js-prod'
));
