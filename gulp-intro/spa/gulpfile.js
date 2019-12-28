const gulp = require('gulp');
const util = require('gulp-util');
const sequence = require('gulp4-run-sequence');

require('./gulpTasks/app');
require('./gulpTasks/deps');
require('./gulpTasks/servidor');


gulp.task('default', gulp.series(async () => {

  if (util.env.production) {
    sequence('app', 'deps');
  } else {
    sequence('app', 'deps', 'servidor');
  }
}));

// exports.default = defaultTask;