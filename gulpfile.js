var gulp = require('gulp');
var min = require('gulp-uglify');
var sass = require('gulp-sass');
var minCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();



gulp.task('sass', function(){
    gulp.src('src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('local/css'));
});

gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('local'))
});

gulp.task('javascript', function(){
    gulp.src('src/js/*.js')
        .pipe(concat("scripts.js"))
        .pipe(gulp.dest('local/js'))
});

gulp.task('watch-sass', function () {
    gulp.watch('src/**/*.scss', ['sass'])
});
gulp.task('watch-html', function () {
    gulp.watch('src/**/*.html', ['html'])
});
gulp.task('watch-js', function () {
    gulp.watch('src/**/*.js', ['javascript'])
});





gulp.task('compile', ['clean'], function () {
    gulp.start('html', 'watch-html', 'sass', 'watch-sass', 'javascript', 'watch-js');
});





gulp.task('build', ['prebuild'], function () {

        gulp.src('src/*.html')
            .pipe(gulp.dest('build'));

        gulp.src('src/sass/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('build/css'));

        gulp.src('src/js/*.js')
            .pipe(concat("scripts.js"))
            .pipe(gulp.dest('build/js'));
        
        console.log('================================================\nNon minified version ready in /build \n================================================')

});

// use build-min a minified version

gulp.task('build-min', ['prebuild'], function () {

        gulp.src('src/*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest('build'));

        gulp.src('src/sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concat("style.css"))
            .pipe(minCss())
            .pipe(gulp.dest('build/css'));

        gulp.src('src/js/*.js')
            .pipe(concat("scripts.js"))
            .pipe(min())
            .pipe(gulp.dest('build/js'));

        console.log('================================================\nReady in /build \n================================================')

});

gulp.task('local', ['compile'], function() {
    browserSync.init({
        server: {
            baseDir: 'local'
        },
        watch: true,
        port: 3030,
        open: false,
        ghostMode: false
    })
});



gulp.task('clean', function () {
    return gulp.src('local', { read: false })
        .pipe(clean());
});
gulp.task('prebuild', function () {
    return gulp.src('build', { read: false })
        .pipe(clean());
});