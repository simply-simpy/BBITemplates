const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const connect = require('gulp-connect');
const sass = require('gulp-sass');


gulp.task('nunjuckTask', function () {
    return gulp.src('./html/*.html')
        .pipe(data(function () {
            return require('./data/data.json');
        }))
        .pipe(nunjucksRender({
            path: ['./html/']
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload())
});





gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        livereload: true,
        host: '0.0.0.0',
        port: 8000
    });
});

gulp.task('sass', function () {
    return gulp.src('./sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});


gulp.task('js', function () {
    return gulp.src('./js/**/**')
        .pipe(gulp.dest('dist/js'))
});

gulp.task('img', function () {
    return gulp.src('./img/**/**')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('fonts', function () {
    return gulp.src('./fonts/**/**')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('watch', function () {
    return gulp.watch('./html/**/*', gulp.series('nunjuckTask'));
});

gulp.task('sass:watch', function () {
    return gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('connect', 'nunjuckTask', 'sass', 'js', 'fonts', 'watch', 'img', 'sass:watch'), function (done) {
    done();
});

