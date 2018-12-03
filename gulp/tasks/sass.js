module.exports = function () {
  $.gulp.task('sass', function () {
    return $.gulp.src('sass/style.scss')
        .pipe($.gp.plumber())
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.sass())
        .pipe($.gp.autoprefixer({
          browsers: ['last 2 version']
        }))
        //.pipe($.gp.sourcemaps.write(''))
        //.pipe($.gulp.dest('build/css'))
        //.pipe($.browserSync.stream())
        .pipe($.minify())
        .pipe($.rename('style.min.css'))
        .pipe($.gp.sourcemaps.write(''))
        .pipe($.gulp.dest('build/css'))
        .pipe($.browserSync.stream());
  });
};