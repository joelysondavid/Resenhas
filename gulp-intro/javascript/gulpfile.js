const {src, dest} = require('gulp');
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function defaultTask() {
  return src('src/**/*.js')
  .pipe(babel({
    minified: true,
    comments: false,
    presets: ["env"]
  }))
  // ao invez de usar o uglify, podemos também declarar a propriedade 'minified: true' do babel
  // .pipe(uglify())
  .on('error', function(err) {console.log(err)})
  .pipe(concat('codigo.min.js'))
  .pipe(dest('build'));
}

exports.default = defaultTask;