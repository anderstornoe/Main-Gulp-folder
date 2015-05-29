 var gulp = require('gulp'),
     gutil = require('gulp-util'),
     gulpif = require('gulp-if'),
     uglify = require('gulp-uglify'),
     connect = require('gulp-connect'),
     minifyCSS = require('gulp-minify-css'),
     minifyHTML = require('gulp-minify-html'),
     concat = require('gulp-concat'),
     jshint = require('gulp-jshint');

 var env,
     jsSources,
     htmlSources,
     cssSources,
     //outputDir;


 jsSources = [
     'bower_components/jquery/dist/jquery.js',
     'bower_components/jquery-ui/jquery-ui.js',
     'bower_components/bootstrap/dist/js/bootstrap.js',
     'bower_components/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
     'components/shared_functions.js'
 ];

 cssSources = [
     'components/*.css'
 ];


 gulp.task('log', function() {
     gutil.log("Hej fra loggen");
 });

 gulp.task('js', function() {
    // Concat evt egne scripts til shared_functions.js 
     gulp.src(jsSources)
         //.on('error', swallowError)
         .pipe(concat("vendor_scripts.js"))
         .pipe(uglify())
         //.pipe(gulpif(env === 'production', uglify()))
         .pipe(gulp.dest('objekter/library'))
         .pipe(connect.reload())
 });

 gulp.task('reload', function() {
     gulp.src('objekter/**/builds/development/*.js')
         //.on('error', swallowError)
         //.pipe(concat("vendor_scripts.js"))
         //.pipe(uglify())
         //.pipe(gulpif(env === 'production', uglify()))
         //.pipe(gulp.dest('objekter/library'))
         .pipe(connect.reload())
 });

 gulp.task('css', function() {
     gulp.src(cssSources)
         .pipe(concat("styles.css"))
         // .pipe(gulpif(env === 'production', minifyCSS({
         //     keepBreaks: false
         // })))
         .pipe(minifyCSS({
             compatibility: 'ie8'
         }))
         .pipe(gulp.dest('objekter/library/css'))
         .pipe(connect.reload())

 });

 gulp.task('watch', function() {
     gulp.watch(['objekter/**/builds/development/*.js', 'objekter/**/builds/development/*.html', 'objekter/**/builds/development/*.css'], ['reload']);
 });


 gulp.task('connect', function() {
     connect.server({
         root: 'objekter/',
         livereload: true
     });
     gutil.log("Hej fra connect");
 });

 gulp.task('default', ['js', 'connect', 'css', 'watch', 'log']);
