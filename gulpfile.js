var gulp = require('gulp');
var http = require('http');
var min = require('gulp-uglify');
var sass = require('gulp-sass');
var minCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var express = require('express');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');

//specify local port for testing
const port = 1515


gulp.task('compile',['clean'], function() {
    gulp.start('html','watch-html','sass','watch-sass','javascript','watch-js');
});

gulp.task('watch-sass', function(){
    gulp.watch('src/**/*.scss', ['sass'])
});
gulp.task('watch-html', function(){
    gulp.watch('src/**/*.html', ['html'])
});
gulp.task('watch-js', function(){
    gulp.watch('src/**/*.js', ['javascript'])
});



gulp.task('sass', function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat("style.css"))
        .pipe(minCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('javascript', function(){
    gulp.src('src/js/*.js')
        .pipe(concat("scripts.js"))
        .pipe(min())
        .pipe(gulp.dest('dist/js'));
});



gulp.task('http-server', function(){
    var app = express();

    app.use(express.static('dist'));

    app.listen(port, function () {
      //console.log('Example app listening on port 3000!');
    });
});

gulp.task('clean', function(){
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('default', ['compile','http-server'], function() {
    console.log('================================================\n=Ready in http://localhost:'+port+'\n================================================')
});