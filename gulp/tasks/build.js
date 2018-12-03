module.exports = function () {
  $.gulp.task('build', function (fn) {
    $.run(
        'clean',
        'copy',
        'sass',
        'scripts',
        'css',
        'images',
        'webp',
        'svg',
        fn
    );
  });
};

