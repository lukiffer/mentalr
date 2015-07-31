var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var minifyCSS = require('gulp-minify-css');

gulp.task('clean', function() {
  del(['.tmp']);
});

gulp.task('styles', function() {
  return gulp.src('src/assets/**/*.less')
    .pipe($.less())
    .pipe($.concat('mentalr.css'))
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp'))
    .pipe($.connect.reload());
});

gulp.task('scripts', function() {

  return gulp.src([
      'bower_components/angular/angular.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/js/modal.js',
      'src/mentalr/**/*.js'
    ])
    .pipe($.concat('mentalr.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('.tmp'))
    .pipe($.connect.reload());
});

gulp.task('watch', ['serve'], function() {
  $.watch(['src/**/*.js', 'src/**/*.less', 'src/**/*.html'], {
    debounceDelay: 2000
  }, function(files) {
    gulp.start('build');
  });
});

gulp.task('serve', ['connect'], function() {
  require('opn')('http://localhost:8080');
});

gulp.task('connect', ['build'], function() {
  var connectModRewrite = require('connect-modrewrite');
  $.connect.server({
    root: '.tmp',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [
        connectModRewrite([
          '!\\.?(js|css|html) / [L]',
        ]),
      ];
    }
  });
});

gulp.task('build', ['index']);

gulp.task('index', ['scripts', 'styles'], function() {
  var output = gulp.src('src/index.html')
    .pipe(gulp.dest('.tmp'))
    .pipe($.connect.reload());
  output.on('error', console.error.bind(console));
  return output;
});