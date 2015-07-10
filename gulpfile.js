 var gulp = require('gulp'),
     gutil = require('gulp-util'),
     gulpif = require('gulp-if'),
     uglify = require('gulp-uglify'),
     connect = require('gulp-connect'),
     minifyCSS = require('gulp-minify-css'),
     minifyHTML = require('gulp-minify-html'),
     concat = require('gulp-concat'),
     jshint = require('gulp-jshint');
 wait = require('gulp-wait');

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
         // .pipe(uglify())                                 // Udkommenteret af THAN d. 3/6-2015, pga problemer med gulp-uglify. 
         //.pipe(gulpif(env === 'production', uglify()))
         .pipe(gulp.dest('objekter/library'))

     gulp.src('components/shared_functions.js')
         .pipe(concat("custom_scripts.js"))
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


 gulp.task('copy_production', function() {
     //gutil.log("Its time to production mode it!");
     //objekter/kemi_drag/builds/development/
     gulp.src(['objekter/**/builds/development/**/*'])

     .pipe(gulp.dest('objekter/production'))
         //.pipe(wait(1500))
         //gulp.task('trim_files');

     gulp.src(['objekter/library/**/*'])

     .pipe(gulp.dest('objekter/production/library'))
         //.pipe(wait(1500))
         //gulp.task('trim_files');


 });

 gulp.task('trim_files', function() {
     gulp.src("objekter/**/builds/production/*.css")
         //.pipe(wait(1500))
         .pipe(minifyCSS({
             keepBreaks: false,
         }))
         .pipe(gulp.dest('objekter/**/builds/production/'))

     gulp.src("objekter/**/builds/production/*.html")
         .pipe(minifyHTML())

     .pipe(gulp.dest('objekter/**/builds/production/'))



     gulp.src("objekter/**/builds/production/*.js")
         .pipe(uglify())

     .pipe(gulp.dest('objekter/**/builds/production/'))

     //.pipe(uglify())

     gutil.log("all done");
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
     gulp.watch(['components/*.js', 'components/*.css'], ['reload', 'js', 'css']);

 });


 gulp.task('connect', function() {
     connect.server({
         root: 'objekter/',
         livereload: true
     });
     gutil.log("Hej fra connect");
 });

 gulp.task('default', ['js', 'connect', 'css', 'watch', 'log']);
