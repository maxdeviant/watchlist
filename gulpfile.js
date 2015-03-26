'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('dev', function () {
    nodemon({
        script: 'app.js',
        ext: 'js'
    });
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', [
    'sass',
    'watch',
    'dev'
]);
