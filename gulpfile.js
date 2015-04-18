var gulp        = require('gulp');
var concat      = require('gulp-concat');
var ngAnnotate  = require('gulp-ng-annotate');
var karma       = require('karma').server;
var del         = require('del');
var inject      = require('gulp-inject');
var bowerFiles  = require('main-bower-files');
var ghPages     = require('gulp-gh-pages');

//Configuration
var buildFolder = __dirname + '/build/';

//Tasks
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

// Production Build Tasks
/**
 * Injects release files into index.html
 */
gulp.task('inject', ['concat', 'css', 'html', 'vendor'], function(){
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./build'))
        .pipe(inject(gulp.src('./build/vendor/*.js', {read: false}), {name: 'bower', relative: true}))
        .pipe(inject(gulp.src('./build/vendor/*.css', {read: false}), {name: 'bower', relative: true}))
        .pipe(inject(gulp.src('./build/app.js', {read: false}), {relative: true}))
        .pipe(inject(gulp.src('./build/content/*.css', {read: false}), {relative: true}))
        .pipe(gulp.dest('./build'));
});

/**
 * Copies vendor files from bower to the build/vendor folder
 */
gulp.task('vendor', function () {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('./build/vendor'));
});

/**
 * Cleans the build folder
 */
gulp.task('clean', function() {
    del(buildFolder + '**');
});

/**
 * Concats application js files into app.js
 */
gulp.task('concat', function () {
    return gulp.src(['src/app/**/*.module.js', 'src/app/**/*.js', '!src/app/**/*.spec.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(buildFolder));
});

/**
 * Copies application css to build folder
 */
gulp.task('css', function () {
    return gulp.src('./src/content/*.css')
        .pipe(gulp.dest('./build/content'));
});

/**
 * Copies application css to build folder
 */
gulp.task('images', function () {
    return gulp.src('./src/content/*.png')
        .pipe(gulp.dest('./build/content'));
});

/**
 * Copies html files to build folder
 */
gulp.task('html', function () {
    return gulp.src('./src/app/**/*.html')
        .pipe(gulp.dest('./build/app'));
});

// Development Build Tasks
/**
 * Updates the index.html file
 * with all the injections
 */
gulp.task('injectDev', function(){
    return gulp.src('./src/index.html')
        .pipe(inject(gulp.src(['./src/app/**/*.module.js','./src/app/**/*.js','!./src/app/**/*.spec.js'], {read: false}), {relative: true, name: ''}))
        .pipe(inject(gulp.src(bowerFiles({debugging: true}), {read: false}), {name: 'bower', relative: true}))
        .pipe(inject(gulp.src('./src/content/*.css',{read:false}), {relative: true}))
        .pipe(gulp.dest('./src'));
});




gulp.task('build', ['inject', 'images']);

gulp.task('buildDev', ['injectDev']);

gulp.task('deploy', ['build'], function(){
    return gulp.src('./build/**/*')
        .pipe(ghPages());
});
