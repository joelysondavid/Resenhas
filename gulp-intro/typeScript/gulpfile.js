const { src, dest } = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

function defaultTask(){
  return src('src/**/*ts')
  .pipe(tsProject())
  .pipe(babel({
    minified: true,
    comments: false,
    presets: ['env']
  }))
  .pipe(concat('produto.min.js'))
  .pipe(dest('build'));
}

exports.default = defaultTask;