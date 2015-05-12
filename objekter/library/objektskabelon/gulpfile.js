/// SWALLOW ERROR FUNCTION: 


/*
function swallowError(error) {

    //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}*/

//  

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
    outputDir;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    outputDir = 'builds/development/';
} else {
    outputDir = 'builds/production/';
}

jsSources = [outputDir + '*.js'];

htmlSources = [
    outputDir + '*.html'
];

cssSources = [outputDir + '*.css'];


gulp.task('log', function() {
    gutil.log("Hej fra loggen");
});

gulp.task('js', function() {
    gulp.src(jsSources)
        //.on('error', swallowError)
        //.pipe(concat("script.js"))
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('html', function() {
    gulp.src('builds/development/*.html')
        //.on('error', swallowError)
        .pipe(gulpif(env === 'production', minifyHTML()))
        .pipe(gulpif(env === 'production', gulp.dest(outputDir)))

    .pipe(connect.reload())

});

gulp.task('css', function() {
    gulp.src(cssSources)
        //.pipe(concat("styles.css"))
        .pipe(gulpif(env === 'production', minifyCSS({
            keepBreaks: false
        })))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('lint', function() {
    return gulp.src(jsSources)
        //.pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js', 'lint', 'html']);
    gulp.watch('builds/development/*.html', ['html', 'lint']);
    gulp.watch(cssSources, ['css', 'lint']);


});
/*
gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
    gutil.log("Hej fra connect");
});*/

gulp.task('default', ['js', 'html', 'css', 'lint', 'log', 'watch']);
