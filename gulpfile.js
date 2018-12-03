global.$ = {
  gulp: require('gulp'),
  gp:   require('gulp-load-plugins')(),
  minify: require('gulp-csso'),
  rename: require('gulp-rename'),
  browserSync: require('browser-sync').create(),
  rollup: require('rollup'),
  imageminJpegRecompress: require('imagemin-jpeg-recompress'),
  pngquant: require('imagemin-pngquant'),
  del: require('del'),
  run: require('run-sequence'),
  uglify: require('gulp-uglify'),
  babel: require('gulp-babel'),
  path: {
    config: require('./gulp/config.js'),
    jquery: './js/jquery.js',
    js: './js/**/*.js',
  }
};

$.path.config.forEach(function(path) {
  require(path)();
});