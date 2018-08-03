/* Gulpfile.js */
let gulp = require('gulp')
let gutil =  require('gulp-util')
let sass = require('gulp-sass')
let webserver = require('gulp-webserver');
let path = require('path')

/* tasks */
// gulp.task(
//   name : String,
//   deps : [] :: optional,
//   cb : fn
// )

/* Styles task */
gulp.task('styles', () => {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: [
                path.join(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
                path.join(__dirname, 'src/scss')				]
            , outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
})

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', ['styles'],cb => cb)
    gulp.watch('src/**/*.html', ['html'],cb => cb)
})

gulp.task('server', () => {
    gulp.src('dist/')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
})


gulp.task('lint', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(gulpStylelint({
            reporters: [
                {formatter: 'string', console: true}
            ]
        }));
});

gulp.task('js', () => {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('dist/js'))
})

gulp.task('img', () => {
    return gulp.src('src/**/*.{gif,jpg,jpeg,png,svg}')
        .pipe(gulp.dest('dist'))
})

gulp.task('icon', () => {
    return gulp.src('favicon.ico')
        .pipe(gulp.dest('dist'))
})

gulp.task('start', [
    'html',
    'styles',
    'server',
    'watch',
	'img',
    'icon',
    'js'
	
], cb => cb)

gulp.task('deploy', [
    'html',
    'fonts',
    'styles',
    'img',
    'js'
], cb => cb)