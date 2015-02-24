var gulp = require('gulp');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var karma = require('karma').server;
var del = require('del');
var inject = require('gulp-inject');


//Configuration
var buildFolder = __dirname + '/build/';


//Tasks
gulp.task('concat', function (done) {
    return gulp.src(['src/app/**/*.module.js', 'src/app/**/*.js', '!src/app/**/*.spec.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(buildFolder), done);
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.config.js',
        singleRun: true
    }, done);
});

gulp.task('index',['clean'],function(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('inject', ['clean', 'concat', 'index'], function(){
    return gulp.src('./build/index.html')
        .pipe(inject(gulp.src('./build/app.js', {read: false}), {relative: true}))
        .pipe(gulp.dest('./build'));
});

gulp.task('clean', function(done) {
    del(buildFolder + '**', done);
});

gulp.task('build', ['clean', 'concat']);
