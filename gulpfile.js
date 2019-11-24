var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function(cb) {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./vendor/jquery-easing'))

  // Magnific Popup
  gulp.src([
      './node_modules/magnific-popup/dist/*'
    ])
    .pipe(gulp.dest('./vendor/magnific-popup'))

    cb();
});

gulp.task('compileCss', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

gulp.task('minifyCss', function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('css', gulp.series('compileCss', 'minifyCss'));

gulp.task('minifyJs', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

gulp.task('minifyHtml', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('distImg', function() {
  return gulp.src('./img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('distFavicon', function() {
  return gulp.src(['./*.png', 'browserconfig.xml', 'favicon.ico', 'site.webmanifest', 'safari-pinned-tab.svg'])
    .pipe(gulp.dest('dist'));
});

gulp.task('distJs', function() {
  return gulp.src('./js/*.min.js')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('distCss', function() {
  return gulp.src('./css/*.min.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('distVendor', function() {
  return gulp.src('./vendor/**/*')
    .pipe(gulp.dest('dist/vendor'));
});

gulp.task('dist', gulp.series('distImg', 'distFavicon', 'distJs', 'distCss', 'distVendor'));

// Default task
gulp.task('default', gulp.series('css', 'minifyJs', 'minifyHtml', 'vendor', 'dist'));

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', gulp.series('css', 'minifyJs', 'browserSync', function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['minifyJs']);
  gulp.watch('./*.html', browserSync.reload);
}));
