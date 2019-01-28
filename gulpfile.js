const gulp = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const cssmin = require('gulp-cssmin');
const sourceMaps = require('gulp-sourcemaps');


// Build CSS
// ---------------------------------------------------------------
gulp.task('build-css-dev',
    () => gulp
        .src([
            './public/less/**/*.less',
            '!./public/less/**/_*.less'
        ])
        .pipe(less())
        .pipe(gulp.dest('./public/css/'))
);

gulp.task('build-css-prod',
    () => gulp
        .src([
            './public/less/**/*.less',
            '!./public/less/**/_*.less'
        ])
        .pipe(less())
        .pipe(sourceMaps.init())
        .pipe(cssmin())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('./public/css/'))
);


// Build JS
// ---------------------------------------------------------------
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

// Watch
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
