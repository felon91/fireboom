const jsfiles = [
  $.path.jquery,
  $.path.js,
];

module.exports = function () {
  $.gulp.task('scripts', function() {
    return $.gulp.src(jsfiles)
        .pipe($.gp.plumber())
        .pipe($.gp.sourcemaps.init())
        .pipe($.babel({presets: ["@babel/preset-env"]}))
        .pipe($.gp.concat('all.js'))
        .pipe($.uglify())
        .pipe($.rename('all.min.js'))
        .pipe($.gp.sourcemaps.write(''))
        .pipe($.gulp.dest('./build/js'))
        .pipe($.browserSync.stream());
  });
};