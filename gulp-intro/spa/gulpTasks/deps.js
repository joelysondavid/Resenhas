const gulp = require('gulp');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');

const awsome = {
  css: 'node_modules/font-awesome/css/font-awesome.min.css',
  font: 'node_modules/font-awesome/fonts/*.*',
  destCss: 'build/assets/css',
  destFont: 'build/assets/font',
  minCss: 'deps.min.css',
  minFont: 'deps.min.font',
}

exports.depsCss =  gulp.task('deps.css', async () => {
  return gulp.src([awsome.css])
  .pipe(uglifycss({"uglifyComments": true})) // não precisa minificar pois o arquivo jha vem minificado
  .pipe(concat(awsome.minCss))
  .pipe(gulp.dest(awsome.destCss));
});

exports.depsFonts = gulp.task('deps.fonts', async () => {
  return gulp.src([awsome.font])
  .pipe(gulp.dest(awsome.destFont))
});

exports.deps = gulp.task('deps', gulp.series(['deps.css', 'deps.fonts']));