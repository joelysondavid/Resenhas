const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');

const caminhos = {
  htmlFrom: 'src/**/*.html',
  cssFrom: 'src/assets/sass/index.scss',
  jsFrom: 'src/assets/js/**/*.js',
  imgsFrom: 'src/assets/imgs/**/*.*',
  appMinCss: 'app.min.css',
  appMinJs: 'app.min.js',
  destCss: 'build/assets/css',
  destJs: 'build/assets/js',
  destImg: 'build/assets/imgs',
  build: 'build'
}

exports.appHtml = gulp.task('app.html', async () => {
  //console.log('app.html chamou')
  return gulp.src(caminhos.htmlFrom)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(caminhos.build));
});
exports.appCss = gulp.task('app.css', async () => {
  //console.log('app.css chamou');
  return gulp.src(caminhos.cssFrom)
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({
      'uglifyComments': true
    }))
    .pipe(concat(caminhos.appMinCss))
    .pipe(gulp.dest(caminhos.destCss));
});
exports.appJs = gulp.task('app.js', async () => {
  return gulp.src(caminhos.jsFrom)
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(concat(caminhos.appMinJs))
    .pipe(gulp.dest(caminhos.destJs));
});
exports.appImgs = gulp.task('app.imgs', async () => {
  return gulp.src(caminhos.imgsFrom)
    .pipe(gulp.dest(caminhos.destImg));
});

 

exports.app = gulp.task('app', gulp.series(['app.html', 'app.css', 'app.js', 'app.imgs']));