/* DEFINE VARIABLES */
var gulp            = require('gulp'),                  // gulp core
    uglify          = require('gulp-uglify'),           // uglifies the js
    concat          = require('gulp-concat'),           // concatenates files
    jshint          = require('gulp-jshint'),           // jshint for gulp
    sass            = require('gulp-sass'),             // sass for gulp
    sasslint        = require('gulp-sass-lint'),        // sass lint
    cache           = require('gulp-cached'),           // this keeps an in-memory chace of files
    plumber         = require('gulp-plumber'),          // disable interuption
    prefix          = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync'),          // inject code to all devices
    notify          = require('gulp-notify'),           // send notification
    minifycss       = require('gulp-minify-css'),       // minify the css file
    rename          = require('gulp-rename'),           // rename files
    size            = require('gulp-size');             // display size of your project

/* STYLE TASK */
gulp.task('styles', function() {
    gulp.src('include/scss/style.scss')                     // get the files
        .pipe(plumber())                                // make sure gulp keeps runing on errors
        .pipe(sass())                                   // compile all sass
        .pipe(size({gzip: true, showFiles: true}))      // display size
        .pipe(minifycss())                              // minify css
        .pipe(size({gzip: true, showFiles: true}))      // display size
        .pipe(rename({suffix: '.min'}))                 // rename files (add .min)
        .pipe(gulp.dest('include/css/'))                // where to put file
        .pipe(notify({
            message: 'SCSS processed & CSS compressed!'
        }));                                            // notify when done
});

/* SCRIPTS TASK */
gulp.task('scripts', function() {
    gulp.src('include/js/*.js')                         // get the files
        .pipe(plumber())                                // make sure gulp keeps runing on errors
        .pipe(uglify())                                 // uglifsed the js
        .pipe(rename({suffix: '.min'}))                 // rename files (add .min)
        .pipe(gulp.dest('include/js/'))                 // where to put file
        .pipe(notify({
            message: 'JS processed & minify'
        }));                                            // notify when done
});

/* WATCH TASK */
gulp.task('watch', function() {
    gulp.watch('include/scss/*.scss', ['styles']);
    gulp.watch('include/js/*.js', ['scripts']);
});

/* BROWSER TASK */
gulp.task('browser-sync', function() {
    browserSync.init(['./*.html', 'include/scss/', 'include/js/'], { // file to inject
        server: {
            host: 'localhost',                          // development server
            port: '2368',                               // development server port
            //baseDir: './'
        }
    });
});


/* DEFAULT TASK */

gulp.task('default', ['watch', 'browser-sync']);
