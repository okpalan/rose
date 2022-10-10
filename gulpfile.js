const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const path = require('path');


function style() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./src/pug/**/*.pug', buildPug);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
}

gulp.task('server', watch);

function buildPug() {
    return gulp.src('./src/pug/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.resolve(process.cwd(), '/dist')));
}

gulp.task('build:pug', buildPug);
gulp.task('default', gulp.series(style, watch));