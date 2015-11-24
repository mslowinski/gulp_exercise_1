var gulp = require('gulp');
var concatWrap = require('./gulp-concat-wrap/gulp-concat-wrap.js');


var prefix = "//prefix code \n";
var suffix = "\n//suffix code";


gulp.task('concatWrap', function() {
   return gulp.src('src/*.js')
       .pipe(concatWrap({name: 'out.js', prefix: '//prefix', suffix: '//suffix'}))
       .pipe(gulp.dest('./dist'))
});


