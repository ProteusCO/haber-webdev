/**
 * Created by aholt on 1/10/17.
 */
var gulp = require('gulp');
var del = require('del');

gulp.task('design:build', function() {
    return gulp.src('./web/src/design/**/*')
        .pipe(gulp.dest('./build/Design'));
});
gulp.task('design:clean', function(callback) {
    del(['./build/Design']).then(function(data) {
        callback();
    });
});

gulp.task('design', gulp.series('design:clean', 'design:build'));
