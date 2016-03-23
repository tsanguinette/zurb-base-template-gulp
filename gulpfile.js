var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var imagemin = require('gulp-imagemin');
var pngquant = require('pngquant');

var path = {
    'bower': './bower_components',
    'assets': './assets'
};

gulp.task('styles', function() {
    return gulp.src([
        path.assets + '/styles/app.scss'
    ])
    .pipe(sass({
        includePaths: [
            path.bower + '/foundation/scss'
        ]
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
    gulp.watch(path.assets + '/styles/**/*.scss', ['styles']);
    gulp.watch(path.assets + '/scripts/**/*.js', ['scripts']);
});

gulp.task('scripts', function() {
   gulp.src([
       path.bower + '/jquery/dist/jquery.js',
       path.bower + '/foundation/js/foundation.js',
       path.assets + '/scripts/app.js',
       path.bower + '/foundation/js/foundation/foundation.alert.js'
   ]) 
   .pipe(concat('app.js'))
   .pipe(gulp.dest('./public/js'));
   
   return gulp.src(path.bower + '/modernizr/modernizr.js')
       .pipe(gulp.dest('./public/js'));
});

gulp.task('fonts', function() {
    return gulp.src('assets/fonts/**/*')
    .pipe(gulp.dest('public/fonts'))
})

gulp.task('imagemin', function() {
    return gulp.src('assets/images/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('public/images'))
})

gulp.task('webserver', function() {
    gulp.src('public/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['styles', 'fonts', 'imagemin', 'scripts', 'webserver']);