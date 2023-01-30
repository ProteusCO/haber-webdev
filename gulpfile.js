//noinspection JSUnresolvedVariable
require('dotenv').config({
    path: `${process.env.HOME || process.env.USERPROFILE}/.gradle/gradle.properties`
});

var gulp = require('gulp');
var del = require('del');

require('./gulp-tasks/javascript');
require('./gulp-tasks/styles');
require('./gulp-tasks/design');
require('./gulp-tasks/favicons');

gulp.task('build', gulp.series('styles', 'design', 'javascript', 'favicons'));

require('./gulp-tasks/artifact/zip');
require('./gulp-tasks/artifact/publish');

gulp.task('default', gulp.series('build'));
gulp.task('clean', function(callback) {
    del(['./build/']).then(function(data) {
        callback();
    });
});

gulp.task('help', require('gulp-task-listing').withFilters(function(task) {
    if (task.match(/:/)) {
        return true;
    }
    const otherSubtasks = [
        'styles',
        'git',
        'config',
        'default',
        'design',
        'javascript'
    ];
    return otherSubtasks.some(function(st) { return task === st; });
}));