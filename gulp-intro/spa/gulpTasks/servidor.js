const gulp = require('gulp');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');

const caminhos = {
  buildFrom: 'build',
  htmlFrom: 'src/**/*.hmyml',
  scssFrom: 'src/**/*.scss',
  jsFrom: 'src/**/*.js',
  imgs: 'src/assets/imgs/*.*',
}

gulp.task('monitorarMudancas', async () => {
  watch(caminhos.htmlFrom, async () => gulp.series('app.html'))
  watch(caminhos.scssFrom, async () => gulp.series('app.css'))
  watch(caminhos.jsFrom, async () => gulp.series('app.js'))
  watch(caminhos.imgs, async () => gulp.series('app.imgs'))
});

exports.servidor = gulp.task('servidor', gulp.series(['monitorarMudancas', gulp.parallel(async () => {
  return gulp.src(caminhos.buildFrom)
    .pipe(webserver({
      livereload:true,
      port: 8080,
      open: true
    }))
})]));