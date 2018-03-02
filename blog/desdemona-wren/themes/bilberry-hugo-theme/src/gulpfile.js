var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      'css/fonts.css',
      'node_modules/normalize.css/normalize.css',
      'node_modules/skeleton-css/css/skeleton.css',
      'node_modules/font-awesome/css/font-awesome.min.css',
      'node_modules/flexslider/flexslider.css',
      'node_modules/highlight.js/styles/zenburn.css',
      'css/fontface.css',
      'css/theme.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Default task
gulp.task('default', ['css']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'browserSync'], function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});
