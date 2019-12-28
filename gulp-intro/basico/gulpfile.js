const gulp = require('gulp');

gulp.task('fim', gulp.series(function () {
  return console.log('Fim....');
}));

gulp.task('antes1', gulp.series(function () {
  return console.log('antes1');
}));

gulp.task('antes2', gulp.series(function () {
  return console.log('antes2');
}));

gulp.task('copiar', gulp.parallel(['antes1', 'antes2', 'fim', function () {
  console.log("Copiando...");
  return gulp.src('pastaA/**/*.txt')
    .pipe(gulp.dest('pastaB'));
}]));

gulp.task('default', gulp.series(['copiar']));